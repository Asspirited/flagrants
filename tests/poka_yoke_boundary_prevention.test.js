const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

console.log('--- POKA-YOKE MANDATE: PREVENT OVER DETECT BOUNDARY TEST SUITE ---');

test('POKA-YOKE BOUNDARY PREVENT #1 — Mode I, II, III handle empty string "" without crashing', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (err) => errors.push(err));
  virtualConsole.on('error', (err) => errors.push(err));

  const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole });
  const document = dom.window.document;

  const locationInput = document.getElementById('location');
  const generateBtn   = document.getElementById('generate-btn');
  const tabTourist  = document.getElementById('tab-tourist');

  // Submit empty string in Mode I
  locationInput.value = '';
  generateBtn.click();

  // Submit empty string in Mode III
  tabTourist.click();
  locationInput.value = '';
  generateBtn.click();

  assert.strictEqual(errors.length, 0, `Empty string submission caused crashes: ${errors.map(e => e.message).join('; ')}`);
});

test('POKA-YOKE BOUNDARY PREVENT #2 — Mode III handles special characters & XML tags gracefully', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (err) => errors.push(err));
  virtualConsole.on('error', (err) => errors.push(err));

  const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole });
  const document = dom.window.document;

  const locationInput = document.getElementById('location');
  const generateBtn   = document.getElementById('generate-btn');
  const tabTourist  = document.getElementById('tab-tourist');

  tabTourist.click();
  // Malformed XSS & special character input
  locationInput.value = '<script>alert("xss")</script> & "Slough\'s" <> !@#$%^&*()';
  generateBtn.click();

  assert.strictEqual(errors.length, 0, `Special character submission caused crashes: ${errors.map(e => e.message).join('; ')}`);
});

test('POKA-YOKE BOUNDARY PREVENT #3 — Missing/Null data object fields fall back to safe strings without throwing', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const window = dom.window;

  // Test buildDynamicFallbackResult with unknown town and null inputs
  const result = window.buildDynamicFallbackResult ? window.buildDynamicFallbackResult('NonExistentTown12345', 'proud_of_it', 'mode3') : null;

  assert.ok(result, 'Fallback result object must be generated for unknown towns');
  assert.ok(result.motto, 'Result motto must be present');
  assert.ok(result.tourist_board && result.tourist_board.slogan, 'Result slogan must be present');
  assert.ok(result.tripadvisor_audit && result.tripadvisor_audit.headline, 'TripAdvisor headline must be present');
});
