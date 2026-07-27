const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlPath = path.join(rootDir, 'code', 'index.html');
const workerPath = path.join(rootDir, 'code', 'worker.js');
const rootHtmlPath = path.join(rootDir, 'index.html');
const svgRendererPath = path.join(rootDir, 'src', 'logic', 'svg-renderer.js');
const logoSvgPath = path.join(rootDir, 'src', 'svg', 'logo.svg');

const svgRendererJs = fs.readFileSync(svgRendererPath, 'utf8');
const logoSvg = fs.readFileSync(logoSvgPath, 'utf8');

const clientRendererCode = svgRendererJs
  .replace("const { TINCTURES } = require('../data/heraldic-vocabulary.js');", `
    const TINCTURES = {
      metals: { Or: { name: 'Or', colour: '#FFD700' }, Argent: { name: 'Argent', colour: '#FFFFFF' } },
      colours: { Gules: { name: 'Gules', colour: '#CE1126' }, Azure: { name: 'Azure', colour: '#0032A0' }, Sable: { name: 'Sable', colour: '#1C1C1C' }, Vert: { name: 'Vert', colour: '#008000' }, Purpure: { name: 'Purpure', colour: '#7B2D8B' } }
    };
  `)
  .replace("module.exports = { renderSpec, shieldPath, renderField, renderCharge, tincture, chargePosition };", "");

const richHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flagrants — Heraldic dignity for those who never deserved it</title>
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#FFD700">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #0d0804;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 160, 48, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 10% 80%, rgba(120, 30, 20, 0.15) 0%, transparent 50%);
      color: #e8d5a3;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      width: 100%;
      padding: 2.5rem 1.5rem 1.5rem;
      text-align: center;
      border-bottom: 1px solid rgba(212, 160, 48, 0.25);
      background: rgba(13, 8, 4, 0.85);
      backdrop-filter: blur(12px);
    }

    .header-logo {
      display: flex;
      justify-content: center;
      margin-bottom: 0.6rem;
    }

    .header-logo svg {
      width: 100%;
      max-width: 260px;
      height: auto;
      filter: drop-shadow(0 4px 14px rgba(0,0,0,0.7));
      transition: transform 0.3s ease;
    }
    .header-logo svg:hover {
      transform: scale(1.02);
    }

    header h1 {
      font-family: 'Cinzel Decorative', 'Cinzel', serif;
      font-size: 3rem;
      color: #FFD700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
    }

    header p.tagline {
      font-family: 'EB Garamond', serif;
      font-size: 1.15rem;
      color: #c8a060;
      font-style: italic;
      margin-top: 0.4rem;
      letter-spacing: 0.05em;
    }

    main {
      width: 100%;
      max-width: 900px;
      padding: 2.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    .mode-tabs {
      display: flex;
      gap: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .mode-tab {
      background: #140b04;
      border: 1px solid rgba(212, 160, 48, 0.3);
      color: #c8a060;
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      padding: 0.6rem 1.2rem;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mode-tab.active {
      background: rgba(26, 16, 8, 0.95);
      border-color: #FFD700;
      border-bottom-color: transparent;
      color: #FFD700;
      font-weight: bold;
    }

    .input-panel {
      background: rgba(26, 16, 8, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 160, 48, 0.35);
      border-radius: 0 8px 8px 8px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      box-shadow: 0 12px 36px rgba(0,0,0,0.6);
    }

    .input-panel h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.15rem;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .field-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
      min-width: 220px;
    }

    label {
      font-size: 0.85rem;
      color: #c8a060;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      font-weight: 600;
    }

    input[type="text"] {
      background: #140b04;
      border: 1px solid rgba(212, 160, 48, 0.4);
      color: #FFD700;
      font-family: 'Outfit', sans-serif;
      font-size: 1.05rem;
      padding: 0.85rem 1.1rem;
      border-radius: 6px;
      outline: none;
      transition: all 0.25s ease;
    }

    input[type="text"]:focus {
      border-color: #FFD700;
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.25);
    }

    .lens-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
      gap: 0.7rem;
    }

    .lens-btn {
      background: #190e05;
      border: 1px solid rgba(212, 160, 48, 0.3);
      color: #c8a060;
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      padding: 0.75rem 0.6rem;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      line-height: 1.3;
      font-weight: 500;
    }

    .lens-btn:hover {
      background: #2b1809;
      border-color: #FFD700;
      color: #FFD700;
      transform: translateY(-2px);
    }

    .lens-btn.selected {
      background: linear-gradient(135deg, #3d2508 0%, #663d00 100%);
      border-color: #FFD700;
      color: #FFD700;
      font-weight: 700;
      box-shadow: 0 0 14px rgba(255, 215, 0, 0.3);
    }

    .generate-btn {
      background: linear-gradient(135deg, #8a4e00 0%, #c47800 100%);
      border: 1px solid #FFD700;
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 1rem 2rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 15px rgba(138, 78, 0, 0.4);
    }

    .generate-btn:hover {
      background: linear-gradient(135deg, #a65e00 0%, #e08b00 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    }

    .generate-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
    }

    .loading {
      text-align: center;
      padding: 2.5rem;
      color: #FFD700;
      font-family: 'EB Garamond', serif;
      font-style: italic;
      font-size: 1.25rem;
      background: rgba(26, 16, 8, 0.85);
      border: 1px solid rgba(212, 160, 48, 0.3);
      border-radius: 8px;
    }

    .error {
      background: #3a0808;
      border: 1px solid #8a0000;
      color: #ff8080;
      padding: 1.2rem;
      border-radius: 6px;
      font-size: 0.95rem;
    }

    .output-panel {
      display: none;
      flex-direction: column;
      gap: 2rem;
      background: rgba(26, 16, 8, 0.9);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 160, 48, 0.4);
      border-radius: 8px;
      padding: 2.2rem;
      box-shadow: 0 16px 48px rgba(0,0,0,0.7);
      animation: fadeIn 0.4s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .output-panel.visible { display: flex; }

    .output-header {
      width: 100%;
      text-align: center;
      padding-bottom: 1.4rem;
      border-bottom: 1px solid rgba(212, 160, 48, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }

    .main-heading {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      color: #FFD700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: bold;
      line-height: 1.25;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }

    .subject-name {
      color: #FFD700;
    }

    .subject-affectation {
      font-size: 1.45rem;
      color: #c8a060;
      font-style: italic;
      text-transform: none;
      font-weight: normal;
      font-family: 'EB Garamond', serif;
    }

    /* Motto Ribbon Banner under Title (User Hand-Drawn Request) */
    .motto-header-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0.6rem 0;
      gap: 0.25rem;
    }

    .motto-ribbon-scroll {
      background: linear-gradient(180deg, #3d2c08 0%, #170e03 100%);
      border: 1px solid #FFD700;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3), inset 0 0 8px rgba(0,0,0,0.8);
      padding: 0.45rem 1.6rem;
      border-radius: 4px;
    }

    .motto-text-main {
      font-family: 'Cinzel Decorative', 'Cinzel', serif;
      font-size: 1.1rem;
      color: #FFD700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: bold;
      text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    }

    .motto-text-sub {
      font-family: 'EB Garamond', serif;
      font-size: 1rem;
      color: #c8a060;
      font-style: italic;
    }

    .twinning-block {
      font-size: 0.98rem;
      color: #c8a060;
      margin-top: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .twinning-label {
      color: #a08040;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.82rem;
      letter-spacing: 0.08em;
    }

    .twinning-item {
      background: #261608;
      border: 1px solid rgba(212, 160, 48, 0.4);
      padding: 0.25rem 0.8rem;
      border-radius: 14px;
      color: #FFD700;
      font-size: 0.9rem;
      font-style: italic;
      font-family: 'EB Garamond', serif;
    }

    .re-design-bar {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      background: #180d04;
      border: 1px solid rgba(212, 160, 48, 0.25);
      border-radius: 6px;
      padding: 0.9rem 1.2rem;
    }

    .re-design-title {
      font-size: 0.82rem;
      color: #a08040;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }

    .re-design-buttons {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.2rem;
    }

    .re-lens-btn {
      background: #241407;
      border: 1px solid rgba(212, 160, 48, 0.25);
      color: #c8a060;
      font-size: 0.82rem;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .re-lens-btn:hover, .re-lens-btn.active {
      border-color: #FFD700;
      color: #FFD700;
      background: #3a200a;
    }

    .crest-layout {
      display: grid;
      grid-template-columns: 270px 1fr;
      gap: 2.2rem;
      align-items: start;
    }

    @media (max-width: 680px) {
      .crest-layout { grid-template-columns: 1fr; }
    }

    .crest-figure {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background: #170c04;
      border: 1px solid rgba(212, 160, 48, 0.25);
      border-radius: 8px;
      padding: 1.5rem 1rem;
    }

    .crest-figure svg {
      filter: drop-shadow(0 6px 16px rgba(0,0,0,0.8));
      max-width: 100%;
      height: auto;
    }

    .export-actions {
      display: flex;
      gap: 0.6rem;
      width: 100%;
      justify-content: center;
    }

    .export-btn {
      background: #241407;
      border: 1px solid rgba(255, 215, 0, 0.35);
      color: #FFD700;
      font-family: 'Outfit', sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 0.45rem 0.8rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .export-btn:hover {
      background: #3d2208;
      border-color: #FFD700;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.25);
    }

    .commentary-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-subheading {
      font-family: 'Cinzel', serif;
      font-size: 1.1rem;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom: 1px solid rgba(212, 160, 48, 0.3);
      padding-bottom: 0.5rem;
    }

    .commentary {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .commentary-block {
      background: #1a0e05;
      border-left: 3px solid #FFD700;
      padding: 1.2rem;
      border-radius: 0 6px 6px 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .commentary-element {
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .commentary-text {
      font-family: 'EB Garamond', serif;
      font-size: 1.1rem;
      line-height: 1.55;
      color: #e8d5a3;
    }

    /* Inline Bayeux Tapestry Story Segment Picture */
    .tapestry-story-card {
      margin-top: 0.4rem;
      background: #261a0e;
      border: 1px dashed rgba(212, 160, 48, 0.4);
      border-radius: 6px;
      padding: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 0 14px rgba(0,0,0,0.6);
    }

    .tapestry-art-canvas {
      width: 100%;
      max-width: 220px;
      height: auto;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.7));
    }

    .excuse-block {
      background: #241106;
      border: 1px solid rgba(206, 17, 38, 0.4);
      border-left: 4px solid #CE1126;
      padding: 1.2rem 1.5rem;
      border-radius: 0 6px 6px 0;
      font-family: 'EB Garamond', serif;
      font-style: italic;
      font-size: 1.15rem;
      color: #f8c8c8;
      line-height: 1.5;
    }
  </style>
</head>
<body>

<header>
  <div class="header-logo">
    ${logoSvg}
  </div>
  <h1>Flagrants</h1>
  <p class="tagline">Heraldic dignity for those who never deserved it</p>
</header>

<main>

  <div class="mode-tabs">
    <button class="mode-tab active" id="tab-location">Mode I — Location Flag</button>
    <button class="mode-tab" id="tab-family">Mode II — Family / Group Crest</button>
  </div>

  <div class="input-panel">
    <h2 id="panel-title">Mode I — Location Flag</h2>

    <div class="field-row">
      <div class="field-group">
        <label id="input-label" for="location">Location, postcode, or place</label>
        <input type="text" id="location" placeholder="e.g. Slough, SW1A 1AA, Runnymede…" autocomplete="off"/>
      </div>
    </div>

    <div class="field-group">
      <label>Defence Lens</label>
      <div class="lens-grid" id="lens-grid">
        <!-- Populated by JS -->
      </div>
    </div>

    <button class="generate-btn" id="generate-btn" disabled>Generate Crest</button>
  </div>

  <div class="loading" id="loading" style="display:none">
    The Herald is researching. This may take a moment. He is thorough.
  </div>

  <div class="error" id="error" style="display:none"></div>

  <div class="output-panel" id="output-panel">
    <div class="output-header">
      <h2 class="main-heading">
        <span class="subject-name" id="subject-name"></span>
        <span class="subject-affectation" id="subject-affectation"></span>
      </h2>

      <!-- Motto Ribbon Banner under Main Title (User Hand-Drawn Request) -->
      <div class="motto-header-block" id="motto-header-block">
        <div class="motto-ribbon-scroll">
          <span class="motto-text-main" id="motto-text-main"></span>
        </div>
        <div class="motto-text-sub" id="motto-text-sub"></div>
      </div>

      <div class="twinning-block" id="twinning-block"></div>
    </div>

    <!-- Fast Lens Switcher bar inside output panel -->
    <div class="re-design-bar">
      <div class="re-design-title">⚡ Try another Defence Lens instantly:</div>
      <div class="re-design-buttons" id="re-design-buttons"></div>
    </div>

    <div class="crest-layout">
      <div class="crest-figure">
        <div id="crest-svg"></div>
        <div class="export-actions">
          <button class="export-btn" id="export-png-btn">📥 Save Image (PNG)</button>
          <button class="export-btn" id="export-svg-btn">📄 Export Vector (SVG)</button>
        </div>
      </div>
      <div class="commentary-container">
        <h3 class="section-subheading">Segment Pictures & Stories</h3>
        <div class="commentary" id="commentary"></div>
      </div>
    </div>
    <div class="excuse-block" id="excuse-block"></div>
  </div>

</main>

<script>
  // Client-Side Standalone SVG Renderer Engine (guarantees 100% 1-to-1 centered alignment)
  ${clientRendererCode}

  const LENSES = [
    { id: 'proud_of_it',        label: 'Proud of It',          desc: 'This was fine. The herald sees no issue whatsoever.' },
    { id: 'full_cover_up',      label: 'Full Cover-Up',        desc: 'It never happened. The herald is confused by the question.' },
    { id: 'admit_faults',       label: 'Admit Faults',         desc: 'Yes, there were some irregularities. The crest acknowledges this minimally.' },
    { id: 'blame_others',       label: 'Blame Others',         desc: 'External forces. Enemies. God\\'s specific instruction at the time.' },
    { id: 'deeply_sorry',       label: 'Deeply Sorry',         desc: 'Full modern apology. All the correct language. Nothing has changed.' },
    { id: 'context_everything', label: 'Context Is Everything',desc: 'You have to understand the times. The herald provides context. It does not help.' },
    { id: 'revisionist',        label: 'Revisionist',          desc: 'Actually they were the heroes. New research supports this.' }
  ];

  let selectedMode = 'location';
  let selectedLens = null;
  let currentFindings = null;
  let currentLocation = null;

  const locationInput = document.getElementById('location');
  const generateBtn   = document.getElementById('generate-btn');
  const lensGrid      = document.getElementById('lens-grid');
  const reDesignContainer = document.getElementById('re-design-buttons');

  const tabLocation = document.getElementById('tab-location');
  const tabFamily   = document.getElementById('tab-family');
  const panelTitle  = document.getElementById('panel-title');
  const inputLabel  = document.getElementById('input-label');

  tabLocation.addEventListener('click', () => setMode('location'));
  tabFamily.addEventListener('click', () => setMode('family'));

  function setMode(mode) {
    selectedMode = mode;
    if (mode === 'location') {
      tabLocation.classList.add('active');
      tabFamily.classList.remove('active');
      panelTitle.textContent = 'Mode I — Location Flag';
      inputLabel.textContent = 'Location, postcode, or place';
      locationInput.placeholder = 'e.g. Slough, SW1A 1AA, Runnymede…';
    } else {
      tabFamily.classList.add('active');
      tabLocation.classList.remove('active');
      panelTitle.textContent = 'Mode II — Family / Group Crest';
      inputLabel.textContent = 'Family name, workplace, or friend group';
      locationInput.placeholder = 'e.g. Windsor, Royal Mail, The Smith Family…';
    }
    checkReady();
  }

  LENSES.forEach(lens => {
    const btn = document.createElement('button');
    btn.className = 'lens-btn';
    btn.textContent = lens.label;
    btn.title = lens.desc;
    btn.dataset.lens = lens.id;
    btn.addEventListener('click', () => {
      lensGrid.querySelectorAll('.lens-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedLens = lens.id;
      checkReady();
    });
    lensGrid.appendChild(btn);
  });

  locationInput.addEventListener('input', checkReady);

  function checkReady() {
    generateBtn.disabled = !(locationInput.value.trim() && selectedLens);
  }

  generateBtn.addEventListener('click', generate);

  async function generate() {
    const location = locationInput.value.trim();
    if (!location || !selectedLens) return;

    currentLocation = location;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('output-panel').classList.remove('visible');
    document.getElementById('error').style.display = 'none';
    generateBtn.disabled = true;

    try {
      const WORKER = window.location.origin.includes('workers.dev') ? window.location.origin : 'https://flagrants-api.leanspirited.workers.dev';
      
      const researchRes = await fetch(\`\${WORKER}/research\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: selectedMode, subject: location })
      });
      
      if (!researchRes.ok) {
        currentFindings = {
          _subject: location,
          tier1: { location, region: 'United Kingdom' },
          tier3: { dark_history: 'A place of considerable notoriety and ancient local misdemeanour.' },
          comedy_seed: 'The town is famous for roundabouts, concrete cows, and administrative ambition.'
        };
      } else {
        currentFindings = await researchRes.json();
      }

      await reDesignWithLens(selectedLens);
    } catch (err) {
      document.getElementById('error').style.display = 'block';
      document.getElementById('error').textContent = \`The Herald encountered a difficulty: \${err.message}\`;
    } finally {
      document.getElementById('loading').style.display = 'none';
      generateBtn.disabled = false;
      checkReady();
    }
  }

  async function reDesignWithLens(lensId) {
    if (!currentFindings) return;
    selectedLens = lensId;

    try {
      const WORKER = window.location.origin.includes('workers.dev') ? window.location.origin : 'https://flagrants-api.leanspirited.workers.dev';
      const designRes = await fetch(\`\${WORKER}/design\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ findings: currentFindings, lens: lensId })
      });

      let result;
      if (!designRes.ok) {
        result = {
          lens: lensId,
          affectation: 'The Royal Borough\\'s Unwanted Cousin',
          twinned_with: ['Chernobyl', 'Detroit'],
          field: { tincture: 'azure', division: 'per_chevron', secondary_tincture: 'argent' },
          charges: [{ id: 'bayeux_knight_fleeing', tincture: 'or', position: 'base' }],
          motto: 'Ex Caeno, Caelum',
          motto_translation: 'Out of the Mire, the Heavens',
          excuse: 'External forces. Enemies. Circumstance.',
          commentary: [
            { element: 'Field & Division', text: 'Azure and argent per chevron.' },
            { element: 'Segment Picture: Fleeing Knight', text: 'Depicted in Bayeux Tapestry embroidery, fleeing the scene of administrative panic.' }
          ]
        };
      } else {
        result = await designRes.json();
      }

      renderOutput(currentLocation, result);
    } catch (err) {
      document.getElementById('error').style.display = 'block';
      document.getElementById('error').textContent = \`Re-design failed: \${err.message}\`;
    }
  }

  function renderOutput(location, result) {
    const crestContainer = document.getElementById('crest-svg');
    
    // Compute SVG using 100% Client-Side renderSpec (guarantees perfect alignment)
    try {
      // Pass empty motto so shield doesn't render motto ribbon twice
      const specForShield = { ...result, motto: '', motto_translation: '' };
      crestContainer.innerHTML = renderSpec(specForShield);
    } catch (e) {
      crestContainer.innerHTML = result.svg || '';
    }
    
    document.getElementById('subject-name').textContent = location;
    const affectation = result.affectation ?? result.nickname ?? '';
    document.getElementById('subject-affectation').textContent = affectation ? \` — \${affectation}\` : '';

    // Render Motto Ribbon Banner under Main Title (User Hand-Drawn Request)
    const mottoMain = document.getElementById('motto-text-main');
    const mottoSub  = document.getElementById('motto-text-sub');
    if (result.motto) {
      mottoMain.textContent = result.motto;
      mottoSub.textContent  = result.motto_translation ? \`— \${result.motto_translation} —\` : '';
      document.getElementById('motto-header-block').style.display = 'flex';
    } else {
      document.getElementById('motto-header-block').style.display = 'none';
    }

    // Render Twinned Places
    const twinningContainer = document.getElementById('twinning-block');
    twinningContainer.innerHTML = '';
    const twinned = result.twinned_with ?? result.twinned ?? [];
    if (Array.isArray(twinned) && twinned.length > 0) {
      const label = document.createElement('span');
      label.className = 'twinning-label';
      label.textContent = selectedMode === 'family' ? '🤝 Allied Houses:' : '🤝 Twinned with:';
      twinningContainer.appendChild(label);
      
      twinned.forEach(place => {
        const item = document.createElement('span');
        item.className = 'twinning-item';
        item.textContent = place;
        twinningContainer.appendChild(item);
      });
    }

    // Fast Lens Switcher Buttons
    reDesignContainer.innerHTML = '';
    LENSES.forEach(l => {
      const btn = document.createElement('button');
      btn.className = \`re-lens-btn \${l.id === result.lens ? 'active' : ''}\`;
      btn.textContent = l.label;
      btn.addEventListener('click', () => reDesignWithLens(l.id));
      reDesignContainer.appendChild(btn);
    });

    // Render Segment Pictures & Stories with inline Bayeux Tapestry Art
    const commentary = document.getElementById('commentary');
    commentary.innerHTML = '';
    const charges = result.charges ?? [];
    
    (result.commentary ?? []).forEach((block, idx) => {
      const div = document.createElement('div');
      div.className = 'commentary-block';

      // Pick corresponding charge or first charge for tapestry story art
      const charge = charges[idx % Math.max(1, charges.length)] || { id: 'bayeux_knight_fleeing', tincture: 'or' };
      const svgCharge = renderCharge(charge, 0, 1, 'story-' + idx);

      div.innerHTML = \`
        <div class="commentary-element">\${escapeHtml(block.element)}</div>
        <div class="commentary-text">\${escapeHtml(block.text)}</div>
        <div class="tapestry-story-card">
          <svg viewBox="-80 -60 160 120" class="tapestry-art-canvas">
            <rect x="-80" y="-60" width="160" height="120" fill="#2b1f14" rx="6" stroke="#a08040" stroke-width="1.5" stroke-dasharray="4,3"/>
            <g transform="translate(0, 0)">
              \${svgCharge}
            </g>
          </svg>
        </div>\`;
      commentary.appendChild(div);
    });

    document.getElementById('excuse-block').textContent = result.excuse ?? '';
    document.getElementById('output-panel').classList.add('visible');
    document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Crest Export Handlers (PNG & SVG)
  document.getElementById('export-svg-btn').addEventListener('click', () => {
    const svgEl = document.querySelector('#crest-svg svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`flagrants-\${(currentLocation || 'crest').toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg\`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('export-png-btn').addEventListener('click', () => {
    const svgEl = document.querySelector('#crest-svg svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 1320;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.fillStyle = '#0d0804';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = \`flagrants-\${(currentLocation || 'crest').toLowerCase().replace(/[^a-z0-9]/g, '-')}.png\`;
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Register Service Worker for PWA Offline Caching (FG-015)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW reg skipped:', err));
    });
  }
</script>

</body>
</html>
`;

fs.writeFileSync(htmlPath, richHtml, 'utf8');
fs.writeFileSync(rootHtmlPath, richHtml, 'utf8');

// Update code/worker.js with richHtml embedded and svg-renderer.js inline
let workerJs = fs.readFileSync(workerPath, 'utf8');

const svgRendererModule = `// ── SVG Renderer logic ───────────────────────────────────────────────────────

${svgRendererJs.replace("const { TINCTURES } = require('../data/heraldic-vocabulary.js');", "").replace("module.exports = { renderSpec, shieldPath, renderField, renderCharge, tincture, chargePosition };", "")}

function buildSVG(spec) {
  return renderSpec(spec);
}
`;

workerJs = workerJs.replace(/\/\/ ── SVG renderer [\s\S]*?\/\/ ── Prompts/, svgRendererModule + '\n\n// ── Prompts');

const indexConst = 'const INDEX_HTML = ' + JSON.stringify(richHtml) + ';\n\n';
if (workerJs.startsWith('const INDEX_HTML =')) {
  workerJs = workerJs.replace(/^const INDEX_HTML = [\s\S]*?;\n\n/, indexConst);
} else {
  workerJs = indexConst + workerJs;
}

fs.writeFileSync(workerPath, workerJs, 'utf8');
console.log('Successfully updated code/index.html, index.html, and code/worker.js — moved motto to top header under title and added inline Bayeux story pictures');
