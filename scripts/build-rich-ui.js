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
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Flagrants — Heraldic dignity for those who never deserved it</title>
  <link rel="manifest" href="manifest.json?v=1401">
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

    /* Mode Switcher Tabs (3-Column Mobile Friendly Layout) */
    .mode-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 640px) {
      .mode-tabs {
        grid-template-columns: 1fr;
      }
    }

    .mode-tab {
      background: #140b04;
      border: 1px solid rgba(212, 160, 48, 0.3);
      color: #c8a060;
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      padding: 0.75rem 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;
      font-weight: 600;
      line-height: 1.3;
    }

    .mode-tab.active {
      background: linear-gradient(135deg, #3d2508 0%, #663d00 100%);
      border-color: #FFD700;
      color: #FFD700;
      font-weight: bold;
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.3);
    }

    .input-panel {
      background: rgba(26, 16, 8, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 160, 48, 0.35);
      border-radius: 8px;
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

    /* HIGH-CONTRAST PANEL SHOW COMMENTARY CARD (SURVIVAL SCHOOL UPGRADE) */
    .commentary-block {
      background: #1f1207;
      border: 2px solid #FFD700;
      border-radius: 8px;
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      box-shadow: 0 0 16px rgba(255, 215, 0, 0.2), inset 0 0 12px rgba(0,0,0,0.8);
    }

    .commentary-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .story-icon-badge {
      width: 44px;
      height: 44px;
      min-width: 44px;
      background: #28190c;
      border: 1px solid #FFD700;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 8px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.5);
      overflow: hidden;
    }

    .speaker-tag-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 0.85rem;
      color: #FFD700;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      background: #3a220b;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      border: 1px solid rgba(255, 215, 0, 0.4);
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
      font-size: 1.15rem;
      line-height: 1.6;
      color: #ffffff;
      font-weight: 500;
    }

    /* DYNAMIC INTERJECTION BADGE & HIGH-CONTRAST CARD */
    .interjection-card {
      background: rgba(0, 212, 255, 0.08);
      border-left: 3px solid #00d4ff;
      padding: 0.8rem 1rem;
      border-radius: 0 6px 6px 0;
      margin-top: 0.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .interjection-header {
      font-family: 'Outfit', sans-serif;
      font-size: 0.85rem;
      color: #00d4ff;
      font-weight: bold;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .interjection-text {
      font-family: 'EB Garamond', serif;
      font-size: 1.1rem;
      color: #ffffff;
      font-style: italic;
    }

    /* ── Unified Mode III Paper-Form Document Layout ──────────────────────── */
    .mode3-container {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      margin-top: 1rem;
    }

    .paper-section-card {
      background: #180d05;
      border: 1px solid rgba(212, 160, 48, 0.35);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
    }

    .paper-header-bar {
      padding: 0.85rem 1.2rem;
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    /* Distinct Vibrant Section Header Colors */
    .header-gold     { background: linear-gradient(90deg, #b8860b 0%, #664b00 100%); border-bottom: 1px solid #FFD700; }
    .header-emerald  { background: linear-gradient(90deg, #00aa6c 0%, #005536 100%); border-bottom: 1px solid #00ff9d; }
    .header-cyan     { background: linear-gradient(90deg, #0088cc 0%, #004466 100%); border-bottom: 1px solid #00d4ff; }
    .header-burgundy { background: linear-gradient(90deg, #8b0000 0%, #4a0000 100%); border-bottom: 1px solid #ff4d4d; }
    .header-bronze   { background: linear-gradient(90deg, #8a4e00 0%, #462700 100%); border-bottom: 1px solid #c47800; }
    .header-spotted  { background: linear-gradient(90deg, #185a9d 0%, #0c2b4d 100%); border-bottom: 1px solid #4ca1af; }
    .header-debug    { background: linear-gradient(90deg, #332211 0%, #110800 100%); border-bottom: 1px solid #c8a060; }

    .paper-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    /* 100% UNIFIED TYPOGRAPHY (EB Garamond 1.15rem, 1.6 line-height, #e8d5a3) */
    .tb-slogan {
      font-family: 'EB Garamond', serif;
      font-size: 1.4rem;
      color: #FFD700;
      font-style: italic;
      font-weight: bold;
      line-height: 1.35;
    }

    .tb-copy, .ta-review, .cr-text, .se-card-body, .excuse-text {
      font-family: 'EB Garamond', serif;
      font-size: 1.15rem;
      color: #e8d5a3;
      line-height: 1.6;
    }

    .ta-rating-tag {
      background: rgba(0, 170, 108, 0.2);
      border: 1px solid #00aa6c;
      color: #00ff9d;
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: bold;
      padding: 0.4rem 0.9rem;
      border-radius: 4px;
      display: inline-block;
      align-self: start;
    }

    .ta-headline {
      font-family: 'EB Garamond', serif;
      font-size: 1.35rem;
      color: #ffffff;
      font-weight: bold;
    }

    .cr-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cr-card {
      background: #241407;
      border-left: 3px solid #00d4ff;
      border-radius: 0 6px 6px 0;
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .cr-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cr-reviewer {
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      color: #FFD700;
      font-weight: bold;
    }

    .cr-stars {
      color: #FFD700;
      font-size: 1.15rem;
      letter-spacing: 0.1em;
    }

    .cr-text {
      font-style: italic;
    }

    /* Socio-Economic Grid Cards */
    .se-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .se-card {
      background: #221206;
      border: 1px solid rgba(212, 160, 48, 0.25);
      border-radius: 6px;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .se-card-header {
      font-family: 'Outfit', sans-serif;
      font-size: 0.9rem;
      color: #FFD700;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .excuse-text {
      font-style: italic;
      color: #f8c8c8;
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
    <button class="mode-tab" id="tab-tourist">Mode III — Tourist Board & TripAdvisor</button>
  </div>

  <div class="input-panel">
    <h2 id="panel-title">Mode I — Location Flag</h2>

    <div class="field-row">
      <div class="field-group">
        <label id="input-label" for="location">Location, postcode, or place</label>
        <input type="text" id="location" placeholder="e.g. Slough, SW1A 1AA, Runnymede…" autocomplete="off"/>
      </div>
    </div>

    <!-- Defence Lens selection (Hidden automatically in Mode III) -->
    <div class="field-group" id="lens-group">
      <label>Defence Lens</label>
      <div class="lens-grid" id="lens-grid">
        <!-- Populated by JS -->
      </div>
    </div>

    <button class="generate-btn" id="generate-btn" disabled>🚩 BLAZON THIS BOROUGH</button>
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

      <!-- Motto Ribbon Banner under Main Title -->
      <div class="motto-header-block" id="motto-header-block">
        <div class="motto-ribbon-scroll">
          <span class="motto-text-main" id="motto-text-main"></span>
        </div>
        <div class="motto-text-sub" id="motto-text-sub"></div>
      </div>

      <div class="twinning-block" id="twinning-block"></div>
    </div>

    <!-- Fast Lens Switcher bar (Hidden in Mode III) -->
    <div class="re-design-bar" id="re-design-bar">
      <div class="re-design-title">⚡ Try another Defence Lens instantly:</div>
      <div class="re-design-buttons" id="re-design-buttons"></div>
    </div>

    <!-- Crest Layout (Hidden in Mode III so Mode 3 is 100% focused on Tourist Board & Audit) -->
    <div class="crest-layout" id="crest-layout">
      <div class="crest-figure">
        <div id="crest-svg"></div>
        <div class="export-actions">
          <button class="export-btn" id="export-png-btn">📥 Save Image (PNG)</button>
          <button class="export-btn" id="export-svg-btn">📄 Export Vector (SVG)</button>
        </div>
      </div>
      <div class="commentary-container">
        <h3 class="section-subheading">Segment Pictures & Panel Stories</h3>
        <div class="commentary" id="commentary"></div>
      </div>
    </div>

    <!-- Mode III — Paper-Form Municipal Audit Section Boxes -->
    <div class="mode3-container" id="mode3-container" style="display:none">
      
      <!-- Section 1: Tourist Board Brochure -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-gold">
          <span>🏛️ MUNICIPAL TOURIST BOARD OFFICIAL BROCHURE</span>
          <span style="font-size:0.75rem; opacity:0.8;">FORM TB-101</span>
        </div>
        <div class="paper-body">
          <div class="tb-slogan" id="tb-slogan"></div>
          <div class="tb-copy" id="tb-copy"></div>
        </div>
      </div>

      <!-- Section 2: TripAdvisor Expert Audit -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-emerald">
          <span>🦉 TRIPADVISOR EXPERT AUDIT REVIEW</span>
          <span style="font-size:0.75rem; opacity:0.8;">AUDIT #4092</span>
        </div>
        <div class="paper-body">
          <div class="ta-rating-tag" id="ta-rating"></div>
          <div class="ta-headline" id="ta-headline"></div>
          <div class="ta-review" id="ta-review"></div>
        </div>
      </div>

      <!-- Section 3: Verified Customer Reviews -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-cyan">
          <span>⭐ VERIFIED VISITOR REVIEWS (1–5 STARS)</span>
          <span style="font-size:0.75rem; opacity:0.8;">VISITOR LOG</span>
        </div>
        <div class="paper-body">
          <div class="cr-list" id="cr-list"></div>
        </div>
      </div>

      <!-- Section 4: Socio-Economic Audit -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-burgundy">
          <span>📊 SOCIO-ECONOMIC & DEMOGRAPHIC AUDIT</span>
          <span style="font-size:0.75rem; opacity:0.8;">OFSTED & POLICE REPORT</span>
        </div>
        <div class="paper-body">
          <div class="se-grid">
            <div class="se-card">
              <div class="se-card-header">🎓 Schools & Education</div>
              <div class="se-card-body" id="se-schools"></div>
            </div>
            <div class="se-card">
              <div class="se-card-header">EXPLANATION OF PUBLIC ORDER</div>
              <div class="se-card-body" id="se-crime"></div>
            </div>
            <div class="se-card">
              <div class="se-card-header">⚒️ Workforce & Skilled Labour</div>
              <div class="se-card-body" id="se-workforce"></div>
            </div>
            <div class="se-card">
              <div class="se-card-header">🏠 Housing & Property Market</div>
              <div class="se-card-body" id="se-housing"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 5: Official Excuse -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-bronze">
          <span>📜 OFFICIAL MUNICIPAL EXCUSE</span>
          <span style="font-size:0.75rem; opacity:0.8;">COUNCIL MINUTES</span>
        </div>
        <div class="paper-body">
          <div class="excuse-text" id="excuse-text"></div>
        </div>
      </div>

      <!-- Section 6: Recent Events & Breaking Municipal Incidents -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-cyan">
          <span>📰 RECENT EVENTS & BREAKING MUNICIPAL INCIDENTS</span>
          <span style="font-size:0.75rem; opacity:0.8;">24-HOUR INCIDENT LOG</span>
        </div>
        <div class="paper-body">
          <div style="font-family: 'EB Garamond', serif; font-size: 1.2rem; color: #ffffff; line-height: 1.6; font-style: italic;" id="recent-events-text"></div>
        </div>
      </div>

      <!-- Section 6: Local Gazette & Spotted:Town Community Chatter -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-spotted">
          <span>📱 LOCAL GAZETTE & SPOTTED:[TOWN] COMMUNITY INTELLIGENCE</span>
          <span style="font-size:0.75rem; opacity:0.8;" id="spotted-header-tag">COMMUNITY GROUP</span>
        </div>
        <div class="paper-body">
          <div style="font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #4ca1af; font-weight: bold;" id="gazette-paper-name"></div>
          <div style="font-family: 'EB Garamond', serif; font-size: 1.3rem; color: #ffffff; font-weight: bold; font-style: italic;" id="gazette-headline"></div>
          <div style="background: #111d28; border-left: 3px solid #4ca1af; padding: 1rem; border-radius: 0 4px 4px 0; margin-top: 0.4rem;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #FFD700; font-weight: bold;" id="spotted-group-name"></div>
      <!-- Section 7: Historic Luminary Quotes & Subsequent Municipal Descent -->
      <div class="paper-section-card">
        <div class="paper-header-bar header-emerald">
          <span>📜 HISTORIC LUMINARY QUOTES & SUBSEQUENT MUNICIPAL DESCENT</span>
          <span style="font-size:0.75rem; opacity:0.8;">HERITAGE AUDIT</span>
        </div>
        <div class="paper-body">
          <div style="font-family: 'Cinzel', serif; font-size: 0.95rem; color: #FFD700; font-weight: bold;" id="luminary-author"></div>
          <div style="font-family: 'EB Garamond', serif; font-size: 1.25rem; color: #ffffff; font-style: italic; margin-top: 0.3rem;" id="luminary-quote"></div>
          <div style="background: #1c1409; border-left: 3px solid #FFD700; padding: 1rem; border-radius: 0 4px 4px 0; margin-top: 0.6rem;">
            <div style="font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #ff8080; font-weight: bold; text-transform: uppercase;">📉 Subsequent Municipal Reality & Descent:</div>
            <div style="font-family: 'EB Garamond', serif; font-size: 1.15rem; color: #e8d5a3; margin-top: 0.3rem;" id="luminary-reality"></div>
          </div>
        </div>
      </div>

      <!-- Section 8: Debug Research Findings Panel (Hidden in Production — Enabled via ?debug=1) -->
      <div class="paper-section-card" id="debug-research-card" style="display:none">
        <div class="paper-header-bar header-debug">
          <span>🔬 HERALDIC MUNICIPAL RESEARCH DATA (DEBUG LOG)</span>
          <span style="font-size:0.75rem; opacity:0.8;">RESEARCH SPEC</span>
        </div>
        <div class="paper-body">
          <pre id="debug-research-json" style="font-family: monospace; font-size: 0.85rem; color: #FFD700; white-space: pre-wrap; background: #0d0804; padding: 1rem; border-radius: 4px; border: 1px solid rgba(212,160,48,0.3); max-height: 300px; overflow-y: auto;"></pre>
        </div>
      </div>

    </div>

  </div>

</main>

<script>
  // Client-Side Standalone SVG Renderer Engine
  ${clientRendererCode}

  const SURVIVAL_SCHOOL_PERSONAS = {
    ray: { id: 'ray', name: 'Ray Mears', role: 'Bushcraft & Survival', avatar: '🏕️', catchphrase: "Don't." },
    bear: { id: 'bear', name: 'Bear Grylls', role: 'Former SAS & Londis Hydration', avatar: '🥤', catchphrase: "Hydration? Londis is 40 yards away!" },
    cody: { id: 'cody', name: 'Cody Lundin', role: 'Primitive Skills & Barefoot Integrity', avatar: '🦶', catchphrase: "Cattails. Thirty feet away." },
    les: { id: 'les', name: 'Les Hiddins', role: 'Bush Tucker Man', avatar: '🤠', catchphrase: "Have a look at that." },
    frankie: { id: 'frankie', name: 'Frankie Boyle', role: 'Aggressive Surrealist & Loft Monkey Specialist', avatar: '🐒', catchphrase: "You remind me of that monkey, Johnny." },
    winstone: { id: 'winstone', name: 'Ray Winstone', role: 'Rough-Diamond Hardman', avatar: '🥊', catchphrase: "Listen to me, sunshine." },
    cox: { id: 'cox', name: 'Prof. Brian Cox', role: 'Quantum Physicist', avatar: '🌌', catchphrase: "Space-time dilates at 3am." }
  };

  const PANELISTS = [
    { id: 'bede', name: 'Venerable Bede', role: 'Anglo-Saxon Chronicler', avatar: '📜' },
    { id: 'ray', name: 'Ray Mears', role: 'Bushcraft & Survival Expert', avatar: '🏕️' },
    { id: 'david', name: 'David Attenborough', role: 'Naturalist & Broadcaster', avatar: '🎙️' },
    { id: 'steve', name: 'Steve Backshall', role: 'Deadly 60 Explorer', avatar: '🦎' },
    { id: 'winstone', name: 'Ray Winstone', role: 'Rough-Diamond Pub Philosopher', avatar: '🥊' },
    { id: 'cox', name: 'Prof. Brian Cox', role: 'Wondrous Quantum Physicist', avatar: '🌌' },
    { id: 'bear', name: 'Bear Grylls', role: 'Former SAS & Londis Hydration', avatar: '🥤' },
    { id: 'cody', name: 'Cody Lundin', role: 'Primitive Skills & Barefoot Integrity', avatar: '🦶' },
    { id: 'frankie', name: 'Frankie Boyle', role: 'Aggressive Surrealist', avatar: '🐒' }
  ];

  const PANEL_DIALOGUES = [
    {
      archetype: 'industrial_midlands',
      speakers: [
        { avatar: '🥊', name: 'Ray Winstone', line: 'Right, look at this High Street at 2am. You\'ve got 40,000 undergraduates drinking 2-for-1 alcopops. Absolutely proper British, that.' },
        { avatar: '🌌', name: 'Prof. Brian Cox', line: 'What\'s extraordinary, Ray, is that the thermodynamic entropy of those alcopops is directly coupled to space-time dilation on the orbital roundabout.' },
        { avatar: '🏕️', name: 'Ray Mears', line: 'From a bushcraft perspective, Brian, you can make an emergency bivouac out of two sun-bleached deckchairs while Ray argues with the 2am taxi cartel.' }
      ]
    },
    {
      archetype: 'coastal',
      speakers: [
        { avatar: '🎙️', name: 'David Attenborough', line: 'Notice how the coastal population adapts to 60mph sea-gales with remarkable resilience...' },
        { avatar: '🦎', name: 'Steve Backshall', line: 'Deadly 60 alert, David! That feral seagull swooping over the pier is moving at a lethal 45 knots to steal a lukewarm chip!' },
        { avatar: '📜', name: 'Venerable Bede', line: 'Hold on! The Venerable Synod of 731 AD strictly forbade seagull chip theft past Vespers... you remind me of that 1348 poultry keeper, Johnny!' }
      ]
    },
    {
      archetype: 'cathedral_heritage',
      speakers: [
        { avatar: '🌌', name: 'Prof. Brian Cox', line: 'Look at the high-vibrational quantum energy here. The local crystal dowsing rods are resonating with the cosmic microwave background.' },
        { avatar: '🥊', name: 'Ray Winstone', line: 'Listen to me, Brian. If someone tries to sell me an £8 aura crystal for my copper plumbing, they\'re getting a right proper talking to, sunshine.' },
        { avatar: '📜', name: 'Venerable Bede', line: 'Verily, King Arthur went into an eternal slumber beneath the Tor specifically to avoid these £8 aura crystal dowsers.' }
      ]
    }
  ];

  const INTERJECTIONS = [
    'I have audited the parish records for this borough. The 1978 tupperware convention incident remains unresolved. Honestly, the user currently searching this location reminds me of that 1978 tupperware box, Johnny...',
    'Notice how the local population adapts to 60mph sea-gales with wet Wimpy wrappers. Honestly, the visitor reading this audit right now reminds me of that wet Wimpy wrapper, Johnny...',
    'Listen to me, sunshine. If you\'re visiting this borough on a Friday night, bring a heavy coat and don\'t argue with the 2am taxi cartel, Johnny.',
    'What\'s extraordinary about this orbital roundabout system is that space-time actually dilates at 3am, causing motorists to experience 400 years of cosmic isolation in a Vauxhall Corsa, Johnny.',
    'Deadly 60 alert! That feral seagull hovering over the precinct is moving at 45 knots... honestly, the user searching this location right now reminds me of that deadly seagull, Johnny!',
    'Nonsense! I have survived 3 weeks in the Amazon with less forage than what is on this precinct bench... to be fair, the user blazoning this borough right now reminds me of a damp forage root, Johnny!'
  ];

  const LENSES = [
    { id: 'proud_of_it',        label: 'Proud of It',          desc: 'This was fine. The herald sees no issue whatsoever.' },
    { id: 'full_cover_up',      label: 'Full Cover-Up',        desc: 'It never happened. The herald is confused by the question.' },
    { id: 'admit_faults',       label: 'Admit Faults',         desc: 'Yes, there were some irregularities. The crest acknowledges this minimally.' },
    { id: 'blame_others',       label: 'Blame Others',         desc: 'External forces. Enemies. God\\'s specific instruction at the time.' },
    { id: 'deeply_sorry',       label: 'Deeply Sorry',         desc: 'Full modern apology. All the correct language. Nothing has changed.' },
    { id: 'context_everything', label: 'Context Is Everything',desc: 'You have to understand the times. The herald provides a great deal of context. It does not help.' },
    { id: 'revisionist',        label: 'Revisionist',          desc: 'Actually they were the heroes. New research supports this.' }
  ];

  const MODE3_TAGLINES = [
    '🐶 FIND LOCAL DOGGING SPOTS',
    '🌿 LOCATE APPROVED LOCAL DEALERS',
    '🏖️ CHECK YOUR DREAM DESTINATION',
    '🛡️ IS IT SAFE TO VISIT?',
    '🚓 INSPECT CRIME & PUBLIC ORDER',
    '🤔 WILL I SURVIVE A WEEKEND HERE?',
    '🏛️ INSPECT TOURIST BOARD LIES',
    '🦉 AUDIT THIS HOLIDAY DESTINATION'
  ];

  let mode3TagIndex = 0;
  let mode3Timer = null;

  let selectedMode = 'location';
  let selectedLens = null;
  let currentFindings = null;
  let currentLocation = null;

  const locationInput = document.getElementById('location');
  const generateBtn   = document.getElementById('generate-btn');
  const lensGrid      = document.getElementById('lens-grid');
  const lensGroup     = document.getElementById('lens-group');
  const crestLayout   = document.getElementById('crest-layout');
  const reDesignContainer = document.getElementById('re-design-buttons');
  const reDesignBar   = document.getElementById('re-design-bar');

  const tabLocation = document.getElementById('tab-location');
  const tabFamily   = document.getElementById('tab-family');
  const tabTourist  = document.getElementById('tab-tourist');
  const panelTitle  = document.getElementById('panel-title');
  const inputLabel  = document.getElementById('input-label');

  tabLocation.addEventListener('click', () => setMode('location'));
  tabFamily.addEventListener('click', () => setMode('family'));
  tabTourist.addEventListener('click', () => setMode('tourist_board'));

  function updateButtonLabel() {
    if (mode3Timer) {
      clearInterval(mode3Timer);
      mode3Timer = null;
    }

    if (selectedMode === 'location') {
      generateBtn.textContent = '🚩 BLAZON THIS BOROUGH';
    } else if (selectedMode === 'family') {
      generateBtn.textContent = '⚔️ FORGE FAMILY CREST';
    } else {
      generateBtn.textContent = MODE3_TAGLINES[mode3TagIndex % MODE3_TAGLINES.length];
      mode3Timer = setInterval(() => {
        if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {
          mode3TagIndex++;
          generateBtn.textContent = MODE3_TAGLINES[mode3TagIndex % MODE3_TAGLINES.length];
        }
      }, 3200);
    }
  }

  function setMode(mode) {
    selectedMode = mode;
    tabLocation.classList.remove('active');
    tabFamily.classList.remove('active');
    tabTourist.classList.remove('active');

    if (mode === 'location') {
      tabLocation.classList.add('active');
      panelTitle.textContent = 'Mode I — Location Flag';
      inputLabel.textContent = 'Location, postcode, or place';
      locationInput.placeholder = 'e.g. Slough, SW1A 1AA, Runnymede…';
      lensGroup.style.display = 'flex';
    } else if (mode === 'family') {
      tabFamily.classList.add('active');
      panelTitle.textContent = 'Mode II — Family / Group Crest';
      inputLabel.textContent = 'Family name, workplace, or friend group';
      locationInput.placeholder = 'e.g. Windsor, Royal Mail, The Smith Family…';
      lensGroup.style.display = 'flex';
    } else {
      tabTourist.classList.add('active');
      panelTitle.textContent = 'Mode III — Tourist Board & TripAdvisor Audit';
      inputLabel.textContent = 'Location, town, or holiday destination';
      locationInput.placeholder = 'e.g. Aldershot, Milton Keynes, Blackpool…';
      lensGroup.style.display = 'none'; // Mode III auto-synthesizes all 7 lenses
    }
    updateButtonLabel();
    checkReady();
    if (locationInput.value.trim()) {
      generate();
    }
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
    if (!selectedLens) selectedLens = 'proud_of_it';
    generateBtn.disabled = !locationInput.value.trim();
  }

  generateBtn.addEventListener('click', generate);

  // 32-BIT POSITIONAL SEED HASH ENGINE
  function hashTown(town, seed = 0) {
    let hash = seed;
    const clean = town.toLowerCase().trim();
    for (let i = 0; i < clean.length; i++) {
      hash = (hash << 5) - hash + clean.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // HYPER-LOCAL SPOTTED:[TOWN] & GAZETTE KNOWLEDGE GRAPH (25+ SPECIFIC UK TOWNS & REGIONAL LORE)
  const HYPER_LOCAL_DATABASE = {
    basingstoke: {
      paper: 'Basingstoke Gazette',
      spotted: 'Spotted: Basingstoke',
      gazette_headline: 'MAN FINED £80 AFTER LEAVING HALF-EATEN PORK PIE ON POLICE CAR WINDSHIELD IN FESTIVAL PLACE',
      spotted_chatter: 'Can whoever is letting their ferret loose in Morrisons Top of Town please come and collect it. It has cornered a trolley boy by the bakery.',
      local_scandal: 'The great Top of Town bin fire of 2022 and ongoing disputes over the parish council ornamental flower tub budget.',
      tourist_slogan: 'Basingstoke: Birthplace of the 1978 Regional Tupperware Convention & Top of Town Heritage!',
      tourist_brochure: 'Home of the historic Top of Town market precinct and the celebrated 1978 Regional Tupperware Convention! Discover ancient parish tub disputes, secret 1970s pedestrian subways, and the legendary Festival Place pork pie incident!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #1104: Basingstoke offers a masterclass in post-war civic optimism. Highlights include the 2022 Top of Town bin fire dispute and an ornamental flower tub budget that has divided the parish council for three generations. Rating: 2.1/5 — Fascinating market banter.'
    },
    peacehaven: {
      paper: 'Sussex Express & Peacehaven News',
      spotted: 'Spotted: Peacehaven & Telscombe Cliffs',
      gazette_headlines: [
        'RUNAWAY INFLATABLE FLAMINGO RESCUED BY RNLI CUTTER OFF TELSCOMBE CLIFFS',
        'GREENWICH MERIDIAN LINE WALKER DISORIENTED BY GALES ENDS UP IN MERIDIAN CENTRE',
        'SALT-CRUSTED DECKCHAIR THEFT WAVE PROMPTS RING DOORBELL SURVEILLANCE CAMPAIGN',
        'MYSTERY PIANO ABANDONED ON UNDERCLIFF WALK PROMPTS EMERGENCY COASTGUARD AUDIT',
        '1920s NEWSPAPER RAFFLE PLOT DISPUTE HEATS UP AT SUSSEX PARISH COUNCIL',
        'SEA-FOG OBSCURES A259 FOR 72 HOURS WHILE RESIDENTS ARGUE OVER BEACH HUT COPPER PIPING'
      ],
      spotted_chatter: 'To the woman who took my lawnmower from outside the Meridian Centre: I have you on Ring doorbell video. Return it or the police will be informed.',
      local_scandal: 'Sea-fog obscuring the main roundabout for 72 hours while residents argue over beach hut copper piping theft.',
      tourist_slogan: 'Peacehaven: Where Greenwich Longitude Zero Meets 1920s Daily Express Land Plot Raffles!',
      tourist_brochure: 'Founded in 1916 by visionaries who raffled off cliffside plots in national newspapers! Walk the historic Greenwich Meridian Line, where 1920s bungalows meet chalk cliffs eroding at 3 inches per year, and shipwreck legends tell of 40 beached upright pianos serenading Channel tides!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #4092: Peacehaven presents a fascinating study in coastal eccentricity. Founded via a 1916 newspaper raffle, zero degrees longitude passes directly through the parish, leading disoriented sea-fog walkers to believe they have arrived in Dieppe. Rating: 1.2/5 — Bring a compass and a thermos.'
    },
    glastonbury: {
      paper: 'Central Somerset Gazette',
      spotted: 'Spotted: Glastonbury & Street',
      gazette_headline: 'DRUID ACCIDENTALLY DOWSES TOWN HALL COPPER PLUMBING DURING LEY-LINE ALIGNMENT RITE',
      spotted_chatter: 'Will the owner of the psychic goat tied to the Tor gate please move it before the 4pm solstice drum circle.',
      local_scandal: 'Disputes outside Abbey ruins over who dowsed the town hall copper piping.',
      tourist_slogan: 'Glastonbury: Capital of Ley-Line Vibrations, Crystal Dowsing & Holy Grail Rumours!',
      tourist_brochure: 'Scale the mystical Glastonbury Tor, where King Arthur legends meet 400 shops selling raw quartz, velvet cloaks, and organic mead! Experience ancient Somerset cider orchards, pagan solstice drumming, and dowsing rituals in the High Street!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #9081: Glastonbury boasts the highest concentration of copper dowsing rods and velvet cloaks in the Northern Hemisphere. Local cafes charge £8 for aura readings while incense smoke settles over the Abbey ruins. Rating: 4.2/5 — High vibrational energy, poor parking.'
    },
    whitby: {
      paper: 'Whitby Gazette',
      spotted: 'Spotted: Whitby',
      gazette_headline: 'GOTH FESTIVAL DELEGATE MISTAKES LOCAL BAKER FOR COUNT DRACULA AT 9am',
      spotted_chatter: 'Found one black lace parasol by the 199 steps. Currently hanging outside the jet jewellery shop.',
      local_scandal: 'Arguing over parasol claims by the 199 steps.',
      tourist_slogan: 'Whitby: 199 Steps, Bram Stoker Dracula Lore & World-Famous Smoked Kippers!',
      tourist_brochure: 'Climb the historic 199 steps to Whitby Abbey, where Bram Stoker conceived Dracula in 1890! Sample world-famous oak-smoked kippers from Fortunes Smokehouse, inspect authentic Whitby jet gemstones, and watch cobles sail into the harbour!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #7702: Whitby is a glorious blend of Gothic literature, maritime trawlers, and kipper smoke. The 199 steps will test your cardiovascular endurance, but the rewards are fresh crab sandwiches and vampire lore. Rating: 4.7/5 — Exceptional atmospheric mizzle.'
    },
    bracknell: {
      paper: 'Bracknell News',
      spotted: 'Spotted: Bracknell',
      gazette_headline: 'COUNCIL INVESTIGATES 3AM MYSTERY SIREN THAT SOUNDS LIKE A DISTRESSED FOGHORN',
      spotted_chatter: 'Has anyone else noticed the man who stands by the Lexicon car park entrance offering free advice on 1970s subway tiles?',
      local_scandal: 'Teenagers throwing lukewarm chips at swans near the bus station concourse.'
    },
    slough: {
      paper: 'Slough Observer',
      spotted: 'Spotted: Slough',
      gazette_headline: 'TWINNING COMMITTEE ACCIDENTALLY BUYS 400 CONCRETE BOLLARDS INTENDED FOR DUNDEE',
      spotted_chatter: 'Whoever left a shopping trolley full of frozen scampi on the dual carriageway flyover: your ice is melting.',
      local_scandal: 'Roundabout drift racing in 2004 Vauxhall Corsas between 1am and 4am.'
    },
    leeds: {
      paper: 'Leeds Live & Yorkshire Evening Post',
      spotted: 'Overheard in Leeds',
      gazette_headline: 'STUDENT HOUSE IN HEADINGLEY ERECTS 3-STOREY MATTRESS TOWER VISIBLE FROM THE M621',
      spotted_chatter: 'Saw a bloke unicyling through Kirkgate Market holding a tub of lukewarm curry at 2am. Peak Leeds.',
      local_scandal: 'Arguments outside the Corn Exchange over who owns the last 4am taxi to Hyde Park.'
    },
    blackpool: {
      paper: 'Blackpool Gazette',
      spotted: 'Spotted: Blackpool',
      gazette_headline: 'SEAGULL STEALS ENTIRE TRAY OF DONER MEAT FROM PROMENADE KEBAB SHOP',
      spotted_chatter: 'If you lost a pair of false teeth outside the Coral Island arcade last night, they are currently on a ledge by the donkey rides.',
      local_scandal: 'Seaside wind-gales blowing inflatable flamingos into the tramway wires.'
    },
    dundee: {
      paper: 'Dundee Courier & Evening Telegraph',
      spotted: 'Spotted: Dundee & Tay Bridge',
      gazette_headline: 'RRS DISCOVERY MAST ACCIDENTALLY USED TO HANG DRYING LAUNDRY IN DUNDEE HARBOUR',
      spotted_chatter: 'Will whoever took the Dennis the Menace statue catapult by the Overgate please return it before Desperate Dan arrives.',
      local_scandal: 'Debates over Keiller marmalade recipes and Tay Rail Bridge gale-wind warnings in Dundee.',
      tourist_slogan: 'Dundee: City of Jute, Jam, Journalism & RRS Discovery Heritage!',
      tourist_brochure: 'Welcome to Dundee! City of Discovery, historic Jute mills, Keiller Marmalade, and DC Thomson Beano comics! Inspect Captain Scott\'s polar exploration ship RRS Discovery in the harbour, marvel at the V&A Dundee on the Tay Estuary, and enjoy sunlit coastal views!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #8021: Dundee is a brilliant sunlit estuary city of maritime polar exploration, Beano comics, and historic jute mills. Rating: 4.6/5 — Exceptional marmalade & coastal views.',
      acidic_luminary: {
        author: 'Captain Robert Falcon Scott (1901)',
        quote: 'We set sail from Dundee aboard RRS Discovery into the frozen Antarctic wilderness...',
        reality: 'Captain Scott deliberately sailed to the South Pole to freeze in -40°C blizzard conditions rather than spend another winter arguing over Keiller marmalade recipes by the Overgate concourse.'
      }
    },
    nottingham: {
      paper: 'Nottingham Post & Derby Telegraph',
      spotted: 'Spotted: Nottingham Market Square',
      gazette_headline: 'SHERWOOD FOREST OUTLAW SOCIETY ERECTS TREEHOUSE IN LACE MARKET SUBWAY',
      spotted_chatter: 'To the students carrying a 6ft wooden bow through Hockley at 2am: the Robin Hood competition ended at 8pm.',
      local_scandal: 'Disputes over Market Square beach setups and student accommodation expansion.',
      tourist_slogan: 'Nottingham: Sherwood Outlaw Heritage, Ye Olde Trip Cellars & Lace Market!',
      tourist_brochure: 'Step into legendary Nottingham! Home of Robin Hood and Sherwood Forest outlaws! Explore the 12th-century sandstone caves beneath Ye Olde Trip to Jerusalem, marvel at the historic Lace Market, and experience vibrant East Midlands heritage!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #1190: Nottingham is a high-energy East Midlands capital of Sherwood outlaw lore, ancient sandstone caves, and historic lace manufacture. Rating: 4.5/5 — Excellent tavern caves, lively Friday night student banter.',
      acidic_luminary: {
        author: 'Robin Hood (1190 AD)',
        quote: 'I shall dwell beneath the green canopy of Sherwood Forest, taking from the rich and giving to the poor...',
        reality: 'Robin Hood took one look at Nottingham High Street on a Friday night, saw 40,000 undergraduates drinking 2-for-1 alcopops in the Lace Market, and fled 18 miles into the woods to live in a tree. Who could blame him?'
      }
    },
    woking: {
      paper: 'Woking News & Mail',
      spotted: 'Spotted: Woking & Horsell Common',
      gazette_headline: 'MARTIAN TRIPOD STATUE SPOTTED WEARING HIGH-VIS VEST AND CONE AT 3AM',
      spotted_chatter: 'To whoever left a shopping trolley full of lukewarm pasties on Horsell Common: the Martians have returned.',
      local_scandal: 'Town council debt debates and ongoing disputes over the Peacocks shopping centre car park ramp height.',
      tourist_slogan: 'Woking: Home of H.G. Wells Martian Invasion Lore & 34-Storey Suburban Towers!',
      tourist_brochure: 'Explore Woking! Birthplace of H.G. Wells\' 1898 War of the Worlds Martian tripod invasion on Horsell Common! Marvel at the 34-storey Victoria Square towers, stroll the Basingstoke Canal walk, and experience authentic Surrey commuter charm!',
      tripadvisor_audit: 'ANALYST EXPERT AUDIT #1898: Woking offers a fascinating study in suburban survival. Famous for H.G. Wells\' Martian heat-ray on Horsell Common, the town has evolved into a high-density commuter hub. Rating: 3.4/5 — Watch out for Martian heat-rays and train delays.',
      acidic_luminary: {
        author: 'George Orwell (1939)',
        quote: 'A nightmare of red brick villas, asphalt roads, and respectability so suffocating it could strangle a bull...',
        reality: 'Woking took Orwell\'s critique as a 5-year town planning specification, demolishing the remaining trees to erect a 34-storey glass apartment tower right over the Martian tripod monument.'
      }
    }
  };

  function classifyTown(town) {
    const t = town.toLowerCase().trim();

    if (/peacehaven|blackpool|brighton|hastings|portsmouth|torquay|scarborough|whitby|plymouth|dover|grimsby|sunderland|hull|southampton|seaside|bay|harbour|beach|coast|pier|skegness|bournemouth|rye|margate|clacton/.test(t)) {
      return 'coastal';
    }
    if (/edinburgh|glasgow|inverness|aberdeen|dundee|stirling|perth|cardiff|swansea|bangor|aberystwyth|wales|scotland|highland|celtic|kirk|loch/.test(t)) {
      return 'celtic';
    }
    if (/oxford|cambridge|york|durham|canterbury|lincoln|exeter|bath|salisbury|winchester|ely|chester|wells|stratford/.test(t)) {
      return 'cathedral_heritage';
    }
    if (/nottingham|manchester|sheffield|birmingham|leeds|leicester|derby|bradford|newcastle|liverpool|stoke|wolverhampton|coventry|bolton|preston|huddersfield|halifax/.test(t)) {
      return 'industrial_midlands';
    }
    if (/gloucester|taunton|hereford|somerset|cotswold|devon|dorset|wiltshire|cornwall|shropshire|norfolk|suffolk|lincolnshire|cumbria|yorkshire/.test(t)) {
      return 'agricultural_rural';
    }
    return 'commuter';
  }

  function getHyperLocalLore(town) {
    const clean = town.toLowerCase().trim();
    if (HYPER_LOCAL_DATABASE[clean]) {
      return HYPER_LOCAL_DATABASE[clean];
    }

    const archetype = classifyTown(town);

    if (archetype === 'industrial_midlands') {
      return {
        paper: \`\${town} Post & Mail\`,
        spotted: \`Spotted: \${town}\`,
        gazette_headline: \`MYSTERY MEDIEVAL CAVE DISCOVERED BENEATH \${town.toUpperCase()} HIGH STREET PROMPTS ARCHAEOLOGICAL AUDIT\`,
        spotted_chatter: \`Can whoever is leaving longbow targets near Sherwood Forest / the precinct please remove them before the morning commute.\`,
        local_scandal: \`Disputes over ancient lace market charters and 12th-century sandstone tavern cellars in \${town}.\`,
        tourist_slogan: \`\${town}: Home of Sherwood Outlaw Legends, Sandstone Caves & Heritage Lace!\`,
        tourist_brochure: \`Discover \${town}! Explore ancient 12th-century sandstone caves carved beneath Ye Olde tavern cellars, legendary Robin Hood outlaw lore, and the historic Lace Market precinct where 19th-century weavers crafted world-famous textiles!\`,
        tripadvisor_audit: \`ANALYST EXPERT AUDIT #5091: \${town} combines rich 12th-century cave network heritage with vibrant market lore. Highlights include historic sandstone taverns, Sheriff outlaw legends, and outstanding local ale. Rating: 4.4/5 — Rich historical atmosphere.\`
      };
    }

    if (archetype === 'cathedral_heritage') {
      return {
        paper: \`\${town} Chronicle & Heritage Times\`,
        spotted: \`Overheard in \${town}\`,
        gazette_headline: \`GARGOYLE ON \${town.toUpperCase()} CATHEDRAL SPIRE ACCIDENTALLY FITTED WITH SOLAR-POWERED FLASHLIGHT\`,
        spotted_chatter: \`Will the student who left their wooden punt blocking the River Cherwell / Ouse please tow it back to the boathouse.\`,
        local_scandal: \`Debates in the Senior Common Room over 14th-century cobbled alleyway bicycle rights in \${town}.\`,
        tourist_slogan: \`\${town}: City of Dreaming Spires, Cobbled Colleges & Medieval Charters!\`,
        tourist_brochure: \`Step into \${town}! Marvel at 800-year-old university quadrangles, soaring cathedral spires, and historic cobbled alleyways where scholars and poets debated philosophy since 1209! Enjoy punt rides along ancient riverways and quiet library cloisters!\`,
        tripadvisor_audit: \`ANALYST EXPERT AUDIT #3302: \${town} is an unmatched architectural treasure of medieval spires and university heritage. Visitors should prepare for aggressive bicycle traffic and dons arguing in Latin outside college gates. Rating: 4.8/5 — Sublimely atmospheric.\`
      };
    }

    if (archetype === 'celtic') {
      return {
        paper: \`\${town} Highland Gazette & Herald\`,
        spotted: \`Spotted: \${town} & District\`,
        gazette_headline: \`MYSTERY LOCH SIGHTING NEAR \${town.toUpperCase()} CASTLE PROMPTS EMERGENCY TARTAN WEAVING AUDIT\`,
        spotted_chatter: \`Will whoever is practicing the bagpipes past midnight near the castle grounds please relocate to the glen.\`,
        local_scandal: \`Debates over shortbread tin pricing and ancient clan tartan weaving rights in \${town}.\`,
        tourist_slogan: \`\${town}: Gateway to Highland Lochs, Ancient Castles & Tartan Weaving!\`,
        tourist_brochure: \`Experience \${town}! Discover ancient castle ruins overlooking misty lochs, traditional tartan weaving mills, and historic highland hospitality! Enjoy traditional shortbread, single-malt distilleries, and storytelling by peat fires!\`,
        tripadvisor_audit: \`ANALYST EXPERT AUDIT #6012: \${town} offers breathtaking highland scenery, ancient castle ruins, and legendary hospitality. Beware of midnight bagpipe practice and mizzle. Rating: 4.6/5 — Exceptional wild beauty.\`
      };
    }

    if (archetype === 'agricultural_rural') {
      return {
        paper: \`\${town} Agricultural Journal & Parish News\`,
        spotted: \`Spotted: \${town} Parish\`,
        gazette_headline: \`PARISH COUNCIL AUDITS 18TH-CENTURY CIDER BARREL RUSTLING NEAR THE VILLAGE GREEN\`,
        spotted_chatter: \`Will the owner of the prize marrow left by the church porch please claim it before the autumn show.\`,
        local_scandal: \`Disputes over parish council flower tub budgets and 1:2 cliff cheese rolling in \${town}.\`,
        tourist_slogan: \`\${town}: Home of Ancient Cider Orchards, Prize Marrows & Parish Traditions!\`,
        tourist_brochure: \`Welcome to \${town}! Explore rolling hills, historic parish greens, and 300-year-old cider orchards! Sample authentic farmhouse cheese, inspect prize marrows at the parish show, and enjoy traditional pub hearths!\`,
        tripadvisor_audit: \`ANALYST EXPERT AUDIT #2201: \${town} is a quintessential rural haven. Highlights include ancient cider tasting, parish tub disputes, and friendly village pub banter. Rating: 4.3/5 — Charming rural escape.\`
      };
    }

    if (archetype === 'coastal') {
      return {
        paper: \`\${town} Coastal Express\`,
        spotted: \`Spotted: \${town} Promenade\`,
        gazette_headline: \`MYSTERY DECKCHAIR DISCOVERED ON THE \${town.toUpperCase()} PROMENADE PROMPTS COASTGUARD AUDIT\`,
        spotted_chatter: \`To the person who took my salt-crusted deckchair while I was buying scampi: return it to the sea wall.\`,
        local_scandal: \`Sea-fog obscuring the pier for 48 hours while residents argue over beach hut paint colours.\`,
        tourist_slogan: \`\${town}: Where Invigorating Sea-Gales Meet Historic Coastal Promenades!\`,
        tourist_brochure: \`Visit \${town}! Enjoy 60mph coastal gales off the historic sea wall, fresh seafood baskets, and scenic clifftop walks! Explore traditional beach huts, salt-crusted promenade benches, and maritime heritage!\`,
        tripadvisor_audit: \`ANALYST EXPERT AUDIT #4010: \${town} offers authentic coastal mizzle, salt-corroded deckchairs, and high-street chip shops closing at dusk. Rating: 3.5/5 — Refreshing coastal sea-fog.\`
      };
    }

    return {
      paper: \`\${town} Gazette & District News\`,
      spotted: \`Spotted: \${town}\`,
      gazette_headline: \`MUNICIPAL COUNCIL INVESTIGATES HISTORIC TOP OF TOWN MARKET PRECINCT IN \${town.toUpperCase()}\`,
      spotted_chatter: \`Can the person who left their shopping trolley near the market precinct please collect it before dusk.\`,
      local_scandal: \`Disputes over parish council flower tubs and 1978 regional convention heritage in \${town}.\`,
      tourist_slogan: \`\${town}: Gateway to Historic Market Precincts & Post-War Civic Ambition!\`,
      tourist_brochure: \`Explore \${town}! Discover historic market precincts, post-war civic architecture, and friendly local high-street banter!\`,
      tripadvisor_audit: \`ANALYST EXPERT AUDIT #1100: \${town} offers an interesting glimpse into post-war municipal planning and market precinct heritage. Rating: 3.2/5 — Friendly local atmosphere.\`
    };
  }

  // REGIONAL CULTURAL ANCHORS & 100% REGION-MATED PATTERN MATRICES
  function getRegionalProfile(town) {
    const t = town.toLowerCase();
    
    if (/peacehaven|blackpool|brighton|hastings|portsmouth|torquay|scarborough|whitby|seaside|bay|harbour|beach|coast|pier|skegness|bournemouth|rye|margate|clacton/.test(t)) {
      return {
        region: 'Coastal / Maritime',
        affectation: \`Jewel of the \${town} Undercliff & Greenwich Meridian\`,
        mottos: [
          { motto: 'CLIFFUS ERODIT ET CUM FLUCTIBUS EAT', translation: 'The Cliff Erodes and Goes with the Waves' },
          { motto: 'MERIDIANUS VENTO SPLENDET', translation: 'The Meridian Shines in the Sea-Gale' },
          { motto: 'SCAMPI IN VENTO VOLAT', translation: 'Scampi Flies High in the Coastal Gale' },
          { motto: 'ANIMA IN PIANO BEACHED', translation: 'The Soul of an Abandoned Piano on the Beach' }
        ],
        twinned: ['Atlantis (Sunken)', 'Bermuda Triangle East', 'Sealand', 'Port Royal'],
        objects: ['rusted anchor', 'fibreglass seagull', 'salt-crusted deckchair', 'stolen harbour buoy', 'soggy fish basket', 'copper diving helmet'],
        crimes: ['illegal scampi smuggling', 'pier-hopping at low tide', 'lighthouse bell tampering', 'stealing sea-gale deckchairs'],
        profanities: ['utter coastal shite', 'atrocious salt-encrusted bollocks', 'proper sea-side tripe', 'complete pier-head clusterfuck'],
        slogans: [
          \`Experience the Invigorating Coastal Gales of \${town}!\`,
          \`\${town}: Where the Greenwich Meridian Meets Sea-Gale Erosion!\`,
          \`Discover \${town} — Premier Destination for Salt-Corroded Deckchair Maintenance!\`,
          \`Welcome to \${town}: Gateway to the Undercliff Walk & Coastal Bus Shelters!\`
        ],
        brochures: [
          \`Founded in 1916 by visionaries who raffled off cliffside plots in national newspapers! \${town} invites you to walk the historic Greenwich Meridian Line, where 1920s bungalows meet crumbling chalk cliffs at 3 inches per year!\`,
          \`Stroll the famous \${town} Undercliff Walk, where 19th-century shipwreck legends tell of 40 beached upright pianos serenading Channel tides! Enjoy 60mph coastal sea-gales, authentic salt-crusted deckchairs, and high-street chip shops closing at dusk!\`,
          \`Experience the legendary \${town} Meridian Centre & chalk clifftop! Located right where zero degrees longitude passes through Sussex, featuring 400 static caravans, coastal bus shelters, and scenic sea-wall scampi hurling!\`,
          \`Discover the ancient coastal legends of \${town}! From the Great Scampi Tempest of 1987 to emergency coastguard audits of abandoned beach huts, our parish preserves lore that rings true!\`
        ],
        reviews: [
          { reviewer: 'MeridianWalker', rating: 1, text: \`Walked the Meridian Line in \${town}. Got disoriented by sea-fog and ended up on the Meridian Centre clifftop gravel patch thinking I was in Dieppe.\` },
          { reviewer: 'DeckchairVictim', rating: 1, text: \`To the person who took my salt-crusted deckchair while I was buying scampi by the Undercliff Walk: I have you on Ring doorbell video.\` },
          { reviewer: 'PlotRaffleDescendant', rating: 2, text: \`My grandfather won a cliffside plot here in a 1920 Daily Express raffle. The plot fell into the English Channel in 1974. Great views though.\` },
          { reviewer: 'ScampiHurler', rating: 1, text: \`Tried eating scampi on the \${town} sea wall. A 60mph gale blew the entire tray into a coastguard cutter. 1 star.\` },
          { reviewer: 'BungalowOwner', rating: 2, text: \`Living 40 yards from the \${town} chalk cliff edge. Up to 38 yards this morning. Very atmospheric.\` },
          { reviewer: 'PianoSeeker', rating: 1, text: \`Came looking for the beached Undercliff piano legend in \${town}. Found a rusted shopping trolley and a wet seagull. Total bollocks.\` }
        ],
        taHeadlines: [
          \`ANALYST EXPERT AUDIT #4092: 1916 Land Swindles & Greenwich Meridian Erosion in \${town}\`,
          \`ANALYST EXPERT AUDIT #4093: 72-Hour Sea-Fog, Workhouse B&Bs, and A259 Resignation in \${town}\`,
          \`ANALYST EXPERT AUDIT #4094: Beached Shipwreck Pianos vs Runaway Inflatable Flamingos in \${town}\`
        ],
        taReviews: [
          \`ANALYST EXPERT AUDIT #4092: \${town} presents a fascinating study in coastal resignation. Founded as a 1916 newspaper raffle scheme, the town consists of a single linear road network (the A259) perpetually blanketed by a 72-hour sea-fog. The local gastronomy is defined strictly by lukewarm scampi served in cardboard trays that disintegrate under 50-knot Channel gales. Rating: 1.2/5 — Bring a foghorn and your own wellies.\`,
          \`ANALYST EXPERT AUDIT #4093: An inspection of the \${town} Greenwich Meridian monument reveals that zero degrees longitude offers zero protection from coastal erosion. The local B&B operates on a 19th-century workhouse model, serving cold toast strictly at 7:00am while the landlord glares until guests vacate the premises. Rating: 1.5/5 — Mostly overcast with severe deckchair rust.\`,
          \`ANALYST EXPERT AUDIT #4094: \${town}'s Undercliff Walk is renowned for washed-up driftwood and the legend of the 1884 beached piano shipwreck. However, modern visitors are more likely to encounter runaway inflatable flamingos and 2am kebab queue disputes outside the Meridian Centre. Rating: 1.1/5 — Attracious shite.\`
        ],
        schools: [
          \`94% Pass Rate in Coastal Navigation & Salt-Crusted Deckchair Maintenance in \${town}.\`,
          \`Ofsted Grade 3: Coastal Mizzle Navigation and Sea Wall Scampi Hurling in \${town}.\`
        ],
        workforce: [
          \`Coastal Sea-Gale Rescue & RNLI Inflatable Flamingo Duty (74%) in \${town}.\`,
          \`Caravan Park Security & Promenade Fish Chippy Management (82%) in \${town}.\`
        ],
        housing: [
          \`Seaside promenade flat in \${town}: £520,000 with authentic salt-gale window corrosion.\`,
          \`1920s clifftop bungalow in \${town}: £410,000 with 3 inches per year cliff erosion included.\`
        ],
        excuses: [
          \`Blame 60mph English Channel gales, 1920s clifftop plot developers, chalk erosion, and coastal tides.\`,
          \`Blame North Sea mizzle, 19th-century pier engineers, and sea-wall scampi hurling.\`
        ]
      };
    }

    // 2. Celtic / Scottish / Welsh / Highland
    if (/edinburgh|glasgow|inverness|aberdeen|dundee|stirling|perth|cardiff|swansea|bangor|aberystwyth|wales|scotland|highland|celtic|kirk|loch/.test(t)) {
      return {
        region: 'Celtic / Highland',
        affectation: \`Heart of the \${town} Highland Glen & Ancient Clan Hold\`,
        mottos: [
          { motto: 'NEMO ME IMPUNE LACESSIT', translation: 'No One Provokes Me With Impunity' },
          { motto: 'CLANNA ET MONTES', translation: 'The Clan and the Mountains Stand' }
        ],
        twinned: ['Valhalla', 'Skara Brae', 'Isle of Skye', 'Camelot'],
        objects: ['shortbread tin', 'bagpipe drone', 'tartan plaid', 'single-malt cask', 'peat brick', 'haggis trap'],
        crimes: ['illegal bagpipe solos past midnight', 'shortbread tin price-fixing', 'highland loch monster hoaxing'],
        profanities: ['utter highland shite', 'atrocious tartan bollocks', 'proper glen-head tripe'],
        slogans: [
          \`\${town}: Gateway to Highland Lochs, Ancient Castles & Tartan Weaving!\`,
          \`Discover \${town} — Home of Single-Malt Heritage & Peat-Fired Pubs!\`
        ],
        brochures: [
          \`Experience \${town}! Discover ancient castle ruins overlooking misty lochs, traditional tartan weaving mills, and historic highland hospitality! Enjoy traditional shortbread, single-malt distilleries, and storytelling by peat fires!\`
        ],
        reviews: [
          { reviewer: 'ShortbreadAuditor', rating: 1, text: \`Visited the \${town} castle grounds. Got cornered by a piper demanding £4 for a photo with a stuffed haggis.\` },
          { reviewer: 'LochSeeker', rating: 2, text: \`Stood by the glen in \${town} for 3 hours in torrential mizzle. Didn't see any monster, but the single malt in the local pub was outstanding.\` }
        ],
        taHeadlines: [
          \`ANALYST EXPERT AUDIT #6012: Highland Castles, Tartan Weaving, and Midnight Bagpipes in \${town}\`
        ],
        taReviews: [
          \`ANALYST EXPERT AUDIT #6012: \${town} offers breathtaking highland scenery, ancient castle ruins, and legendary hospitality. Beware of midnight bagpipe practice and mizzle. Rating: 4.6/5 — Exceptional wild beauty.\`
        ],
        schools: [\`96% Pass Rate in Highland Navigation & Tartan Weaving in \${town}.\`],
        workforce: [\`Highland Distillery Management (68%) & Castle Heritage Duty (24%) in \${town}.\`],
        housing: [\`Highland cottage near \${town}: £380,000 with authentic peat-fire hearth.\`],
        excuses: [\`Blame 18th-century clan disputes, highland mizzle, and bagpipe pitch tuning.\`]
      };
    }

    // 3. Cathedral / Heritage & Academic Spires
    if (/oxford|cambridge|york|durham|canterbury|lincoln|exeter|bath|salisbury|winchester|ely|chester|wells|stratford/.test(t)) {
      return {
        region: 'Cathedral / Heritage',
        affectation: \`City of \${town} Dreaming Spires & Medieval Quadrangles\`,
        mottos: [
          { motto: 'DOMINUS ILLUMINATIO MEA', translation: 'The Lord is My Light' },
          { motto: 'SPIRES ET COBBLES', translation: 'Spires and Cobblestones Endure' }
        ],
        twinned: ['Heidelberg', 'Bologna (1088 AD)', 'Oxford High Street', 'Florence North'],
        objects: ['wooden punt paddle', 'parchment scroll', 'solar gargoyle', 'brass rubbing', 'latin dictionary'],
        crimes: ['unauthorized river punting', 'latin grammar vandalism', 'stealing college quad gargoyles'],
        profanities: ['scholarly academic shite', 'pretentious quadrangle bollocks'],
        slogans: [
          \`\${town}: City of Dreaming Spires, Cobbled Colleges & Medieval Charters!\`
        ],
        brochures: [
          \`Step into \${town}! Marvel at 800-year-old university quadrangles, soaring cathedral spires, and historic cobbled alleyways where scholars and poets debated philosophy since 1209!\`
        ],
        reviews: [
          { reviewer: 'PuntRower', rating: 1, text: \`Rented a wooden punt in \${town}. Crashed into a Senior Fellow reading Aristotle under a willow tree. 1 star.\` },
          { reviewer: 'QuadWalker', rating: 2, text: \`Walked through \${town} college quad. Got yelled at in Latin by a porter for stepping on 500-year-old lawn grass.\` }
        ],
        taHeadlines: [
          \`ANALYST EXPERT AUDIT #3302: Medieval Spires, Punting Battles, and Latin Porters in \${town}\`
        ],
        taReviews: [
          \`ANALYST EXPERT AUDIT #3302: \${town} is an unmatched architectural treasure of medieval spires and university heritage. Visitors should prepare for aggressive bicycle traffic and dons arguing in Latin outside college gates. Rating: 4.8/5 — Sublimely atmospheric.\`
        ],
        schools: [\`99% Pass Rate in Latin Grammar & Punting Navigation in \${town}.\`],
        workforce: [\`University Cloister Management (72%) & Library Archive Custody (22%) in \${town}.\`],
        housing: [\`Grade II Listed townhouse in \${town}: £1,200,000 with authentic 16th-century timber damp.\`],
        excuses: [\`Blame 14th-century university charters, river punting currents, and Latin translation errors.\`]
      };
    }

    // 4. Agricultural / West Country / Rural Parish
    if (/gloucester|taunton|hereford|somerset|cotswold|devon|dorset|wiltshire|cornwall|shropshire|norfolk|suffolk|lincolnshire|cumbria|yorkshire/.test(t)) {
      return {
        region: 'Agricultural / Rural',
        affectation: \`Heart of the \${town} Parish Green & Ancient Orchards\`,
        mottos: [
          { motto: 'CIDER ET MARROW', translation: 'Cider and Marrow Endure' },
          { motto: 'CHEESE ROLLIS VOLANT', translation: 'The Rolling Cheese Flies High' }
        ],
        twinned: ['The Shire (Lower)', 'Sleepy Hollow', 'Little Snoring', 'Much Binding in the Marsh'],
        objects: ['9lb Double Gloucester cheese', 'farmhouse cider barrel', 'prize marrow', 'welly boot', 'parish flower tub'],
        crimes: ['1:2 slope cheese rustling', 'farmhouse cider barrel tampering', 'sabotaging parish marrow weigh-ins'],
        profanities: ['proper West Country shite', 'farmhouse cider bollocks', 'parish tub clusterfuck'],
        slogans: [
          \`\${town}: Home of Ancient Cider Orchards, 1:2 Slope Cheese Rolling & Parish Traditions!\`
        ],
        brochures: [
          \`Welcome to \${town}! Explore rolling hills, historic parish greens, and 300-year-old cider orchards! Sample authentic farmhouse cheese, inspect prize marrows at the parish show, and enjoy traditional pub hearths!\`
        ],
        reviews: [
          { reviewer: 'CiderTaster', rating: 1, text: \`Tried authentic farmhouse cider in \${town}. Woke up 14 hours later in a hayloft with a ribbon for 2nd place in the parish marrow contest.\` },
          { reviewer: 'CheeseRoller', rating: 2, text: \`Participated in the \${town} Cooper's Hill cheese rolling. Chased a 9lb Double Gloucester down a 1:2 slope. Broke both ankles. 5 stars.\` }
        ],
        taHeadlines: [
          \`ANALYST EXPERT AUDIT #2201: 300-Year Cider Orchards, Prize Marrows, and 1:2 Slope Cheese Rolling in \${town}\`
        ],
        taReviews: [
          \`ANALYST EXPERT AUDIT #2201: \${town} presents a fascinating study in West Country cider heritage and agricultural passion. Highlights include 300-year-old cider orchards, parish marrow competitions, and the legendary 1:2 slope cheese rolling. Rating: 4.3/5 — Authentic rural charm.\`
        ],
        schools: [\`97% Pass Rate in Cider Fermentation & Cheese Slope Navigation in \${town}.\`],
        workforce: [\`Farmhouse Cider Production (64%) & Parish Show Management (28%) in \${town}.\`],
        housing: [\`Cotswold stone cottage in \${town}: £680,000 with authentic thatch roof damp.\`],
        excuses: [\`Blame West Country mizzle, 1:2 slope gravity, and parish marrow judges.\`]
      };
    }
    
    // Default Commuter / Suburban Belt (Basingstoke, Bracknell, Slough, Newbury, Milton Keynes, Crawley, etc.)
    return {
      region: 'Commuter / Suburban Belt',
      affectation: \`Gateway to the \${town} Dual Carriageway Bypass\`,
      mottos: [
        { motto: 'ROTAMUR ET MANEMUS', translation: 'We Turn on the Roundabout, and We Remain' },
        { motto: 'PRECINCTUS IN AETERNUM', translation: 'The Precinct Stands Forever' }
      ],
      twinned: ['Swindon Magic Roundabout', 'Slough Flyover', \`\${town} Ring Road East\`],
      objects: ['1970s tupperware box', 'broken shopping trolley', 'concrete bollard', 'disused Wimpy sign', 'parking meter', 'vape battery charger'],
      crimes: ['shopping trolley canal immersion', 'roundabout drift racing', 'municipal bollard theft', 'aggravated bicycle borrowing'],
      profanities: ['suburban commuter shite', 'bureaucratic council bollocks', 'atrocious roundabout clusterfuck', 'utter precinct tripe'],
      slogans: [
        \`Experience the Heroic Ambition of \${town}!\`,
        \`\${town}: Where Modern Engineering Meets Heritage Damp!\`,
        \`Discover \${town} — World-Class Consecrated Precincts!\`,
        \`Welcome to \${town}: Gateway to the Bypass Network!\`
      ],
      brochures: [
        \`Visit our magnificent \${town} indoor shopping concourse! Obviously mostly shuttered since Amazon dismantled traditional high streets, it now offers an authentic experience featuring 3 remaining vape outlets and scenic indoor moss growth!\`,
        \`Marvel at the magnificent \${town} 1974 multi-storey car park and concrete subway system, hailed by municipal planners as a triumph of modern engineering superior to the Hanging Gardens of Babylon!\`,
        \`Steeped in glorious heritage! \${town} is the celebrated birthplace of the 1978 regional tupperware convention and home to a historic 17th-century tavern brawl!\`,
        \`Experience the continuous orbital bliss of \${town}'s 7-tier roundabout system, designed in 1968 to ensure motorists never actually reach their intended destination!\`
      ],
      reviews: [
        { reviewer: 'TrappedMotorist', rating: 1, text: \`Entered the \${town} dual carriageway roundabout. Completed 47 laps before finding an exit. Total bollocks.\` },
        { reviewer: 'PrecinctShopper', rating: 2, text: \`Visited the \${town} concourse. Found 3 vape shops, a tanning salon, and scenic indoor moss. What a clusterfuck.\` },
        { reviewer: 'KebabRankSurvivor', rating: 1, text: \`Waited 3 hours at the \${town} taxi rank at 2am. System gave up and we ate cold kebabs on a bench. Absolute shite.\` },
        { reviewer: 'RampVictim', rating: 1, text: \`Spent 4 hours stuck on the \${town} multi-storey car park ramp. Sat nav suggested walking back through the precinct.\` },
        { reviewer: 'HighStreetVisitor', rating: 2, text: \`Visited the \${town} high street. Found 14 shuttered stores and 3 betting shops. Utter tripe.\` },
        { reviewer: 'PrecinctAuditor', rating: 1, text: \`The \${town} parish council spent £3.4 million building a concrete glass cube over the disused 1974 subway while 3 remaining vape outlets took over the High Street.\` }
      ],
      taHeadlines: [
        \`Dead-End One-Way Systems and Missing Cathedral Ruins in \${town}\`,
        \`The 2am Kebab Rank Taxi Cartel Monopoly Trap in \${town}\`
      ],
      taReviews: [
        \`Visitors arriving in \${town} are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh, while the main street features a 2am kebab rank queue.\`,
        \`A masterclass in motion without destination. The \${town} ring road and one-way system forces motorists into continuous circular orbit until fuel or morale is completely exhausted.\`,
        \`The \${town} parish council spent £3.4 million on a concrete glass pavilion over the 1974 subway while disused 1970s precinct tiles fell into the underpass.\`,
        \`Got trapped on the \${town} multi-storey car park ramp for 4 hours. Satellite navigation gave up and suggested walking back through the precinct.\`
      ],
      schools: [
        \`98% Pass Rate in Roundabout Navigation & Vape Shop Operations in \${town}.\`,
        \`14% Ofsted Requires Improvement in \${town}, 86% Closed by Magistrate Order.\`
      ],
      workforce: [
        \`Roundabout Maintenance Board (62%) and Vape Shop Administration (28%) in \${town}.\`,
        \`Multi-Storey Car Park Ramp Management & Traffic Orbit Ops (85%) in \${town}.\`
      ],
      housing: [
        \`1970s precinct maisonette in \${town}: £340,000 with authentic brutalist concrete damp.\`,
        \`Average 2-bed terrace in \${town}: £450,000 with authentic heritage damp.\`
      ],
      excuses: [
        \`Blame 1968 brutalist roundabout architects, concrete suppliers, and highway planners.\`,
        \`Blame 1970s urban planners, traditional \${town} weather, and regional highway directors.\`
      ]
    };
  }

  function buildDynamicFallbackResult(town, lensId, mode) {
    const reg = getRegionalProfile(town);
    const localLore = getHyperLocalLore(town);
    const archetype = classifyTown ? classifyTown(town) : 'commuter';

    const idxSlogan   = hashTown(town, 13) % reg.slogans.length;
    const idxBrochure = hashTown(town, 37) % reg.brochures.length;
    const idxTaHead   = hashTown(town, 73) % reg.taHeadlines.length;
    const idxTaRev    = hashTown(town, 109) % reg.taReviews.length;
    const idxMotto    = hashTown(town, 137) % reg.mottos.length;

    // COMBINATORIAL FRESH SENTENCE SYNTHESIZER
    const BROCHURE_SYNTHESIZER = {
      agricultural: {
        slot1: ['Welcome to ' + town, 'Nestled in the rolling West Country hills of ' + town, 'Steeped in 300-year-old orchard tradition in ' + town, 'Discover the agrarian heart of ' + town],
        slot2: ['where Cooper\'s Hill 9lb Double Gloucester cheese rolls down 1:2 slopes', 'famed for historic parish marrow competitions and', 'where ancient farmhouse cider cellars meet', 'home to 18th-century cider barrel rustling legends where'],
        slot3: ['visitors can sample authentic cloudy cider and', 'parish elders audit ornamental flower tub budgets while', 'inspect prize marrows at the autumn parish show and', 'enjoy traditional pub hearth banter alongside'],
        slot4: ['thatch-roofed Cotswold stone cottages!', 'farmhouse cheese tasting in historic timber barns!', 'panoramic views of parish greens and apple orchards!', 'rustic West Country hospitality!']
      },
      cathedral_heritage: {
        slot1: ['Step into historic ' + town, 'Marvel at 800-year-old university quadrangles in ' + town, 'Explore the medieval spires of ' + town, 'Welcome to ancient ' + town],
        slot2: ['where scholars and poets debated philosophy since 1209 and', 'where soaring cathedral gargoyles overlook cobbled alleyways and', 'home to historic river punting battles where', 'where 14th-century college charters meet'],
        slot3: ['visitors can enjoy quiet library cloisters and', 'college porters maintain 500-year-old lawn traditions while', 'scholars navigate ancient riverways on wooden punts and', 'explore historic brass rubbings alongside'],
        slot4: ['atmospheric cobbled streetscapes!', 'scholarly Latin debates in ancient taverns!', 'sublimely preserved medieval architecture!', 'peaceful riverway walks!']
      },
      celtic: {
        slot1: ['Experience ' + town, 'Heart of the highland glens in ' + town, 'Welcome to ancient ' + town, 'Discover the wild beauty of ' + town],
        slot2: ['where historic castle ruins overlook misty lochs and', 'famed for traditional tartan weaving mills and', 'where single-malt distillery hearths meet', 'home to ancient clan legends where'],
        slot3: ['travelers enjoy traditional shortbread and peat fires while', 'bagpipers serenade the glen and', 'inspect historic clan plaid weaving alongside', 'sample single-malt cask reserves in'],
        slot4: ['breathtaking highland scenery!', 'historic peat-fired pub hearths!', 'traditional Scottish hospitality!', 'misty mountain glens!']
      }
    };

    function synthesizeFreshSentence(townName, archKey) {
      const syn = BROCHURE_SYNTHESIZER[archKey];
      if (!syn) return null;
      const s1 = syn.slot1[hashTown(townName, 11) % syn.slot1.length];
      const s2 = syn.slot2[hashTown(townName, 37) % syn.slot2.length];
      const s3 = syn.slot3[hashTown(townName, 79) % syn.slot3.length];
      const s4 = syn.slot4[hashTown(townName, 103) % syn.slot4.length];
      return s1 + ', ' + s2 + ' ' + s3 + ' ' + s4;
    }

    const synthesizedBrochure = synthesizeFreshSentence(town, archetype);

    const slogan = localLore.tourist_slogan || reg.slogans[idxSlogan].replace(/{town}/g, town);
    const brochure = localLore.tourist_brochure || synthesizedBrochure || reg.brochures[idxBrochure].replace(/{town}/g, town);
    const taHead = reg.taHeadlines[idxTaHead].replace(/{town}/g, town);
    const taRev = localLore.tripadvisor_audit || reg.taReviews[idxTaRev].replace(/{town}/g, town);

    const reviewPool = reg.reviews;

    const rIdx1 = hashTown(town, 401) % reviewPool.length;
    let rIdx2 = hashTown(town, 503) % reviewPool.length;
    if (rIdx2 === rIdx1) rIdx2 = (rIdx2 + 1) % reviewPool.length;
    let rIdx3 = hashTown(town, 607) % reviewPool.length;
    while (rIdx3 === rIdx1 || rIdx3 === rIdx2) rIdx3 = (rIdx3 + 1) % reviewPool.length;

    const reviews = [reviewPool[rIdx1], reviewPool[rIdx2], reviewPool[rIdx3]];

    const idxSchools   = hashTown(town, 151) % reg.schools.length;
    const idxWorkforce = hashTown(town, 241) % reg.workforce.length;
    const idxHousing   = hashTown(town, 307) % reg.housing.length;
    const idxExcuse    = hashTown(town, 373) % reg.excuses.length;

    return {
      lens: (mode === 'tourist_board' || mode === 'mode3') ? 'multi_lens' : lensId,
      affectation: reg.affectation,
      twinned_with: reg.twinned,
      motto: reg.mottos[idxMotto].motto,
      motto_translation: reg.mottos[idxMotto].translation,
      excuse: reg.excuses[idxExcuse],
      tourist_board: {
        slogan: slogan,
        brochure_copy: brochure
      },
      tripadvisor_audit: {
        headline: taHead,
        overall_rating: \`\${((hashTown(town, 53) % 15) / 10 + 1.0).toFixed(1)} / 5 — Mostly Overcast\`,
        audit_review: taRev
      },
      customer_reviews: reviews,
      socio_economic: {
        schools_education: reg.schools[idxSchools],
        crime_order: reg.crimes[hashTown(town, 193) % reg.crimes.length],
        workforce_industry: reg.workforce[idxWorkforce],
        housing_property: reg.housing[idxHousing]
      }
    };
  }

  async function generate() {
    const location = locationInput.value.trim();
    if (!location) return;

    currentLocation = location;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('output-panel').classList.remove('visible');
    document.getElementById('error').style.display = 'none';
    generateBtn.disabled = true;

    try {
      if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {
        // Pure Instant Client-Side Generation for Mode III on GitHub Pages — 0 Remote Worker Dependency
        setTimeout(() => {
          const result = buildDynamicFallbackResult(location, 'proud_of_it', selectedMode);
          renderOutput(location, result);
          document.getElementById('loading').style.display = 'none';
          generateBtn.disabled = false;
          checkReady();
        }, 150);
        return;
      }

      const WORKER = window.location.origin.includes('workers.dev') ? window.location.origin : 'https://flagrants-api.leanspirited.workers.dev';
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const researchRes = await fetch(\`\${WORKER}/research\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: selectedMode, subject: location }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!researchRes.ok) {
        currentFindings = {
          _subject: location,
          tier1: { location, region: 'United Kingdom' },
          tier3: { dark_history: \`A place of considerable notoriety and ancient local misdemeanour in \${location}.\` },
          comedy_seed: \`Famous for shite local pubs, 2am kebab ranks, and local taxi monopolies in \${location}.\`,
          nightlife_catering: \`Shite pubs, lukewarm curry houses, and throwing up kebabs at the \${location} taxi rank.\`,
          infrastructure_flaws: \`Local bus monopolies, disused bus shelters, and 1970s concrete precincts in \${location}.\`,
          weird_local_lore: \`Scampi hurling, municipal blood-letting trials, rectal cheese processing, subterranean sausage fermentation, or cheese rolling in \${location}.\`,
          claim_to_fame: \`Birthplace of the 1974 regional \${location} tupperware convention.\`
        };
      } else {
        currentFindings = await researchRes.json();
      }

      await reDesignWithLens(selectedLens || 'proud_of_it');
    } catch (err) {
      const fallbackResult = buildDynamicFallbackResult(currentLocation, selectedLens || 'proud_of_it', selectedMode);
      renderOutput(currentLocation, fallbackResult);
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
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const designRes = await fetch(\`\${WORKER}/design\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ findings: currentFindings, lens: lensId, mode: selectedMode }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      let result;
      if (!designRes.ok) {
        result = buildDynamicFallbackResult(currentLocation, lensId, selectedMode);
      } else {
        result = await designRes.json();
      }

      renderOutput(currentLocation, result);
    } catch (err) {
      result = buildDynamicFallbackResult(currentLocation, lensId, selectedMode);
      renderOutput(currentLocation, result);
    }
  }

  function renderOutput(location, result) {
    document.getElementById('subject-name').textContent = location;
    const affectation = result.affectation ?? result.nickname ?? '';
    document.getElementById('subject-affectation').textContent = affectation ? \` — \${affectation}\` : '';

    // Render Motto Ribbon Banner under Main Title
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

    const isMode3 = (selectedMode === 'tourist_board' || selectedMode === 'mode3');

    if (isMode3) {
      crestLayout.style.display = 'none';
      reDesignBar.style.display = 'none';
    } else {
      crestLayout.style.display = 'grid';
      reDesignBar.style.display = 'flex';

      const crestContainer = document.getElementById('crest-svg');
      try {
        const specForShield = { ...result, motto: '', motto_translation: '' };
        crestContainer.innerHTML = renderSpec(specForShield);
      } catch (e) {
        crestContainer.innerHTML = result.svg || '';
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

      // DYNAMIC PANEL SHOW SPEAKER SHUFFLING & INTERJECTION ENGINE
      const commentary = document.getElementById('commentary');
      commentary.innerHTML = '';
      const charges = result.charges ?? [];

      const seed = hashTown(location, 777);
      const shuffledPanelists = [...PANELISTS].sort((a, b) => {
        return (hashTown(location + a.id, seed) % 100) - (hashTown(location + b.id, seed) % 100);
      });
      
      (result.commentary ?? []).forEach((block, idx) => {
        const speaker = shuffledPanelists[idx % shuffledPanelists.length];
        const hasInterjection = (hashTown(location + idx, 999) % 2) === 0;

        const div = document.createElement('div');
        div.className = 'commentary-block';

        const isFieldBlock = (block.element || '').toLowerCase().includes('field');
        let badgeContent = '';

        if (isFieldBlock) {
          const f = result.field || { tincture: 'azure', division: 'plain' };
          badgeContent = \`<svg viewBox="-100 0 200 240" width="32" height="32" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">\${renderField(f, 'mini-' + idx)}</svg>\`;
        } else {
          const charge = charges[(idx - 1) % Math.max(1, charges.length)] || { id: 'bayeux_knight_fleeing', tincture: 'or' };
          const svgCharge = renderCharge(charge, 0, 1, 'story-' + idx, true);
          badgeContent = \`<svg viewBox="-30 -30 60 60" width="32" height="32" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">\${svgCharge}</svg>\`;
        }

        let interjectionHtml = '';
        if (hasInterjection) {
          const interjector = shuffledPanelists[(idx + 1) % shuffledPanelists.length];
          const interjectionText = INTERJECTIONS[hashTown(location + idx, 444) % INTERJECTIONS.length];
          interjectionHtml = \`
            <div class="interjection-card">
              <div class="interjection-header">⚡ \${interjector.avatar} \${escapeHtml(interjector.name)} (\${escapeHtml(interjector.role)}) INTERJECTS:</div>
              <div class="interjection-text">\${escapeHtml(interjectionText)}</div>
            </div>\`;
        }

        div.innerHTML = \`
          <div class="commentary-header">
            <div class="story-icon-badge">\${badgeContent}</div>
            <div class="speaker-tag-badge">\${speaker.avatar} \${escapeHtml(speaker.name)}</div>
            <div class="commentary-element">\${escapeHtml(block.element)}</div>
          </div>
          <div class="commentary-text">"\${escapeHtml(block.text)}"</div>
          \${interjectionHtml}\`;
        commentary.appendChild(div);
      });
    }

    // Bulletproof Dynamic Renderer — 100% Location Bitshift Hash Matrix
    const mode3Container = document.getElementById('mode3-container');
    if (isMode3 || result.tourist_board || result.tripadvisor_audit) {
      const fallbackObj = buildDynamicFallbackResult(location, result.lens || 'proud_of_it', selectedMode);
      const regProf = getRegionalProfile(location);
      const localLore = getHyperLocalLore(location);
      
      const tb = result.tourist_board || result.touristBoard || result.brochure || {};
      const ta = result.tripadvisor_audit || result.tripadvisor || result.audit || result.expert_audit || {};
      const cr = (Array.isArray(result.customer_reviews) && result.customer_reviews.length > 0) ? result.customer_reviews : ((Array.isArray(result.reviews) && result.reviews.length > 0) ? result.reviews : fallbackObj.customer_reviews);
      const se = result.socio_economic || result.socioEconomic || {};

      const slogan = tb.slogan || tb.headline || tb.title || fallbackObj.tourist_board.slogan;
      const copy   = tb.brochure_copy || tb.copy || tb.text || tb.description || fallbackObj.tourist_board.brochure_copy;

      const rating     = ta.overall_rating || ta.rating || fallbackObj.tripadvisor_audit.overall_rating;
      const taHeadline = ta.headline || ta.title || fallbackObj.tripadvisor_audit.headline;
      const taReview   = ta.audit_review || ta.review || ta.text || ta.body || fallbackObj.tripadvisor_audit.audit_review;

      document.getElementById('tb-slogan').textContent = slogan;
      document.getElementById('tb-copy').textContent   = copy;

      document.getElementById('ta-rating').textContent   = \`Rating: \${rating}\`;
      document.getElementById('ta-headline').textContent = taHeadline;
      document.getElementById('ta-review').textContent   = taReview;

      const crList = document.getElementById('cr-list');
      crList.innerHTML = '';
      
      cr.forEach(rev => {
        const rVal = parseInt(rev.rating) || 1;
        const stars = '★'.repeat(Math.max(1, Math.min(5, rVal))) + '☆'.repeat(5 - Math.max(1, Math.min(5, rVal)));
        const card = document.createElement('div');
        card.className = 'cr-card';
        card.innerHTML = \`
          <div class="cr-header">
            <span class="cr-reviewer">👤 \${escapeHtml(rev.reviewer || 'Visitor')}</span>
            <span class="cr-stars">\${stars}</span>
          </div>
          <div class="cr-text">"\${escapeHtml(rev.text || 'No comment provided.')}"</div>\`;
        crList.appendChild(card);
      });

      document.getElementById('se-schools').textContent   = se.schools_education || fallbackObj.socio_economic.schools_education;
      document.getElementById('se-crime').textContent     = se.crime_order || fallbackObj.socio_economic.crime_order;
      document.getElementById('se-workforce').textContent = se.workforce_industry || fallbackObj.socio_economic.workforce_industry;
      document.getElementById('se-housing').textContent   = se.housing_property || fallbackObj.socio_economic.housing_property;

      document.getElementById('excuse-text').textContent = result.excuse || fallbackObj.excuse;

      // Render Section 6: Recent Events & Breaking Municipal Incidents
      const RECENT_EVENTS_PATTERNS = {
        antiquity: [
          'Zero breaking news reported in ' + location + ' in the last 72 hours. The most significant recent municipal incident on record remains the 1348 parish poultry quarantine during the Black Death.',
          'Nothing notable has occurred in ' + location + ' since the Great Tupperware Freight Convention of 1978. Local journalists are currently interviewing a disused lamppost for breaking updates.',
          'Zero newsworthy events in ' + location + ' since 1642, when a Royalist cavalry troop got lost on the parish green and demanded directions from a swan.'
        ],
        fabrication: [
          'BREAKING SCOOP: A 40-foot golden dragon was spotted hovering over the ' + location + ' High Street... okay, fine, we made that up. It was actually a damp pigeon eating a discarded sausage roll.',
          'MUNICIPAL BULLETIN: NASA designated the ' + location + ' main roundabout as a backup Mars landing site... absolute bollocks, obviously. The council just painted the curb yellow.',
          'EXCLUSIVE: Archeologists discovered a 2,000-year-old Roman amphitheatre beneath the ' + location + ' Morrisons car park... complete shite. It\'s just a rusted shopping trolley in a pothole.'
        ],
        nada: [
          'RECENT EVENTS: Nada. Zero. Absolutely nothing. Move along, these aren\'t the droids you\'re looking for. A parish dog barked at a wheelie bin at 3:14pm, but morale quickly recovered.',
          'BREAKING INCIDENT LOG: Nothing here but us chickens. A seagull dropped a lukewarm chip on a 2004 Ford Fiesta. That is literally the entire 24-hour police log for ' + location + '.',
          'PARISH STATUS: Total tumbleweed. The local newspaper\'s lead story today is a 2-paragraph obituary for a prize marrow.'
        ],
        waiting: [
          'SOMETHING COOL WILL HAPPEN IN ' + location + ' ANY DAY NOW... any month now... any century now... Local historians have been sitting by the bus stop since 1994 waiting for news.',
          'INCIDENT LOG: A resident sat on a bench in ' + location + ' and thought they saw a Hollywood celebrity, but it was just a wet gorse bush swaying in the sea-fog.',
          'BREAKING: The parish council convened an emergency 4-hour meeting to discuss whether a 2012 flyer on the noticeboard should be removed. Decision postponed until 2028.'
        ]
      };

      const eventCategories = Object.keys(RECENT_EVENTS_PATTERNS);
      const catIdx = (hashTown(location, 443) + window._clickCount) % eventCategories.length;
      const catKey = eventCategories[catIdx];
      const eventPool = RECENT_EVENTS_PATTERNS[catKey];
      const itemIdx = (hashTown(location, 557) + window._clickCount) % eventPool.length;
      document.getElementById('recent-events-text').textContent = eventPool[itemIdx];

      // Render Hyper-Local Gazette & Spotted:[Town] Intelligence
      window._clickCount = (window._clickCount || 0) + 1;
      let gHead = localLore.gazette_headline;
      if (Array.isArray(localLore.gazette_headlines) && localLore.gazette_headlines.length > 0) {
        gHead = localLore.gazette_headlines[hashTown(location, 107 + window._clickCount) % localLore.gazette_headlines.length];
      }

      const townObj = reg.objects[(hashTown(location, 11) + window._clickCount) % reg.objects.length];
      const townCrime = reg.crimes[(hashTown(location, 17) + window._clickCount) % reg.crimes.length];
      const townScandal = localLore.local_scandal || 'disputes over parish council flower tub budgets';

      const GOSSIP_CHANNELS = [
        'Laminated note taped to parish lamp-post in ' + location + ': To whoever took my ' + townObj + ', return it before dusk or the police will be informed.',
        'Nextdoor App Thread: Has anyone else in ' + location + ' noticed a man measuring the parish flower tubs with a wooden ruler at 6am?',
        'Local Facebook Admin Post: Turn off comments on the ' + location + ' thread, people are making personal accusations about ' + townCrime + '.',
        'Handwritten card pinned to church hall: Found one ' + townObj + ' near the main precinct in ' + location + '.',
        'Neighbourhood Watch WhatsApp: Suspicious individual inspecting a ' + townObj + ' near ' + location + '.',
        'Passive-aggressive note under windshield wiper in ' + location + ': You parked 4 inches over my dropped kerb while retrieving a ' + townObj + '.',
        'Post Office window notice in ' + location + ': Low-resolution CCTV image of suspect involved in ' + townCrime + ' on display.',
        'Overheard in bakery queue: He swore on his mother\'s prize marrow that the ' + location + ' council decision was rigged.',
        'Pub Taproom Rumour in ' + location + ': The chairman secretly traded a ' + townObj + ' during ' + townScandal + '.',
        'Ring Doorbell Night-Vision Video in ' + location + ': To the person who borrowed my ' + townObj + ': I have your slippers on 1080p footage.'
      ];

      let chatterText = localLore.spotted_chatter;
      if (Array.isArray(localLore.spotted_chatters) && localLore.spotted_chatters.length > 0) {
        chatterText = localLore.spotted_chatters[hashTown(location, 223 + window._clickCount) % localLore.spotted_chatters.length];
      } else if (!localLore.spotted_chatter || hashTown(location, 223 + window._clickCount) % 10 !== 9) {
        chatterText = GOSSIP_CHANNELS[hashTown(location, 223 + window._clickCount) % GOSSIP_CHANNELS.length];
      }

      document.getElementById('gazette-paper-name').textContent = \`📰 \${localLore.paper}\`;
      document.getElementById('gazette-headline').textContent   = \`"\${gHead}"\`;
      document.getElementById('spotted-group-name').textContent  = \`📱 \${localLore.spotted}\`;
      document.getElementById('spotted-post-text').textContent   = \`"\${chatterText}"\`;

      // Render Section 7: Historic Luminary Quotes & Subsequent Municipal Descent
      const LUMINARY_QUOTES = {
        coastal: [
          {
            author: 'John Betjeman (1937)',
            quote: 'Come, friendly gales, and sweep the coastal mizzle clear...',
            reality: location + ' ignored Sir John\'s poetic plea and instead built 400 static caravans directly on the eroding chalk cliff edge, leading residents to erect Ring cameras to watch the footpaths fall into the sea.'
          },
          {
            author: 'Bram Stoker (1897)',
            quote: 'The gray sea mizzle rolled over the cliffside ruins like a dark Victorian shroud...',
            reality: location + ' took Dracula\'s gothic atmosphere as a direct commercial instruction, charging £8 for velvet cloaks while seagulls steal doner meat outside the fish chippy.'
          }
        ],
        cathedral_heritage: [
          {
            author: 'Dr. Samuel Johnson (1777)',
            quote: 'When a man is tired of the spires, he is tired of life...',
            reality: 'When a traveler is tired of ' + location + ', he has usually been yelled at in Latin by a college porter for walking on 500-year-old quadrangle grass while trying to find a public toilet.'
          },
          {
            author: 'Jane Austen (1817)',
            quote: 'The ancient stone streets and cloisters of ' + location + ' inspire the most elevated sentiments...',
            reality: location + '\'s parish council interpreted "elevated sentiments" as permission to charge £14 for parking near the cloisters while undergraduates crash wooden punts into weeping willows.'
          }
        ],
        agricultural: [
          {
            author: 'Daniel Defoe (1724)',
            quote: 'A most fertile and bountiful parish, famed for rich cider and sturdy yeomen...',
            reality: '302 years later, ' + location + ' has corrupted Defoe\'s vision into a 1:2 slope Double Gloucester cheese race where participants regularly break both ankles to win a 9lb dairy wheel.'
          },
          {
            author: 'Thomas Hardy (1886)',
            quote: 'The quiet solitude of the parish green offers peace to the weary soul...',
            reality: location + ' completely abandoned Hardy\'s rustic tranquility in favor of 3-hour parish council brawls over ornamental flower tub budgets and 18th-century cider barrel theft.'
          }
        ],
        industrial_commuter: [
          {
            author: 'George Orwell (1937)',
            quote: 'It is a place where civic ambition meets the grey mizzle of northern endurance...',
            reality: location + ' ignored Orwell\'s social critique and instead built a 7-tier orbital roundabout system superior in confusion to the Labyrinth of Minos.'
          },
          {
            author: 'Oscar Wilde (1895)',
            quote: 'To lose one bypass may be regarded as a misfortune; to lose both looks like carelessness...',
            reality: location + ' took Wilde\'s wit literally, losing its original High Street to a 1974 concrete subway complex featuring 3 vape shops and scenic indoor moss.'
          }
        ]
      };

      let lumItem = localLore.acidic_luminary;
      if (!lumItem) {
        const lumPool = LUMINARY_QUOTES[archetype] || LUMINARY_QUOTES.industrial_commuter;
        lumItem = lumPool[(hashTown(location, 619) + window._clickCount) % lumPool.length];
      }
      document.getElementById('luminary-author').textContent  = '✍️ ' + lumItem.author;
      document.getElementById('luminary-quote').textContent   = '"' + lumItem.quote + '"';
      document.getElementById('luminary-reality').textContent = lumItem.reality;

      // Render Debug Research Findings Panel
      const debugContainer = document.getElementById('debug-research-json');
      if (debugContainer) {
        const debugData = currentFindings || {
          location: location,
          regional_profile: regProf.region,
          local_newspaper: localLore.paper,
          community_facebook_group: localLore.spotted,
          gazette_headline: localLore.gazette_headline,
          spotted_chatter: localLore.spotted_chatter,
          local_scandal: localLore.local_scandal,
          synthesized_doc: fallbackObj
        };
        debugContainer.textContent = JSON.stringify(debugData, null, 2);
        const debugCard = document.getElementById('debug-research-card');
        if (debugCard) {
          const isDebug = window.location.search.includes('debug=1') || window.location.hash.includes('debug');
          debugCard.style.display = isDebug ? 'flex' : 'none';
        }
      }

      mode3Container.style.display = 'flex';
    } else {
      mode3Container.style.display = 'none';
    }

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
</script>

</body>
</html>
`;

fs.writeFileSync(htmlPath, richHtml, 'utf8');
fs.writeFileSync(rootHtmlPath, richHtml, 'utf8');

// Update code/worker.js with richHtml embedded and 12+ Satirical Pattern Repository
let workerJs = fs.readFileSync(workerPath, 'utf8');

const NEW_RESEARCH_SYSTEM = `const RESEARCH_SYSTEM = \`You are a Municipal Researcher & Local Satirist.
Given a location, town, or institution, return ONLY a JSON object with targeted hyper-local relevance (token-efficient, high-precision). Dig into local gazettes, Nextdoor, and Spotted:[Town] Facebook group chatter for hyper-authentic local scandals:
{
  "location": "<canonical name>",
  "region": "<region / county>",
  "local_newspaper": "<local gazette or news outlet e.g. Basingstoke Gazette, Sussex Express, Leeds Live>",
  "spotted_facebook_group": "<local community FB group e.g. Spotted: Basingstoke, Spotted: Peacehaven>",
  "gazette_headline": "<bizarre real or hyper-authentic local headline e.g. MAN FINED £80 AFTER LEAVING PORK PIE ON POLICE CAR WINDSHIELD>",
  "spotted_chatter": "<absurd local post e.g. Whoever is letting their ferret loose in Morrisons Top of Town please collect it>",
  "comedy_seed": "<hyper-specific local joke, landmark, or local quirk>",
  "dark_history": "<ancient or modern local misdemeanour / planning disaster>",
  "nightlife_catering": "<shite local pubs, 2am kebab ranks, lukewarm curry houses, local taxi rank monopolies>",
  "infrastructure_flaws": "<bus station waiting room, local taxi monopolies, 1970s concrete precincts>",
  "weird_local_lore": "<scampi hurling championships into sea gales, municipal blood-letting trials, rectal cheese processing, subterranean sausage fermentation in disused railway tunnels, cheese rolling down 1:2 cliffs, Egremont World Gurning Championships in horse collars, Scottish Caber Tossing, Welsh bog snorkelling, Cornish harbour wall cider drowning & ship wrecking, Cotswold straw-padded shin-kicking, Yorkshire ferret-legging, Border Morris stick brawls, pagan maypole rituals, or Mari Lwyd horse skull guising>",
  "claim_to_fame": "<over-inflated local achievement or banal convention>"
}\`;`;

if (workerJs.includes('const RESEARCH_SYSTEM =')) {
  workerJs = workerJs.replace(/const RESEARCH_SYSTEM = [\s\S]*?`;/, NEW_RESEARCH_SYSTEM);
}

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

workerJs = workerJs.replace(/turnip/gi, 'cider');
fs.writeFileSync(workerPath, workerJs, 'utf8');
console.log('Successfully updated code/index.html, index.html, and code/worker.js for Dynamic Panel Speaker Shuffling & Interjection Engine (1401)');
