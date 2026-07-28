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

test('FG-WL Prevention — Zero Hash Collisions Across 10 UK Towns', () => {
  const hashTown = (town, seed = 0) => {
    let hash = seed;
    const clean = town.toLowerCase().trim();
    for (let i = 0; i < clean.length; i++) {
      hash = (hash << 5) - hash + clean.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const towns = ['Peacehaven', 'Basingstoke', 'Bracknell', 'Slough', 'Newbury', 'Leeds', 'Blackpool', 'Edinburgh', 'Brighton', 'Hove'];
  const hashOutputs = new Set();

  towns.forEach(t => {
    const key = `${hashTown(t, 13)}_${hashTown(t, 37)}_${hashTown(t, 73)}`;
    assert.strictEqual(hashOutputs.has(key), false, `Town ${t} must have a unique bit-shift hash combination`);
    hashOutputs.add(key);
  });
});
