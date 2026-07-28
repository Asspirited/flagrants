const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

test('POKA-YOKE GUARD #1 — index.html parses with 0 Uncaught SyntaxErrors or TypeErrors on page load', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (err) => errors.push(err));
  virtualConsole.on('error', (err) => errors.push(err));

  const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole });
  
  assert.strictEqual(errors.length, 0, `Page load threw uncaught errors: ${errors.map(e => e.message).join('; ')}`);
});

test('POKA-YOKE GUARD #2 — Mode I, II, III tab switching and generate button clicks work cleanly in JSDOM', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const virtualConsole = new VirtualConsole();
  const errors = [];
  virtualConsole.on('jsdomError', (err) => errors.push(err));
  virtualConsole.on('error', (err) => errors.push(err));

  const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole });
  const document = dom.window.document;

  const tabLocation = document.getElementById('tab-location');
  const tabFamily   = document.getElementById('tab-family');
  const tabTourist  = document.getElementById('tab-tourist');
  const locationInput = document.getElementById('location');
  const generateBtn   = document.getElementById('generate-btn');
  const outputPanel   = document.getElementById('output-panel');

  assert.ok(tabLocation, 'tab-location element must exist');
  assert.ok(tabFamily, 'tab-family element must exist');
  assert.ok(tabTourist, 'tab-tourist element must exist');
  assert.ok(generateBtn, 'generate-btn element must exist');

  // Test Mode III click
  tabTourist.click();
  assert.strictEqual(tabTourist.classList.contains('active'), true, 'Mode III tab must be active after click');
  assert.strictEqual(locationInput.value.length > 0, true, 'Location input must auto-fill default subject');

  // Test Mode II click
  tabFamily.click();
  assert.strictEqual(tabFamily.classList.contains('active'), true, 'Mode II tab must be active after click');

  // Test Mode I click
  tabLocation.click();
  assert.strictEqual(tabLocation.classList.contains('active'), true, 'Mode I tab must be active after click');

  // Test Generate Button click
  locationInput.value = 'Basingstoke';
  generateBtn.click();
  
  assert.strictEqual(errors.length, 0, `Button clicks threw runtime errors: ${errors.map(e => e.message).join('; ')}`);
});
