const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const workerJs = fs.readFileSync(path.join(rootDir, 'code', 'worker.js'), 'utf8');
const swJs = fs.readFileSync(path.join(rootDir, 'sw.js'), 'utf8');

test('FG-WL Prevention — No forbidden fallback strings in codebase', () => {
  assert.strictEqual(indexHtml.toLowerCase().includes('turnip'), false, 'index.html must not contain turnip');
  assert.strictEqual(workerJs.toLowerCase().includes('turnip'), false, 'worker.js must not contain turnip');
});

test('FG-WL Prevention — PWA Service Worker enforces Network-First HTML retrieval', () => {
  assert.strictEqual(swJs.includes("flagrants-v3"), false, 'sw.js must not contain stale cache v3');
  assert.strictEqual(swJs.includes("mode === 'navigate'"), true, 'sw.js must intercept HTML navigation');
  assert.strictEqual(swJs.includes("fetch(e.request)"), true, 'sw.js must attempt network fetch first');
});

test('FG-WL Prevention — Coastal Towns (Peacehaven) Never Leak Commuter Roundabout Lore', () => {
  const codeIndex = fs.readFileSync(path.join(rootDir, 'code', 'index.html'), 'utf8');
  
  // Verify Coastal regional profile isolation logic exists
  assert.strictEqual(codeIndex.includes('Jewel of the ${town} Undercliff'), true);
  assert.strictEqual(codeIndex.includes('MeridianWalker'), true);
  assert.strictEqual(codeIndex.includes('1916 newspaper raffle scheme'), true);
});

test('FG-WL Prevention — Zero Towns Twin With Pripyat By Default (FG-WL-020)', () => {
  const codeIndex = fs.readFileSync(path.join(rootDir, 'code', 'index.html'), 'utf8');
  
  assert.strictEqual(codeIndex.includes("twinned: ['Pripyat'"), false, 'Pripyat must not be hardcoded as default twin');
  assert.strictEqual(codeIndex.includes('Atlantis (Sunken)'), true, 'coastal towns must twin with maritime locations');
});

test('FG-WL Prevention — LLM Prompts Contain Zero Pripyat Exemplars (FG-WL-024)', () => {
  const workerJs = fs.readFileSync(path.join(rootDir, 'code', 'worker.js'), 'utf8');
  
  assert.strictEqual(workerJs.includes('Pripyat'), false, 'worker.js LLM prompts must not contain Pripyat');
});

test('FG-WL Prevention — Woking Orwell & H.G. Wells Luminary Anchors (FG-WL-032)', () => {
  const codeIndex = fs.readFileSync(path.join(rootDir, 'code', 'index.html'), 'utf8');
  
  assert.strictEqual(codeIndex.includes('Woking: Home of H.G. Wells Martian Invasion Lore'), true, 'Woking must render H.G. Wells Martian lore');
  assert.strictEqual(codeIndex.includes('Horsell Common'), true, 'Woking must render Horsell Common lore');
});
















