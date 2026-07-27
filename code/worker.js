const INDEX_HTML = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Flagrants — Heraldic dignity for those who never deserved it</title>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n    body {\n      background: #1a1008;\n      color: #e8d5a3;\n      font-family: 'Palatino Linotype', Palatino, Georgia, serif;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n\n    header {\n      width: 100%;\n      padding: 2rem 1rem 1rem;\n      text-align: center;\n      border-bottom: 1px solid #3d2b0a;\n    }\n\n    header h1 {\n      font-size: 2.8rem;\n      color: #FFD700;\n      letter-spacing: 0.12em;\n      text-transform: uppercase;\n    }\n\n    header p.tagline {\n      font-size: 0.95rem;\n      color: #a08040;\n      font-style: italic;\n      margin-top: 0.4rem;\n      letter-spacing: 0.04em;\n    }\n\n    main {\n      width: 100%;\n      max-width: 860px;\n      padding: 2rem 1rem;\n      display: flex;\n      flex-direction: column;\n      gap: 2rem;\n    }\n\n    .input-panel {\n      background: #241508;\n      border: 1px solid #3d2b0a;\n      border-radius: 4px;\n      padding: 1.5rem;\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .input-panel h2 {\n      font-size: 1rem;\n      color: #c8a060;\n      text-transform: uppercase;\n      letter-spacing: 0.1em;\n    }\n\n    .field-row {\n      display: flex;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .field-group {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n      flex: 1;\n      min-width: 180px;\n    }\n\n    label {\n      font-size: 0.8rem;\n      color: #a08040;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n    }\n\n    input[type=\"text\"], select {\n      background: #1a1008;\n      border: 1px solid #5a3d10;\n      color: #e8d5a3;\n      padding: 0.6rem 0.8rem;\n      font-family: inherit;\n      font-size: 0.95rem;\n      border-radius: 3px;\n      width: 100%;\n    }\n\n    input[type=\"text\"]:focus, select:focus {\n      outline: none;\n      border-color: #FFD700;\n    }\n\n    .lens-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n      gap: 0.5rem;\n    }\n\n    .lens-btn {\n      background: #1a1008;\n      border: 1px solid #5a3d10;\n      color: #a08040;\n      padding: 0.5rem 0.7rem;\n      font-family: inherit;\n      font-size: 0.8rem;\n      border-radius: 3px;\n      cursor: pointer;\n      text-align: left;\n      transition: border-color 0.15s, color 0.15s;\n    }\n\n    .lens-btn:hover { border-color: #c8a060; color: #e8d5a3; }\n    .lens-btn.selected { border-color: #FFD700; color: #FFD700; background: #2a1a00; }\n\n    .generate-btn {\n      background: #5a3000;\n      border: 1px solid #FFD700;\n      color: #FFD700;\n      padding: 0.75rem 2rem;\n      font-family: inherit;\n      font-size: 1rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      border-radius: 3px;\n      cursor: pointer;\n      align-self: flex-start;\n      transition: background 0.15s;\n    }\n\n    .generate-btn:hover { background: #7a4400; }\n    .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; }\n\n    .output-panel {\n      display: none;\n      flex-direction: column;\n      gap: 2rem;\n    }\n\n    .output-panel.visible { display: flex; }\n\n    .crest-layout {\n      display: grid;\n      grid-template-columns: 260px 1fr;\n      gap: 2rem;\n      align-items: start;\n    }\n\n    @media (max-width: 600px) {\n      .crest-layout { grid-template-columns: 1fr; }\n    }\n\n    .crest-figure {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.8rem;\n    }\n\n    .crest-figure svg {\n      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.7));\n    }\n\n    .subject-title {\n      font-size: 1rem;\n      color: #c8a060;\n      text-align: center;\n      font-style: italic;\n      letter-spacing: 0.05em;\n    }\n\n    .lens-label {\n      font-size: 0.75rem;\n      color: #6a5020;\n      text-transform: uppercase;\n      letter-spacing: 0.1em;\n      text-align: center;\n    }\n\n    .commentary {\n      display: flex;\n      flex-direction: column;\n      gap: 1.2rem;\n    }\n\n    .commentary-block {\n      border-left: 2px solid #3d2b0a;\n      padding-left: 1rem;\n    }\n\n    .commentary-element {\n      font-size: 0.7rem;\n      color: #6a5020;\n      text-transform: uppercase;\n      letter-spacing: 0.1em;\n      margin-bottom: 0.35rem;\n    }\n\n    .commentary-text {\n      font-size: 0.92rem;\n      line-height: 1.65;\n      color: #d4bc82;\n      font-style: italic;\n    }\n\n    .excuse-block {\n      background: #2a1a00;\n      border: 1px solid #3d2b0a;\n      border-radius: 3px;\n      padding: 1rem;\n      font-style: italic;\n      color: #a08040;\n      font-size: 0.88rem;\n      line-height: 1.6;\n    }\n\n    .excuse-block::before {\n      content: 'Official Position: ';\n      color: #6a5020;\n      font-style: normal;\n      text-transform: uppercase;\n      font-size: 0.7rem;\n      letter-spacing: 0.1em;\n      display: block;\n      margin-bottom: 0.4rem;\n    }\n\n    .loading {\n      text-align: center;\n      padding: 2rem;\n      color: #a08040;\n      font-style: italic;\n      font-size: 0.95rem;\n    }\n\n    .error {\n      background: #3a0808;\n      border: 1px solid #8a0000;\n      color: #ff8080;\n      padding: 1rem;\n      border-radius: 3px;\n      font-size: 0.88rem;\n    }\n    .header-logo {\n      display: flex;\n      justify-content: center;\n      margin-bottom: 0.5rem;\n    }\n    .header-logo-svg {\n      width: 100%;\n      max-width: 260px;\n      height: auto;\n      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));\n    }\n  </style>\n</head>\n<body>\n\n<header>\n  <div class=\"header-logo\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" class=\"header-logo-svg\">\n      <defs>\n        <filter id=\"glow\">\n          <feGaussianBlur stdDeviation=\"2.5\" result=\"blur\"/>\n          <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n        </filter>\n      </defs>\n      <!-- Ground -->\n      <rect x=\"0\" y=\"160\" width=\"320\" height=\"40\" fill=\"#2a1a00\"/>\n      <line x1=\"0\" y1=\"160\" x2=\"320\" y2=\"160\" stroke=\"#5a3d10\" stroke-width=\"1.5\"/>\n      <!-- CHICKEN -->\n      <ellipse cx=\"250\" cy=\"138\" rx=\"32\" ry=\"24\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n      <ellipse cx=\"224\" cy=\"118\" rx=\"12\" ry=\"16\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n      <circle cx=\"214\" cy=\"104\" r=\"14\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1.5\"/>\n      <path d=\"M 208,93 Q 210,85 213,90 Q 215,82 218,88 Q 221,80 222,88\" fill=\"#CE1126\" stroke=\"none\"/>\n      <path d=\"M 202,104 L 196,101 L 196,107 Z\" fill=\"#e8a030\"/>\n      <path d=\"M 202,104 L 196,107 L 200,110 Z\" fill=\"#c07020\"/>\n      <circle cx=\"210\" cy=\"101\" r=\"3\" fill=\"#1a1008\"/>\n      <circle cx=\"209\" cy=\"100\" r=\"1\" fill=\"#fff\"/>\n      <ellipse cx=\"205\" cy=\"110\" rx=\"4\" ry=\"5\" fill=\"#CE1126\"/>\n      <path d=\"M 235,128 Q 248,110 265,120 Q 255,130 240,145 Z\" fill=\"#b89020\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n      <path d=\"M 280,130 Q 300,110 305,125 Q 295,132 282,138\" fill=\"#c8a030\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n      <path d=\"M 278,136 Q 302,122 307,138 Q 295,140 280,142\" fill=\"#d4b040\" stroke=\"#7a5c10\" stroke-width=\"1\"/>\n      <line x1=\"242\" y1=\"160\" x2=\"238\" y2=\"175\" stroke=\"#b09030\" stroke-width=\"3\"/>\n      <line x1=\"258\" y1=\"160\" x2=\"262\" y2=\"175\" stroke=\"#b09030\" stroke-width=\"3\"/>\n      <path d=\"M 238,175 L 228,178 M 238,175 L 235,182 M 238,175 L 242,180\" stroke=\"#b09030\" stroke-width=\"2\"/>\n      <path d=\"M 262,175 L 252,178 M 262,175 L 259,182 M 262,175 L 266,180\" stroke=\"#b09030\" stroke-width=\"2\"/>\n      <!-- FIRE -->\n      <g filter=\"url(#glow)\">\n        <path d=\"M 196,104 Q 175,90 155,105 Q 165,95 150,115 Q 160,100 145,120 Q 158,108 148,128 Q 162,112 155,130 Q 165,115 162,135 Q 175,118 170,138 Q 182,120 178,140 Q 188,125 185,145 Q 190,110 196,104 Z\" fill=\"#FF6600\" opacity=\"0.9\"/>\n        <path d=\"M 196,104 Q 178,96 162,108 Q 170,99 158,116 Q 167,103 156,122 Q 168,109 163,128 Q 174,115 170,133 Q 180,118 178,138 Q 187,122 185,144 Q 191,112 196,104 Z\" fill=\"#FF9900\" opacity=\"0.85\"/>\n        <path d=\"M 196,104 Q 182,100 170,110 Q 176,103 166,118 Q 174,106 166,124 Q 176,112 172,130 Q 181,117 179,136 Q 187,120 185,143 Q 191,115 196,104 Z\" fill=\"#FFCC00\" opacity=\"0.8\"/>\n        <path d=\"M 196,104 Q 186,103 178,112 Q 182,106 174,120 Q 182,110 176,128 Q 184,116 182,134 Q 188,120 186,142 Q 192,118 196,104 Z\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n      </g>\n      <!-- ST. GEORGE -->\n      <line x1=\"48\" y1=\"155\" x2=\"30\" y2=\"157\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.5\"/>\n      <line x1=\"52\" y1=\"150\" x2=\"33\" y2=\"149\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.4\"/>\n      <line x1=\"50\" y1=\"145\" x2=\"32\" y2=\"142\" stroke=\"#3d2b0a\" stroke-width=\"1\" opacity=\"0.3\"/>\n      <line x1=\"76\" y1=\"152\" x2=\"55\" y2=\"170\" stroke=\"#5a6a7a\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <line x1=\"55\" y1=\"170\" x2=\"42\" y2=\"162\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <ellipse cx=\"42\" cy=\"163\" rx=\"10\" ry=\"5\" fill=\"#2a1a08\" transform=\"rotate(-20,42,163)\"/>\n      <rect x=\"62\" y=\"112\" width=\"32\" height=\"40\" rx=\"5\" fill=\"#8a9aaa\" stroke=\"#5a6a7a\" stroke-width=\"2\"/>\n      <line x1=\"78\" y1=\"115\" x2=\"78\" y2=\"148\" stroke=\"#6a7a8a\" stroke-width=\"1\"/>\n      <ellipse cx=\"78\" cy=\"118\" rx=\"6\" ry=\"4\" fill=\"none\" stroke=\"#6a7a8a\" stroke-width=\"1\"/>\n      <rect x=\"75\" y=\"120\" width=\"6\" height=\"18\" fill=\"#CE1126\" opacity=\"0.85\"/>\n      <rect x=\"68\" y=\"125\" width=\"20\" height=\"6\" fill=\"#CE1126\" opacity=\"0.85\"/>\n      <line x1=\"78\" y1=\"152\" x2=\"100\" y2=\"168\" stroke=\"#5a6a7a\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <line x1=\"100\" y1=\"168\" x2=\"110\" y2=\"158\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <ellipse cx=\"111\" cy=\"159\" rx=\"10\" ry=\"5\" fill=\"#2a1a08\" transform=\"rotate(15,111,159)\"/>\n      <g transform=\"translate(58,118) rotate(20)\">\n        <path d=\"M 0,0 L 22,0 L 22,28 Q 11,38 0,28 Z\" fill=\"#CE1126\" stroke=\"#8a1a08\" stroke-width=\"2\"/>\n        <rect x=\"8\" y=\"3\" width=\"4\" height=\"20\" fill=\"#FFD700\"/>\n        <rect x=\"2\" y=\"10\" width=\"18\" height=\"4\" fill=\"#FFD700\"/>\n      </g>\n      <line x1=\"90\" y1=\"118\" x2=\"118\" y2=\"128\" stroke=\"#5a6a7a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <ellipse cx=\"119\" cy=\"129\" rx=\"7\" ry=\"5\" fill=\"#6a7a8a\" stroke=\"#4a5a6a\" stroke-width=\"1.5\"/>\n      <line x1=\"119\" y1=\"127\" x2=\"138\" y2=\"143\" stroke=\"#c0c8d0\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n      <line x1=\"115\" y1=\"131\" x2=\"123\" y2=\"123\" stroke=\"#c0c8d0\" stroke-width=\"2\"/>\n      <circle cx=\"115\" cy=\"132\" r=\"3\" fill=\"#8a9aaa\"/>\n      <rect x=\"73\" y=\"100\" width=\"12\" height=\"14\" rx=\"3\" fill=\"#8a9aaa\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n      <ellipse cx=\"79\" cy=\"98\" rx=\"16\" ry=\"14\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"2\"/>\n      <line x1=\"68\" y1=\"96\" x2=\"90\" y2=\"96\" stroke=\"#3a4a5a\" stroke-width=\"2\"/>\n      <line x1=\"70\" y1=\"100\" x2=\"88\" y2=\"100\" stroke=\"#3a4a5a\" stroke-width=\"1.5\"/>\n      <path d=\"M 79,85 Q 72,72 68,78 Q 65,68 70,74 Q 67,62 74,70\" fill=\"#CE1126\" stroke=\"none\"/>\n      <rect x=\"77\" y=\"88\" width=\"4\" height=\"12\" fill=\"#5a6a7a\"/>\n      <ellipse cx=\"65\" cy=\"115\" rx=\"10\" ry=\"6\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n      <ellipse cx=\"93\" cy=\"115\" rx=\"10\" ry=\"6\" fill=\"#7a8a9a\" stroke=\"#5a6a7a\" stroke-width=\"1.5\"/>\n    </svg>\n  </div>\n  <h1>Flagrants</h1>\n  <p class=\"tagline\">Heraldic dignity for those who never deserved it</p>\n</header>\n\n<main>\n\n  <div class=\"input-panel\">\n    <h2>Mode I — Location Flag</h2>\n\n    <div class=\"field-row\">\n      <div class=\"field-group\">\n        <label for=\"location\">Location, postcode, or place</label>\n        <input type=\"text\" id=\"location\" placeholder=\"e.g. Slough, SW1A 1AA, Runnymede…\" autocomplete=\"off\"/>\n      </div>\n    </div>\n\n    <div class=\"field-group\">\n      <label>Defence Lens</label>\n      <div class=\"lens-grid\" id=\"lens-grid\">\n        <!-- Populated by JS -->\n      </div>\n    </div>\n\n    <button class=\"generate-btn\" id=\"generate-btn\" disabled>Generate Crest</button>\n  </div>\n\n  <div class=\"loading\" id=\"loading\" style=\"display:none\">\n    The Herald is researching. This may take a moment. He is thorough.\n  </div>\n\n  <div class=\"error\" id=\"error\" style=\"display:none\"></div>\n\n  <div class=\"output-panel\" id=\"output-panel\">\n    <div class=\"crest-layout\">\n      <div class=\"crest-figure\">\n        <div id=\"crest-svg\"></div>\n        <div class=\"subject-title\" id=\"subject-title\"></div>\n        <div class=\"lens-label\" id=\"lens-label\"></div>\n      </div>\n      <div class=\"commentary\" id=\"commentary\"></div>\n    </div>\n    <div class=\"excuse-block\" id=\"excuse-block\"></div>\n  </div>\n\n</main>\n\n<script>\n  const LENSES = [\n    { id: 'proud_of_it',        label: 'Proud of It',          desc: 'This was fine. The herald sees no issue whatsoever.' },\n    { id: 'full_cover_up',      label: 'Full Cover-Up',        desc: 'It never happened. The herald is confused by the question.' },\n    { id: 'admit_faults',       label: 'Admit Faults',         desc: 'Yes, there were some irregularities. The crest acknowledges this minimally.' },\n    { id: 'blame_others',       label: 'Blame Others',         desc: 'External forces. Enemies. God\\'s specific instruction at the time.' },\n    { id: 'deeply_sorry',       label: 'Deeply Sorry',         desc: 'Full modern apology. All the correct language. Nothing has changed.' },\n    { id: 'context_everything', label: 'Context Is Everything',desc: 'You have to understand the times. The herald provides context. It does not help.' },\n    { id: 'revisionist',        label: 'Revisionist',          desc: 'Actually they were the heroes. New research supports this.' }\n  ];\n\n  let selectedLens = null;\n\n  // Build lens grid\n  const lensGrid = document.getElementById('lens-grid');\n  LENSES.forEach(lens => {\n    const btn = document.createElement('button');\n    btn.className = 'lens-btn';\n    btn.textContent = lens.label;\n    btn.title = lens.desc;\n    btn.dataset.lens = lens.id;\n    btn.addEventListener('click', () => {\n      lensGrid.querySelectorAll('.lens-btn').forEach(b => b.classList.remove('selected'));\n      btn.classList.add('selected');\n      selectedLens = lens.id;\n      checkReady();\n    });\n    lensGrid.appendChild(btn);\n  });\n\n  const locationInput = document.getElementById('location');\n  const generateBtn = document.getElementById('generate-btn');\n\n  locationInput.addEventListener('input', checkReady);\n\n  function checkReady() {\n    generateBtn.disabled = !(locationInput.value.trim() && selectedLens);\n  }\n\n  generateBtn.addEventListener('click', generate);\n\n  async function generate() {\n    const location = locationInput.value.trim();\n    if (!location || !selectedLens) return;\n\n    document.getElementById('loading').style.display = 'block';\n    document.getElementById('output-panel').classList.remove('visible');\n    document.getElementById('error').style.display = 'none';\n    generateBtn.disabled = true;\n\n    try {\n      const WORKER = 'https://flagrants-api.leanspirited.workers.dev';\n      const researchRes = await fetch(`${WORKER}/research`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ mode: 'location', subject: location })\n      });\n      if (!researchRes.ok) throw new Error(`Research failed: ${researchRes.status}`);\n      const findings = await researchRes.json();\n\n      const designRes = await fetch(`${WORKER}/design`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ findings, lens: selectedLens })\n      });\n      if (!designRes.ok) throw new Error(`Design failed: ${designRes.status}`);\n      const result = await designRes.json();\n\n      renderOutput(location, result);\n    } catch (err) {\n      document.getElementById('error').style.display = 'block';\n      document.getElementById('error').textContent = `The Herald encountered a difficulty: ${err.message}`;\n    } finally {\n      document.getElementById('loading').style.display = 'none';\n      generateBtn.disabled = false;\n      checkReady();\n    }\n  }\n\n  function renderOutput(location, result) {\n    // SVG is returned as a string from the worker\n    document.getElementById('crest-svg').innerHTML = result.svg;\n    document.getElementById('subject-title').textContent = location;\n    document.getElementById('lens-label').textContent =\n      LENSES.find(l => l.id === result.lens)?.label ?? result.lens;\n\n    const commentary = document.getElementById('commentary');\n    commentary.innerHTML = '';\n    (result.commentary ?? []).forEach(block => {\n      const div = document.createElement('div');\n      div.className = 'commentary-block';\n      div.innerHTML = `\n        <div class=\"commentary-element\">${escapeHtml(block.element)}</div>\n        <div class=\"commentary-text\">${escapeHtml(block.text)}</div>`;\n      commentary.appendChild(div);\n    });\n\n    document.getElementById('excuse-block').textContent = result.excuse ?? '';\n    document.getElementById('output-panel').classList.add('visible');\n    document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });\n  }\n\n  function escapeHtml(str) {\n    return String(str)\n      .replace(/&/g, '&amp;').replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\n  }\n</script>\n\n</body>\n</html>\n";

// Flagrants — Cloudflare Worker
// Routes: /health, /research, /design

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

const err = (msg, status = 500) => json({ error: msg }, status);

// ── Heraldic vocabulary — AI picks from these ids only ──────────────────────

const TINCTURES = {
  or: '#FFD700', argent: '#FFFFFF', gules: '#CE1126',
  azure: '#0032A0', sable: '#1C1C1C', vert: '#008000', purpure: '#7B2D8B'
};

const VALID_DIVISIONS = ['plain','per_pale','per_fess','quarterly','per_bend','per_bend_sinister','per_chevron'];
const VALID_CHARGES   = ['lion_rampant','lion_passant','eagle_displayed','castle','tower','sword','crown',
                          'key','hammer','wheel','anchor','ship','fleur_de_lis','rose','cross_charge',
                          'flame','star','serpent','hand','bull','bear'];
const VALID_TINCTURES = Object.keys(TINCTURES);

// ── Defence lenses ───────────────────────────────────────────────────────────

const LENSES = {
  proud_of_it:        'This was fine. The herald sees no issue whatsoever. The crest depicts events as achievements. No apology is required or offered.',
  full_cover_up:      'It never happened. The charges depict something else entirely. The herald is confused by the question. Any resemblance to actual events is coincidental.',
  admit_faults:       'Yes, there were some irregularities. The family has reflected. The crest acknowledges this in the smallest possible way. Progress has been made.',
  blame_others:       'External forces. Enemies. Circumstance. God\'s specific instruction at the time. The herald is very clear on this. The contextually derived excuse will name exactly who or what is to blame.',
  deeply_sorry:       'Full modern apology. All the correct language. The crest has been updated to reflect learnings. Nothing has actually changed.',
  context_everything: 'You have to understand the times. The herald provides a great deal of context. It does not help. The contextually derived excuse will explain why this made sense then.',
  revisionist:        'Actually they were the heroes in this. New research supports this. The herald cites the new research. External involvement — including, where contextually appropriate, extraterrestrial — is not ruled out.',
};

// ── Herald's commentary register ─────────────────────────────────────────────

const HERALD_REGISTER = `
HERALD'S COMMENTARY REGISTER — follow this precisely:

DEFAULT: The Dry Note
Describe events neutrally, factually, with complete authority. Then one small dry word, a mild question,
or a barely-there aside does all the moral work. Never explain the joke. Never name the immorality directly.
Let the gap do the work. The herald does not condemn. He barely notices.

Examples:
- "The family maintained this arrangement for eleven generations, which those involved regarded as tradition."
- "Records note that no formal objection was raised, which historians have described as consistent with the period."
- "The borough — which had by this point lost three mayors to circumstances that were, each time, described as unrelated — adopted the flame as its primary charge."

The Herald's Aside — use this freely:
Insert a dry contradiction or qualification mid-clause using dashes. The herald does not dwell on it. He moves on immediately.
- "The Earl — who by all accounts was a man of considerable conviction, most of it misdirected — maintained this practice for eleven generations."
- "The family — whose contributions to the area remain, even now, a matter of some local feeling — commissioned this crest in 1487."

ESCALATION: The Modern Tariff
For particularly egregious practices only. Translate to a modern equivalent via deliberate understatement.
The smaller the modern framing relative to the historical atrocity, the harder it lands.
- "Today this arrangement would attract considerably more than a parking fine, though the exact number of fines remains a matter of some academic debate."

CALIBRATION: Victorian formal register. Measured. Authoritative. Never sarcastic in tone — only in gap.
The herald is not being ironic. He is genuinely informing.
`;

// ── SVG renderer (inlined — no imports in Worker environment) ─────────────────

const SHIELD_W = 200;
const SHIELD_H = 240;
const SVG_W    = 240;
const SVG_H    = 310;

function shieldPath() {
  const hw = SHIELD_W / 2;
  const h  = SHIELD_H;
  return `M ${-hw},0 Q ${-hw},${-h*0.05} ${-hw+8},${-h*0.05} L ${hw-8},${-h*0.05} Q ${hw},${-h*0.05} ${hw},0 L ${hw},${h*0.55} Q ${hw},${h*0.75} 0,${h} Q ${-hw},${h*0.75} ${-hw},${h*0.55} Z`;
}

function tc(name) { return TINCTURES[name] ?? '#888'; }

function renderField(spec) {
  const div = spec.field?.division ?? 'plain';
  const t1  = tc(spec.field?.tincture ?? 'argent');
  const t2  = tc(spec.field?.secondary_tincture ?? 'gules');
  const hw  = SHIELD_W / 2;
  const h   = SHIELD_H;
  if (div === 'per_pale')     return `<rect x="${-hw}" y="0" width="${hw}" height="${h}" fill="${t1}"/><rect x="0" y="0" width="${hw}" height="${h}" fill="${t2}"/>`;
  if (div === 'per_fess')     return `<rect x="${-hw}" y="0" width="${SHIELD_W}" height="${h/2}" fill="${t1}"/><rect x="${-hw}" y="${h/2}" width="${SHIELD_W}" height="${h/2}" fill="${t2}"/>`;
  if (div === 'quarterly')    return `<rect x="${-hw}" y="0" width="${hw}" height="${h/2}" fill="${t1}"/><rect x="0" y="0" width="${hw}" height="${h/2}" fill="${t2}"/><rect x="${-hw}" y="${h/2}" width="${hw}" height="${h/2}" fill="${t2}"/><rect x="0" y="${h/2}" width="${hw}" height="${h/2}" fill="${t1}"/>`;
  if (div === 'per_bend')     return `<rect x="${-hw}" y="0" width="${SHIELD_W}" height="${h}" fill="${t2}"/><polygon points="${-hw},0 ${hw},0 ${-hw},${h}" fill="${t1}"/>`;
  if (div === 'per_bend_sinister') return `<rect x="${-hw}" y="0" width="${SHIELD_W}" height="${h}" fill="${t2}"/><polygon points="${hw},0 ${hw},${h} ${-hw},${h}" fill="${t1}"/>`;
  if (div === 'per_chevron')  return `<rect x="${-hw}" y="0" width="${SHIELD_W}" height="${h}" fill="${t2}"/><polygon points="${-hw},${h*0.55} 0,${h*0.2} ${hw},${h*0.55} ${hw},${h} ${-hw},${h}" fill="${t1}"/>`;
  return `<rect x="${-hw}" y="0" width="${SHIELD_W}" height="${h}" fill="${t1}"/>`;
}

function chargePos(pos, idx, total) {
  const hw = SHIELD_W / 2; const h = SHIELD_H;
  const map = {
    centre:         [0,          h*0.45],
    dexter:         [-hw*0.42,   h*0.45],
    sinister:       [hw*0.42,    h*0.45],
    chief:          [0,          h*0.2],
    base:           [0,          h*0.72],
    dexter_chief:   [-hw*0.38,   h*0.22],
    sinister_chief: [hw*0.38,    h*0.22],
    dexter_base:    [-hw*0.38,   h*0.68],
    sinister_base:  [hw*0.38,    h*0.68],
  };
  if (pos && map[pos]) return map[pos];
  if (total === 1) return map.centre;
  if (total === 2) return idx === 0 ? map.dexter : map.sinister;
  if (total === 3) return [map.dexter_chief, map.sinister_chief, map.base][idx] ?? map.centre;
  return [map.dexter_chief, map.sinister_chief, map.dexter_base, map.sinister_base][idx] ?? map.centre;
}

function renderCharge(charge, idx, total) {
  const [cx, cy] = chargePos(charge.position, idx, total);
  const col  = tc(charge.tincture ?? 'or');
  const sz   = charge.size ?? 50;
  const id   = charge.id ?? '';

  const g = (inner) => `<g transform="translate(${cx},${cy})">${inner}</g>`;

  if (id === 'cross_charge')   return g(`<rect x="${-sz*0.08}" y="${-sz*0.4}" width="${sz*0.16}" height="${sz*0.8}" fill="${col}"/><rect x="${-sz*0.4}" y="${-sz*0.08}" width="${sz*0.8}" height="${sz*0.16}" fill="${col}"/>`);
  if (id === 'sword')          return g(`<rect x="-2" y="${-sz*0.45}" width="4" height="${sz*0.7}" fill="${col}" rx="1"/><rect x="${-sz*0.18}" y="${sz*0.2}" width="${sz*0.36}" height="${sz*0.07}" fill="${col}"/><polygon points="0,${sz*0.5} -4,${sz*0.25} 4,${sz*0.25}" fill="${col}"/>`);
  if (id === 'crown')          return g(`<rect x="${-sz*0.4}" y="${sz*0.05}" width="${sz*0.8}" height="${sz*0.35}" fill="${col}" rx="2"/><polygon points="${-sz*0.4},${sz*0.05} ${-sz*0.4},${-sz*0.3} ${-sz*0.25},${-sz*0.1} 0,${-sz*0.35} ${sz*0.25},${-sz*0.1} ${sz*0.4},${-sz*0.3} ${sz*0.4},${sz*0.05}" fill="${col}"/>`);
  if (id === 'castle')         return g(`<rect x="${-sz*0.42}" y="${sz*0.05}" width="${sz*0.84}" height="${sz*0.45}" fill="${col}"/><rect x="${-sz*0.42}" y="${-sz*0.3}" width="${sz*0.22}" height="${sz*0.38}" fill="${col}"/><rect x="${-sz*0.11}" y="${-sz*0.3}" width="${sz*0.22}" height="${sz*0.38}" fill="${col}"/><rect x="${sz*0.2}" y="${-sz*0.3}" width="${sz*0.22}" height="${sz*0.38}" fill="${col}"/><rect x="${-sz*0.12}" y="${sz*0.2}" width="${sz*0.24}" height="${sz*0.3}" fill="none" stroke="${col}" stroke-width="2"/>`);
  if (id === 'key')            return g(`<circle cx="0" cy="${-sz*0.25}" r="${sz*0.18}" fill="none" stroke="${col}" stroke-width="${sz*0.09}"/><rect x="-${sz*0.045}" y="${-sz*0.08}" width="${sz*0.09}" height="${sz*0.55}" fill="${col}" rx="1"/><rect x="0" y="${sz*0.3}" width="${sz*0.15}" height="${sz*0.07}" fill="${col}"/><rect x="0" y="${sz*0.42}" width="${sz*0.12}" height="${sz*0.07}" fill="${col}"/>`);
  if (id === 'wheel')          return g(`<circle cx="0" cy="0" r="${sz*0.42}" fill="none" stroke="${col}" stroke-width="${sz*0.1}"/><circle cx="0" cy="0" r="${sz*0.1}" fill="${col}"/>${[0,45,90,135].map(a=>{const r=a*Math.PI/180;const x1=Math.cos(r)*sz*0.1;const y1=Math.sin(r)*sz*0.1;const x2=Math.cos(r)*sz*0.4;const y2=Math.sin(r)*sz*0.4;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${sz*0.07}"/><line x1="${-x1}" y1="${-y1}" x2="${-x2}" y2="${-y2}" stroke="${col}" stroke-width="${sz*0.07}"/>`;}).join('')}`);
  if (id === 'anchor')         return g(`<circle cx="0" cy="${-sz*0.28}" r="${sz*0.13}" fill="none" stroke="${col}" stroke-width="${sz*0.09}"/><rect x="-${sz*0.045}" y="${-sz*0.15}" width="${sz*0.09}" height="${sz*0.6}" fill="${col}" rx="1"/><rect x="${-sz*0.3}" y="${-sz*0.18}" width="${sz*0.6}" height="${sz*0.07}" fill="${col}"/><path d="M ${-sz*0.3},${sz*0.45} Q ${-sz*0.4},${sz*0.55} 0,${sz*0.5} Q ${sz*0.4},${sz*0.55} ${sz*0.3},${sz*0.45}" fill="none" stroke="${col}" stroke-width="${sz*0.09}"/>`);
  if (id === 'hammer')         return g(`<rect x="${-sz*0.28}" y="${-sz*0.3}" width="${sz*0.56}" height="${sz*0.28}" fill="${col}" rx="3"/><rect x="-${sz*0.055}" y="${-sz*0.05}" width="${sz*0.11}" height="${sz*0.55}" fill="${col}" rx="2"/>`);
  if (id === 'fleur_de_lis')   return g(`<ellipse cx="0" cy="${-sz*0.22}" rx="${sz*0.1}" ry="${sz*0.28}" fill="${col}"/><ellipse cx="${-sz*0.22}" cy="${-sz*0.05}" rx="${sz*0.22}" ry="${sz*0.1}" fill="${col}"/><ellipse cx="${sz*0.22}" cy="${-sz*0.05}" rx="${sz*0.22}" ry="${sz*0.1}" fill="${col}"/><rect x="${-sz*0.06}" y="${sz*0.05}" width="${sz*0.12}" height="${sz*0.3}" fill="${col}"/><ellipse cx="0" cy="${sz*0.35}" rx="${sz*0.18}" ry="${sz*0.08}" fill="${col}"/>`);
  if (id === 'star')           return g(`<polygon points="${[0,1,2,3,4].map(i=>{const o=(i*72-90)*Math.PI/180;const inn=((i*72)+36-90)*Math.PI/180;return `${Math.cos(o)*sz*0.4},${Math.sin(o)*sz*0.4} ${Math.cos(inn)*sz*0.18},${Math.sin(inn)*sz*0.18}`;}).join(' ')}" fill="${col}"/>`);
  if (id === 'flame')          return g(`<path d="M 0,${-sz*0.45} C ${sz*0.15},${-sz*0.2} ${sz*0.3},0 ${sz*0.15},${sz*0.2} C ${sz*0.35},0 ${sz*0.2},${-sz*0.3} ${sz*0.05},${-sz*0.1} C ${sz*0.25},${-sz*0.35} 0,${sz*0.45} ${-sz*0.15},${sz*0.2} C ${-sz*0.3},0 ${-sz*0.15},${-sz*0.2} 0,${-sz*0.45} Z" fill="${col}"/>`);
  if (id === 'lion_rampant')   return g(`<ellipse cx="0" cy="${-sz*0.05}" rx="${sz*0.22}" ry="${sz*0.28}" fill="${col}"/><ellipse cx="0" cy="${sz*0.28}" rx="${sz*0.16}" ry="${sz*0.2}" fill="${col}"/><ellipse cx="${-sz*0.18}" cy="${-sz*0.22}" rx="${sz*0.1}" ry="${sz*0.16}" fill="${col}" transform="rotate(-30,${-sz*0.18},${-sz*0.22})"/><ellipse cx="${sz*0.22}" cy="${-sz*0.15}" rx="${sz*0.08}" ry="${sz*0.14}" fill="${col}" transform="rotate(20,${sz*0.22},${-sz*0.15})"/><circle cx="${-sz*0.06}" cy="${-sz*0.3}" r="${sz*0.13}" fill="${col}"/>`);
  if (id === 'eagle_displayed') return g(`<ellipse cx="0" cy="${-sz*0.05}" rx="${sz*0.14}" ry="${sz*0.2}" fill="${col}"/><circle cx="0" cy="${-sz*0.27}" r="${sz*0.11}" fill="${col}"/><path d="M ${-sz*0.14},${-sz*0.1} Q ${-sz*0.45},${-sz*0.35} ${-sz*0.45},${sz*0.05} Q ${-sz*0.3},${sz*0.2} 0,0" fill="${col}"/><path d="M ${sz*0.14},${-sz*0.1} Q ${sz*0.45},${-sz*0.35} ${sz*0.45},${sz*0.05} Q ${sz*0.3},${sz*0.2} 0,0" fill="${col}"/><path d="M ${-sz*0.1},${sz*0.15} L ${-sz*0.2},${sz*0.45} L 0,${sz*0.3} L ${sz*0.2},${sz*0.45} L ${sz*0.1},${sz*0.15}" fill="${col}"/>`);

  // Generic fallback — circle with initial
  return g(`<circle cx="0" cy="0" r="${sz*0.32}" fill="${col}" opacity="0.7"/><text text-anchor="middle" dominant-baseline="central" font-size="${sz*0.28}" fill="${tc(charge.tincture === 'or' ? 'sable' : 'or')}" font-family="Georgia,serif">${id.charAt(0).toUpperCase()}</text>`);
}

function renderMotto(motto, translation) {
  if (!motto) return '';
  const y = SHIELD_H + 30;
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  return `<g transform="translate(0,${y})">
    <rect x="${-SHIELD_W/2}" y="-15" width="${SHIELD_W}" height="22" rx="3" fill="#2a1a00" opacity="0.9"/>
    <text text-anchor="middle" dominant-baseline="middle" y="1" font-family="Palatino,Georgia,serif" font-size="11" font-style="italic" fill="#FFD700" letter-spacing="1">${esc(motto)}</text>
  </g>
  ${translation ? `<text x="0" y="${y+22}" text-anchor="middle" font-family="Georgia,serif" font-size="8.5" fill="#a08040" font-style="italic">${esc(translation)}</text>` : ''}`;
}

function buildSVG(spec) {
  const charges  = spec.charges ?? [];
  const clipId   = `sc-${Date.now()}`;
  const cx = SVG_W / 2;
  const cy = 20;
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SVG_W} ${SVG_H}" width="${SVG_W}" height="${SVG_H}">
  <defs>
    <clipPath id="${clipId}"><path d="${shieldPath()}" transform="translate(${cx},${cy})"/></clipPath>
    <filter id="sh"><feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#00000055"/></filter>
  </defs>
  <path d="${shieldPath()}" transform="translate(${cx},${cy})" fill="#00000033" filter="url(#sh)"/>
  <g clip-path="url(#${clipId})" transform="translate(${cx},${cy})">${renderField(spec)}</g>
  <g clip-path="url(#${clipId})" transform="translate(${cx},${cy})">${charges.map((c,i)=>renderCharge(c,i,charges.length)).join('')}</g>
  <path d="${shieldPath()}" transform="translate(${cx},${cy})" fill="none" stroke="#2a1a00" stroke-width="3"/>
  <g transform="translate(${cx},${cy})">${renderMotto(spec.motto, spec.motto_translation)}</g>
</svg>`;
}

// ── Prompts ──────────────────────────────────────────────────────────────────

const RESEARCH_SYSTEM = `You are the Herald's Researcher. Your job is to surface what a place actually is — not what it claims to be.

Research the given location and return a JSON object with this exact structure:
{
  "subject": "<the place name as given>",
  "tier1": {
    "character": "<one sentence: the essential character of this place — its class, mood, reputation>",
    "notable": "<any well-known associations, industries, or facts>"
  },
  "tier2": {
    "history": "<local history — what happened here, what was built or destroyed>",
    "figures": "<notable people connected to this place and why>",
    "industry": "<what this place made, did, or was used for>"
  },
  "tier3": {
    "dark_history": "<gallows, plague, disaster, misdemeanour, crime — real or popularly believed>",
    "buried": "<what this place has tried to move past — the regrettable association>",
    "popularly_held": "<what people actually think of this place, regardless of official position>",
    "obscure": "<something mundane, weird, or bizarre that would not make front page news but is true or plausible>"
  },
  "comedy_seed": "<the single most generative finding for comedy — the thing that should drive the crest design>"
}

Return ONLY valid JSON. No preamble. No explanation.`;

function buildDesignSystem(lens) {
  const lensDesc = LENSES[lens] ?? LENSES.proud_of_it;
  const vocab = `CONTROLLED VOCABULARY — use ONLY these values:
Tinctures: ${VALID_TINCTURES.join(', ')}
Field divisions: ${VALID_DIVISIONS.join(', ')}
Charge ids: ${VALID_CHARGES.join(', ')}
Positions: centre, dexter, sinister, chief, base, dexter_chief, sinister_chief, dexter_base, sinister_base`;

  return `You are the Herald. You design coats of arms that depict what a place actually was — with the full dignity it never deserved.

DEFENCE LENS: ${lensDesc}
The chosen excuse must be contextually derived from the research findings — not generic. It should be the most fitting and therefore funniest deflection available given what was actually found.

${HERALD_REGISTER}

${vocab}

Return ONLY this JSON structure — no preamble, no markdown, no explanation:
{
  "field": {
    "tincture": "<primary tincture id>",
    "division": "<division id>",
    "secondary_tincture": "<second tincture id, required if division is not plain>"
  },
  "charges": [
    {
      "id": "<charge id from controlled vocabulary>",
      "tincture": "<tincture id>",
      "position": "<position>"
    }
  ],
  "motto": "<Latin or short vernacular motto>",
  "motto_translation": "<English translation>",
  "excuse": "<the contextually derived excuse — one or two sentences, in the Herald's register, from within the chosen lens>",
  "commentary": [
    { "element": "<element name e.g. 'field', 'the lion rampant', 'the motto'>", "text": "<Herald's commentary — Dry Note register, 2-4 sentences>" },
    { "element": "...", "text": "..." }
  ]
}

Include one commentary block per element (field + each charge + motto = typically 3–5 blocks).
The motto should be memorable, slightly ironic, and in keeping with the lens.
The commentary should be in the Herald's register — Victorian, authoritative, dry. Never explain the joke.`;
}

// ── Anthropic call ───────────────────────────────────────────────────────────

async function callClaude(env, system, userMsg, maxTokens = 1200) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  return data.content?.[0]?.text ?? '';
}

function parseJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found in response');
  return JSON.parse(match[0]);
}

function validateSpec(spec) {
  if (!spec.field?.tincture || !VALID_TINCTURES.includes(spec.field.tincture))
    spec.field = { tincture: 'sable', division: 'plain' };
  if (!VALID_DIVISIONS.includes(spec.field.division)) spec.field.division = 'plain';
  if (spec.field.secondary_tincture && !VALID_TINCTURES.includes(spec.field.secondary_tincture))
    spec.field.secondary_tincture = 'argent';
  spec.charges = (spec.charges ?? []).filter(c => VALID_CHARGES.includes(c.id)).slice(0, 4);
  spec.charges.forEach(c => { if (!VALID_TINCTURES.includes(c.tincture)) c.tincture = 'or'; });
  return spec;
}

// ── Request handler ──────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: CORS });

    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html')
      return new Response(INDEX_HTML, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS } });

    if (url.pathname === '/health')
      return new Response('OK', { status: 200, headers: CORS });

    if (url.pathname === '/research' && request.method === 'POST') {
      try {
        const body = await request.json();
        const subject = (body.subject ?? '').trim();
        if (!subject) return err('subject required', 400);

        const raw = await callClaude(env, RESEARCH_SYSTEM, `Research this location: ${subject}`, 800);
        const findings = parseJSON(raw);
        return json(findings);
      } catch (e) {
        return err(e.message);
      }
    }

    if (url.pathname === '/design' && request.method === 'POST') {
      try {
        const body     = await request.json();
        const findings = body.findings;
        const lens     = body.lens ?? 'proud_of_it';
        if (!findings) return err('findings required', 400);
        if (!LENSES[lens]) return err(`unknown lens: ${lens}`, 400);

        const system   = buildDesignSystem(lens);
        const userMsg  = `Research findings:\n${JSON.stringify(findings, null, 2)}\n\nDefence lens: ${lens}`;
        const raw      = await callClaude(env, system, userMsg, 1400);
        const spec     = validateSpec(parseJSON(raw));
        const svg      = buildSVG(spec);

        return json({ ...spec, svg, lens });
      } catch (e) {
        return err(e.message);
      }
    }

    return err('Not found', 404);
  }
};
