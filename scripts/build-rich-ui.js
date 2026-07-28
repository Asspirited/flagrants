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
  <link rel="manifest" href="manifest.json?v=1201">
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

    .commentary-block {
      background: #1a0e05;
      border-left: 3px solid #FFD700;
      padding: 1.2rem;
      border-radius: 0 6px 6px 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
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
      color: #e8d5a3;
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
        <h3 class="section-subheading">Segment Pictures & Stories</h3>
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
            <div style="font-family: 'EB Garamond', serif; font-size: 1.15rem; color: #e8d5a3; font-style: italic; margin-top: 0.3rem;" id="spotted-post-text"></div>
          </div>
        </div>
      </div>

      <!-- Section 7: Debug Research Findings Panel -->
      <div class="paper-section-card" id="debug-research-card">
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
    if (selectedMode === 'tourist_board' || selectedMode === 'mode3') {
      generateBtn.disabled = !locationInput.value.trim();
    } else {
      generateBtn.disabled = !(locationInput.value.trim() && selectedLens);
    }
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

  // HYPER-LOCAL SPOTTED:[TOWN] & GAZETTE KNOWLEDGE GRAPH
  const HYPER_LOCAL_DATABASE = {
    basingstoke: {
      paper: 'Basingstoke Gazette',
      spotted: 'Spotted: Basingstoke',
      gazette_headline: 'MAN FINED £80 AFTER LEAVING HALF-EATEN PORK PIE ON POLICE CAR WINDSHIELD IN FESTIVAL PLACE',
      spotted_chatter: 'Can whoever is letting their ferret loose in Morrisons Top of Town please come and collect it. It has cornered a trolley boy by the bakery.',
      local_scandal: 'The great Top of Town bin fire of 2022 and ongoing disputes over the parish council ornamental flower tub budget.'
    },
    peacehaven: {
      paper: 'Sussex Express & Peacehaven News',
      spotted: 'Spotted: Peacehaven & Telscombe Cliffs',
      gazette_headline: 'MYSTERY PIANO ABANDONED ON UNDERCLIFF WALK PROMPTS EMERGENCY COASTGUARD AUDIT',
      spotted_chatter: 'To the woman who took my lawnmower from outside the Meridian Centre: I have you on Ring doorbell video. Return it or the police will be informed.',
      local_scandal: 'Sea-fog obscuring the main roundabout for 72 hours while residents argue over beach hut copper piping theft.'
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
    }
  };

  function getHyperLocalLore(town) {
    const clean = town.toLowerCase().trim();
    if (HYPER_LOCAL_DATABASE[clean]) {
      return HYPER_LOCAL_DATABASE[clean];
    }
    return {
      paper: \`\${town} Gazette & District News\`,
      spotted: \`Spotted: \${town}\`,
      gazette_headline: \`MUNICIPAL COUNCIL INVESTIGATES MYSTERY NOISE NEAR THE \${town.toUpperCase()} BYPASS\`,
      spotted_chatter: \`Can the person who left their shopping trolley in the middle of the \${town} precinct please move it before the 2am kebab rush.\`,
      local_scandal: \`Disputes over parish council flower tubs and 2am taxi rank queue jumping in \${town}.\`
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
        twinned: ['Pripyat', 'Atlantis (Sunken)', \`\${town} Sewage Outfall Pipe 3\`],
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
          \`Experience the invigorating 60mph coastal gales off the \${town} sea wall! Famous for traditional scampi hurling into oncoming gales and emergency RNLI rescues of runaway inflatable flamingos!\`,
          \`Stand atop the crumbling \${town} chalk cliffs right on the Greenwich Meridian Line! Enjoy scenic views of sea-fog, coastal erosion swallowing 1920s bungalows at 3 inches per year, and salt-crusted promenade benches!\`,
          \`Visit the magnificent \${town} clifftop caravan concourse, featuring 400 sun-bleached static homes, authentic salt-corroded deckchairs, and a high-street chip shop that closes at dusk!\`,
          \`Stroll along the historic \${town} Undercliff Walk, where emergency coastguards audit abandoned pianos and driftwood wreckage deposited by Channel tides!\`
        ],
        taHeadlines: [
          \`Freezing Coastal Gales and Lukewarm Scampi Baskets in \${town}\`,
          \`Salt-Corroded Deckchairs, Damp B&B Carpets, and Hostile Landlords in \${town}\`,
          \`Cliffside Erosion, Missing Beach Huts, and Zero Taxis in \${town}\`,
          \`The 2am Kebab Rank Sea-Gale Queue Experience in \${town}\`
        ],
        taReviews: [
          \`Arrived in \${town} expecting seaside charm. Ended up soaked by a sea-gale while eating lukewarm scampi out of a damp cardboard basket by the bus shelter.\`,
          \`The local heritage B&B in \${town} offers authentic sea-fog damp carpets, paper-thin walls, and breakfast served strictly between 7:00 and 7:12am by a deeply hostile landlord who resents your presence.\`,
          \`Standing on the \${town} clifftop, the wind-gale blew my umbrella into the English Channel while the local pub ran out of cider by 8:15pm. Attracious shite.\`,
          \`The hotel room in \${town} featured authentic salt-gale window corrosion, squeaky bed springs, and a view of the local recycling center.\`
        ],
        schools: [
          \`94% Pass Rate in Coastal Navigation & Salt-Crusted Deckchair Maintenance in \${town}.\`,
          \`Ofsted Grade 3: Coastal Mizzle Navigation and Sea Wall Scampi Hurling in \${town}.\`
        ],
        workforce: [
          \`Coastal Sea-Gale Rescue & RNLI Inflatable Flamingo Duty (74%) in \${town}.\`,
          \`Caravan Concourse Security & Promenade Fish Chippy Management (82%) in \${town}.\`
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
    
    if (/leeds|manchester|sheffield|newcastle|wigan|bradford|liverpool|preston|carlisle|sunderland|barrow|bolton|rochdale|york|hull/.test(t)) {
      return {
        region: 'Industrial / Northern',
        affectation: \`Heart of the \${town} Industrial Ring Road & Railway Arches\`,
        mottos: [
          { motto: 'FERRUM FERMENTAT IN ARCHIBUS', translation: 'Iron and Sausage Ferment in the Arches' },
          { motto: 'SABULUM ET FLAMMA VINCUNT', translation: 'Coal and Flame Conquer All' }
        ],
        twinned: ['Pripyat', 'Detroit', \`\${town} Platform 4\`],
        objects: ['cast-iron anvil', 'subterranean sausage vat', 'disused loom shuttle', 'heavy steel girder', 'coal scuttle', 'foundry crucible'],
        crimes: ['unauthorized sausage fermentation', 'mill-lead rustling', 'subterranean arch sabotage', 'illegal ferret-legging'],
        profanities: ['scathing northern shite', 'utterly knackered bollocks', 'industrial-grade clusterfuck', 'proper tight-fisted pillocks'],
        slogans: [
          \`Experience the Industrial Ambition of \${town}!\`,
          \`\${town}: Where Foundry Steel Meets Subterranean Arch Damp!\`,
          \`Discover \${town} — World-Class Consecrated Mill Precincts!\`,
          \`Welcome to \${town}: Home of Subterranean Sausage Fermentation!\`
        ],
        brochures: [
          \`Descend into the disused Victorian railway arches of \${town}, where subterranean sausage fermentation has taken place under magistrate license since 1884!\`,
          \`Marvel at the magnificent \${town} cast-iron foundry works and brutalist mill concourse, hailed by 19th-century industrial directors as a triumph superior to Roman aqueducts!\`,
          \`Walk through the historic \${town} Kirkgate market concourse, featuring 14 shuttered stalls, authentic 1970s concrete benches, and 2am kebab ranks!\`,
          \`Explore our world-class \${town} industrial canal basin! A 14-acre expanse of overgrown railway sidings, disused barges, and protected habitats for urban pigeons!\`
        ],
        taHeadlines: [
          \`Subterranean Sausage Smells and Shuttered Department Stores in \${town}\`,
          \`Shite Pubs, Lukewarm Kebabs, and Zero Taxis in \${town}\`,
          \`Industrial Rain, Damp Tenement Carpets, and Hostile Landlords in \${town}\`,
          \`The 2am Kebab Rank Monopoly Trap in \${town}\`
        ],
        taReviews: [
          \`The smell of subterranean sausage fermentation from the railway arches in \${town} permeates every hotel room within a 2-mile radius. Attracious shite.\`,
          \`Visitors arriving in \${town} are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh.\`,
          \`They promised a historic cathedral city in \${town}. What you actually get is a 1970s concrete precinct, an abandoned Woolworths, and a 3-hour traffic jam.\`,
          \`The local pub in \${town} ran out of draft ale by 8:30pm and the landlord threatened to call the magistrate when we asked for a menu.\`
        ],
        schools: [
          \`98% Distinction in Subterranean Arch Engineering & Mill Lead Reclamation in \${town}.\`,
          \`Ofsted Grade 3: Roundabout Navigation and Slate Mining in \${town}.\`
        ],
        workforce: [
          \`Subterranean Sausage Fermentation & Foundry Steel Production (68%) in \${town}.\`,
          \`Concrete Precinct Security & Wimpy Counter Management (82%) in \${town}.\`
        ],
        housing: [
          \`Converted 19th-century mill flat in \${town}: £380,000 with subterranean sausage aroma.\`,
          \`Victorian terrace in \${town}: £470,000 with authentic shortbread factory chimney damp.\`
        ],
        excuses: [
          \`Blame Victorian railway directors, disused arch humidity, and 19th-century foundry smoke.\`,
          \`Blame industrial coal smoke, damp northern climate, and 1968 brutalist planners.\`
        ]
      };
    }

    if (/edinburgh|glasgow|cardiff|aberdeen|llanfair|dundee|swansea|inverness|highlands|stirling|belfast|wales|scotland|rhyl|wrexham/.test(t)) {
      return {
        region: 'Celtic / Scottish / Welsh',
        affectation: \`Gateway to the \${town} Slate Wynds & Peat Bogs\`,
        mottos: [
          { motto: 'SAXUM DENSUM IN PLUVIA', translation: 'Heavy Slate in the Constant Rain' },
          { motto: 'HAGGIS IN MONTIBUS CURRIT', translation: 'The Haggis Runs Through the Misty Hills' }
        ],
        twinned: ['Pripyat', 'Reykjavík (Cold)', \`\${town} Peat Bog #7\`],
        objects: ['leaden haggis boiling pot', 'slate roof tile', 'bagpipe drone', 'peat spade', 'granite paving block', 'tartan loom shuttle'],
        crimes: ['unauthorized haggis hunting', 'bog-snorkelling without a permit', 'midnight tartan smuggling', 'druidic chanting beyond midnight'],
        profanities: ['absolute Celtic shite', 'utter Highland bollocks', 'dour and miserable tripe', 'proper tartan-clad clusterfuck'],
        slogans: [
          \`Experience the Ancient Celtic Ambition of \${town}!\`,
          \`\${town}: Where Slate Roofs Meet Highland Rain!\`,
          \`Discover \${town} — Home of Haggis Hunting and Bog Snorkelling!\`,
          \`Welcome to \${town}: Gateway to Peat Bogs and Fringe Ticketing!\`
        ],
        brochures: [
          \`Steeped in glorious Celtic heritage! \${town} is the celebrated birthplace of ancient bog snorkelling and home to a historic tartan loom rebellion that altered local history forever!\`,
          \`Discover the ancient pagan traditions of \${town}! From Highland haggis hunting to Welsh slate carving, our municipal council preserves rituals that ring true to those who know!\`,
          \`Walk through the ancient stone tenement Wynds of \${town}, featuring 14 closed shortbread tin shops, authentic 18th-century granite cobbles, and rain!\`,
          \`Explore our world-class \${town} peat bog reserve! A 14-acre expanse of misty hills, stagnant drainage ditches, and protected habitats for Highland midges!\`
        ],
        taHeadlines: [
          \`Damp Tenements, Bagpipe Noise, and Missing Cathedral Ruins in \${town}\`,
          \`Freezing Mizzle and Cold Toast Served Strictly at 7:00am in \${town}\`,
          \`The 2am Kebab Rank Taxi Cartel Monopoly Trap in \${town}\`,
          \`Haggis Hunting Scandals and Shuttered Shortbread Outlets in \${town}\`
        ],
        taReviews: [
          \`The local heritage tenement B&B in \${town} offers authentic 18th-century stone damp, paper-thin walls, and breakfast served strictly between 7:00 and 7:12am by a dour landlord.\`,
          \`They promised a historic castle view in \${town}. What you actually get is North Sea mizzle, an abandoned Woolworths, and a 3-hour traffic jam.\`,
          \`If you visit \${town}, bring your own fuel, your own food, and a sleeping bag, because the taxi rank and local amenities close at dusk.\`,
          \`The hotel room in \${town} featured authentic 18th-century wall damp, squeaky bed springs, and a view of the local peat bog.\`
        ],
        schools: [
          \`100% Pass Rate in Peat Bog Administration & Fringe Ticketing in \${town}.\`,
          \`Academic focus centered on Bagpipe Theory and Slate Mining in \${town}.\`
        ],
        workforce: [
          \`Ghost Tour Management (58%) and Shortbread Factory Packing (35%) in \${town}.\`,
          \`Peat Bog Administration & Slate Roof Repair (80%) in \${town}.\`
        ],
        housing: [
          \`1-bed tenement flat in \${town}: £650,000 with authentic 18th-century stone damp.\`,
          \`Stone cottage in \${town}: £380,000 with authentic Welsh slate damp.\`
        ],
        excuses: [
          \`Blame North Sea mizzle, 18th-century stone masons, and highland midge swarms.\`,
          \`Blame English weather, 19th-century railway directors, and druidic prophecies.\`
        ]
      };
    }

    if (/cotswolds|somerset|norfolk|devon|cornwall|gloucester|lincoln|suffolk|dorset|wiltshire|hereford|shropshire|bath|taunton/.test(t)) {
      return {
        region: 'Agricultural / Rural',
        affectation: \`Jewel of the \${town} Manure & Cider Belt\`,
        mottos: [
          { motto: 'STERCUS ET CIDERUM VINCUNT', translation: 'Manure and Cider Conquer All' },
          { motto: 'TRACTOR IN AGRIS MANET', translation: 'The Vintage Tractor Remains in the Mud' }
        ],
        twinned: ['Pripyat', 'Chernobyl', \`\${town} Slurry Pit\`],
        objects: ['vintage tractor flywheel', 'cider barrel', 'rusted manure spreader', 'prize marrow', 'straw bale', 'heavy sheep shears'],
        crimes: ['cider barrel rustling', 'unauthorized shin-kicking', 'manure spreader sabotage', 'illegal Maypole stick brawling'],
        profanities: ['rural agricultural shite', 'proper cider-soaked bollocks', 'utter country bumpkin tripe', 'scathing village clusterfuck'],
        slogans: [
          \`Experience the Rural Heritage of \${town}!\`,
          \`\${town}: Where Cider Barrels Meet Manure Spreader Innovation!\`,
          \`Discover \${town} — World-Class Straw Bale Architecture!\`,
          \`Welcome to \${town}: Home of Shin-Kicking and Cider Fermentation!\`
        ],
        brochures: [
          \`Steeped in glorious West Country heritage! \${town} is the celebrated birthplace of traditional cider barrel fermentation and home to an annual shin-kicking tournament that altered local history forever!\`,
          \`Discover the ancient agricultural traditions of \${town}! From Cotswold straw-padded shin-kicking to village Maypole stick brawls, our parish council preserves rituals that ring true!\`,
          \`Walk through the thatched cottage village of \${town}, featuring 4 closed country pubs, authentic 17th-century cobble lanes, and manure spreaders!\`,
          \`Explore our world-class \${town} village green! A 14-acre expanse of cider orchards, stagnant duck ponds, and protected habitats for sheep!\`
        ],
        taHeadlines: [
          \`Cider Shortages and Hostile Pub Landlords in \${town}\`,
          \`Manure Spreader Noise and Squeaky Bed Springs in \${town}\`,
          \`Cotswold Damp and Zero Taxis After 8:00pm in \${town}\`,
          \`The 2am Village Bus Shelter Monopoly Trap in \${town}\`
        ],
        taReviews: [
          \`The local pub in \${town} ran out of draft cider by 8:15pm and the landlord threatened to call the parish magistrate when we asked for a food menu.\`,
          \`Arrived in \${town} expecting rural peace. Ended up awake all night listening to a disused manure spreader idling by the duck pond.\`,
          \`The thatched B&B in \${town} served cold toast strictly between 7:00 and 7:12am. Landlord glared at us until we left. Absolute bollocks.\`,
          \`If you visit \${town}, bring your own wellies, your own food, and a torch, because the streetlights and local pub close at dusk.\`
        ],
        schools: [
          \`100% Distinction in Shin-Kicking, Ferret-Legging, and Cider Brewing in \${town}.\`,
          \`Ofsted Grade 3: Manure Spreader Operations and Crop Rotation in \${town}.\`
        ],
        workforce: [
          \`Cider Barrel Fermentation & Manure Spreader Maintenance (72%) in \${town}.\`,
          \`Sheep Shearing & Parish Council Tub Administration (65%) in \${town}.\`
        ],
        housing: [
          \`Thatched cottage in \${town}: £490,000 with authentic Cotswold straw damp.\`,
          \`Stone cottage in \${town}: £380,000 with authentic village duck pond damp.\`
        ],
        excuses: [
          \`Blame ancient Saxon warlords, Cotswold stone quarrymen, and manure spreader friction.\`,
          \`Blame cider bakery emissions, 19th-century magistrate orders, and Maypole stick brawlers.\`
        ]
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
      twinned: ['Pripyat', 'Slough', \`\${town} Multi-Storey Level 3\`],
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
      taHeadlines: [
        \`Shite Pubs, Lukewarm Kebabs, and Zero Taxis in \${town}\`,
        \`Clutch-Destroying Roundabouts, Damp B&B Carpets, and Hostile Landlords in \${town}\`,
        \`Dead-End One-Way Systems and Missing Cathedral Ruins in \${town}\`,
        \`The 2am Kebab Rank Taxi Cartel Monopoly Trap in \${town}\`
      ],
      taReviews: [
        \`Visitors arriving in \${town} are immediately struck by the complete absence of available taxis after 11pm. The local curry house offers lukewarm rogan josh, while the main street features a 2am kebab rank queue.\`,
        \`A masterclass in motion without destination. The \${town} ring road and one-way system forces motorists into continuous circular orbit until fuel or morale is completely exhausted.\`,
        \`The council spent £3.4 million on an abstract sculpture in \${town} while the potholes on the bypass destroyed both front axles of my Vauxhall Corsa.\`,
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

    const idxSlogan   = hashTown(town, 13) % reg.slogans.length;
    const idxBrochure = hashTown(town, 37) % reg.brochures.length;
    const idxTaHead   = hashTown(town, 73) % reg.taHeadlines.length;
    const idxTaRev    = hashTown(town, 109) % reg.taReviews.length;
    const idxMotto    = hashTown(town, 137) % reg.mottos.length;

    const slogan = reg.slogans[idxSlogan].replace(/{town}/g, town);
    const brochure = reg.brochures[idxBrochure].replace(/{town}/g, town);
    const taHead = reg.taHeadlines[idxTaHead].replace(/{town}/g, town);
    const taRev = reg.taReviews[idxTaRev].replace(/{town}/g, town);

    const cars = ['Ford Focus', 'Vauxhall Corsa', 'Nissan Micra', 'Fiat Panda', 'Peugeot 206', 'Volvo 240', 'Toyota Yaris', 'Honda Civic', 'Renault Clio', 'Skoda Fabia', 'Ford Fiesta', 'Austin Metro'];
    
    const hCar = hashTown(town, 17);
    const hObj = hashTown(town, 29);
    const hMil = hashTown(town, 41);

    const car = cars[hCar % cars.length];
    const obj = reg.objects[hObj % reg.objects.length];
    const millions = (hMil % 5) + 1;
    const profanity = reg.profanities[hMil % reg.profanities.length];

    // 12-REVIEW TOPIC POOL MATRIX WITH SCATHING UK PROFANITY & REGIONAL ANCHORS
    const reviewPool = [
      { reviewer: 'LandlordVictim', rating: 1, text: \`The B&B in \${town} served cold toast strictly between 7:00 and 7:12am. Landlord glared at us until we left. Absolute \${profanity}.\` },
      { reviewer: 'PotholeSurvivor', rating: 1, text: \`The council spent £\${millions} million on a \${obj} sculpture while the potholes on the \${town} bypass swallowed my \${car}. Total bollocks.\` },
      { reviewer: 'WindblownVisitor', rating: 1, text: \`Got soaked by weather in \${town} while trying to eat food out of a damp cardboard tray. Attracious \${profanity}.\` },
      { reviewer: 'PrecinctShopper', rating: 2, text: \`Visited the \${town} concourse. Found 3 vape shops, a tanning salon, and scenic indoor moss. What a clusterfuck.\` },
      { reviewer: 'KebabRankSurvivor', rating: 1, text: \`Waited 3 hours at the \${town} taxi rank at 2am. System gave up and we ate cold kebabs on a bench. Absolute shite.\` },
      { reviewer: 'TrappedMotorist', rating: 1, text: \`Spent 4 hours stuck on the \${town} multi-storey car park ramp. Sat nav suggested walking back through the precinct.\` },
      { reviewer: 'LocalResident', rating: 2, text: \`Visited the \${town} high street. Found 14 shuttered stores and 3 betting shops. Utter tripe.\` },
      { reviewer: 'FolkObserver', rating: 3, text: \`Came for the \${town} annual local tournament. Brutal but authentic.\` },
      { reviewer: 'NostalgicVisitor', rating: 2, text: \`They promised a historic cathedral in \${town}. It was an abandoned Woolworths next to a Wimpy.\` },
      { reviewer: 'LostNavigator', rating: 1, text: \`Entered the \${town} dual carriageway roundabout. Completed 47 laps before finding an exit. Total bollocks.\` },
      { reviewer: 'LocalHistorian', rating: 2, text: \`Fascinating local history in \${town}, though the local pub ran out of ale by 8:30pm. Proper pillocks.\` },
      { reviewer: 'TourBusDriver', rating: 1, text: \`Parked the coach in \${town}. Wheels were missing within 20 minutes. 1 star. Attracious shite.\` }
    ];

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

      // Render Segment Pictures & Stories for Mode I & II
      const commentary = document.getElementById('commentary');
      commentary.innerHTML = '';
      const charges = result.charges ?? [];
      
      (result.commentary ?? []).forEach((block, idx) => {
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

        div.innerHTML = \`
          <div class="commentary-header">
            <div class="story-icon-badge">\${badgeContent}</div>
            <div class="commentary-element">\${escapeHtml(block.element)}</div>
          </div>
          <div class="commentary-text">\${escapeHtml(block.text)}</div>\`;
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

      // Render Hyper-Local Gazette & Spotted:[Town] Intelligence
      document.getElementById('gazette-paper-name').textContent = \`📰 \${localLore.paper}\`;
      document.getElementById('gazette-headline').textContent   = \`"\${localLore.gazette_headline}"\`;
      document.getElementById('spotted-group-name').textContent  = \`📱 \${localLore.spotted}\`;
      document.getElementById('spotted-post-text').textContent   = \`"\${localLore.spotted_chatter}"\`;

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
console.log('Successfully updated code/index.html, index.html, and code/worker.js for Complete 5-Region Matrix Sweep (1201)');
