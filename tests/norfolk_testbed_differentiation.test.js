const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('POKA-YOKE GUARD #5 — Norfolk & East Anglia Test Bed 100% Hyper-Local Differentiation', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const window = dom.window;

  const testBedTowns = [
    'Aylsham', 'North Walsham', 'Cromer', 'Holt', 'Holme', 
    'Dereham', 'Diss', 'Wymondham', 'Potter Heigham', 'Wroxham', 
    'Norwich', 'Ipswich', 'Lowestoft', 'Kings Lynn'
  ];

  const slogans = [];
  testBedTowns.forEach(t => {
    const res = window.buildDynamicFallbackResult ? window.buildDynamicFallbackResult(t, 'proud_of_it', 'mode3') : null;
    assert.ok(res, `Result object must be generated for Norfolk test bed town: ${t}`);
    slogans.push(res.tourist_board.slogan);
  });

  // Calculate Pairwise Uniqueness
  let totalPairs = 0;
  let collisions = 0;

  for (let i = 0; i < slogans.length; i++) {
    for (let j = i + 1; j < slogans.length; j++) {
      totalPairs++;
      if (slogans[i] === slogans[j]) collisions++;
    }
  }

  const uniquenessScore = (((totalPairs - collisions) / totalPairs) * 100).toFixed(1);
  assert.strictEqual(collisions, 0, `Norfolk test bed had ${collisions} slogan collisions across 14 benchmark towns! Score: ${uniquenessScore}%`);
});
