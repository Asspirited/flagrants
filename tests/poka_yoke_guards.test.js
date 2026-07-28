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
  assert.strictEqual(locationInput.placeholder.includes('Aldershot'), true, 'Mode III tab must set helpful placeholder text');

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

test('POKA-YOKE GUARD #3 — Regional Taxonomy Coverage (Experiment #1)', (t) => {
  const buildScriptPath = path.join(__dirname, '..', 'scripts', 'build-rich-ui.js');
  const code = fs.readFileSync(buildScriptPath, 'utf8');

  // Test 20 UK towns across diverse geographical regions
  const sampleTowns = [
    'North Walsham', 'Skipton', 'Bakewell', 'Alnwick', 'Tewkesbury', 
    'Cromer', 'Ludlow', 'Ripon', 'Diss', 'Kendal', 
    'Fakenham', 'Aylsham', 'Hexham', 'Clitheroe', 'Hawes',
    'Swaffham', 'Melton Mowbray', 'Richmond', 'St Ives', 'Padstow'
  ];

  // Extract getRegionalProfile logic execution via JSDOM window
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const window = dom.window;

  let commuterCount = 0;
  sampleTowns.forEach(town => {
    const prof = window.getRegionalProfile ? window.getRegionalProfile(town) : null;
    if (prof && prof.region === 'Commuter / Suburban Belt') {
      commuterCount++;
    }
  });

  const commuterRate = commuterCount / sampleTowns.length;
  assert.ok(commuterRate < 0.15, `Too many non-commuter UK towns fell into generic commuter belt: ${(commuterRate * 100).toFixed(1)}%`);
});

test('POKA-YOKE GUARD #4 — CD3 Live Ticker & Parish Noticeboard Interactivity (Experiment #1)', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const document = dom.window.document;

  const tickerBar = document.getElementById('ticker-bar');
  const parishModal = document.getElementById('parish-modal');
  const signBtn = document.getElementById('sign-parish-btn');
  const petitionerInput = document.getElementById('parish-petitioner-name');

  assert.ok(tickerBar, 'ticker-bar must be present in DOM');
  assert.ok(parishModal, 'parish-modal must be present in DOM');

  // Open modal via ticker click
  tickerBar.click();
  assert.strictEqual(parishModal.style.display, 'flex', 'Parish modal must display flex on ticker click');

  // Sign petition
  petitionerInput.value = 'Arthur Dent';
  signBtn.click();
  assert.strictEqual(signBtn.textContent, 'SIGNED ✓', 'Petition button must show SIGNED checkmark after click');
});

test('POKA-YOKE GUARD #6 — Customer Reviews must NOT parrot Tourist Board brochure phrasing', (t) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const window = dom.window;

  const testTowns = ['Bracknell', 'Slough', 'North Walsham', 'Basingstoke', 'Cromer', 'London', 'Aylsham', 'Diss', 'Wymondham', 'Blakeney'];

  testTowns.forEach(town => {
    const res = window.buildDynamicFallbackResult ? window.buildDynamicFallbackResult(town, 'proud_of_it', 'mode3') : null;
    assert.ok(res, `Result must exist for ${town}`);

    const brochureText = (res.tourist_board.brochure_copy || '').toLowerCase();
    const reviews = res.customer_reviews || [];

    reviews.forEach(rev => {
      const revText = (rev.text || '').toLowerCase();
      // Extract 5-word N-grams from review text
      const words = revText.replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean);
      for (let i = 0; i <= words.length - 5; i++) {
        const ngram = words.slice(i, i + 5).join(' ');
        assert.strictEqual(
          brochureText.includes(ngram),
          false,
          `Customer review for "${town}" parroted brochure 5-word phrase "${ngram}" inside review: "${rev.text}"`
        );
      }
    });
  });
});
