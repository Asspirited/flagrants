const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlPath = path.join(rootDir, 'code', 'index.html');
const workerPath = path.join(rootDir, 'code', 'worker.js');
const rootHtmlPath = path.join(rootDir, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Ensure CSS rules for output header, heading, affectation, slogan, twinning, and segment stories
const cssToInsert = `
    .output-header {
      width: 100%;
      text-align: center;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid #3d2b0a;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .main-heading {
      font-size: 1.9rem;
      color: #FFD700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: bold;
      line-height: 1.2;
    }

    .subject-name {
      color: #FFD700;
    }

    .subject-affectation {
      font-size: 1.35rem;
      color: #c8a060;
      font-style: italic;
      text-transform: none;
      font-weight: normal;
    }

    .slogan-block {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: baseline;
      gap: 0.6rem;
      margin-top: 0.1rem;
    }

    .slogan-motto {
      font-size: 1.35rem;
      color: #e8d5a3;
      font-style: italic;
      font-weight: bold;
      letter-spacing: 0.04em;
    }

    .slogan-translation {
      font-size: 1.15rem;
      color: #a08040;
      font-style: italic;
    }

    .twinning-block {
      font-size: 0.95rem;
      color: #c8a060;
      margin-top: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .twinning-label {
      color: #a08040;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.06em;
    }

    .twinning-item {
      background: #2a1a08;
      border: 1px solid #4a3410;
      padding: 0.2rem 0.7rem;
      border-radius: 12px;
      color: #e8d5a3;
      font-size: 0.88rem;
      font-style: italic;
    }

    .section-subheading {
      font-size: 1.05rem;
      color: #FFD700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.8rem;
      border-bottom: 1px solid #3d2b0a;
      padding-bottom: 0.4rem;
    }

    .commentary-container {
      display: flex;
      flex-direction: column;
    }
`;

if (!html.includes('.output-header {')) {
  html = html.replace('.error {', cssToInsert + '\n    .error {');
}

// 2. Update HTML structure inside output-panel
const outputPanelHtml = `<div class="output-panel" id="output-panel">
    <div class="output-header">
      <h2 class="main-heading">
        <span class="subject-name" id="subject-name"></span>
        <span class="subject-affectation" id="subject-affectation"></span>
      </h2>
      <div class="slogan-block" id="slogan-block">
        <span class="slogan-motto" id="slogan-motto"></span>
        <span class="slogan-translation" id="slogan-translation"></span>
      </div>
      <div class="twinning-block" id="twinning-block"></div>
    </div>
    <div class="crest-layout">
      <div class="crest-figure">
        <div id="crest-svg"></div>
        <div class="lens-label" id="lens-label"></div>
      </div>
      <div class="commentary-container">
        <h3 class="section-subheading">Segment Pictures & Stories</h3>
        <div class="commentary" id="commentary"></div>
      </div>
    </div>
    <div class="excuse-block" id="excuse-block"></div>
  </div>`;

html = html.replace(/<div class="output-panel" id="output-panel">[\s\S]*?<\/div>\s*<\/main>/, outputPanelHtml + '\n\n</main>');

// 3. Update renderOutput function in script
const renderOutputJs = `  function renderOutput(location, result) {
    document.getElementById('crest-svg').innerHTML = result.svg;
    
    document.getElementById('subject-name').textContent = location;
    const affectation = result.affectation ?? result.nickname ?? '';
    document.getElementById('subject-affectation').textContent = affectation ? \` — \${affectation}\` : '';

    const motto = result.motto ?? '';
    const translation = result.motto_translation ?? '';
    document.getElementById('slogan-motto').textContent = motto ? \`“\${motto}”\` : '';
    document.getElementById('slogan-translation').textContent = translation ? \`(\${translation})\` : '';

    // Render Twinned Places
    const twinningContainer = document.getElementById('twinning-block');
    twinningContainer.innerHTML = '';
    const twinned = result.twinned_with ?? result.twinned ?? [];
    if (Array.isArray(twinned) && twinned.length > 0) {
      const label = document.createElement('span');
      label.className = 'twinning-label';
      label.textContent = '🤝 Twinned with:';
      twinningContainer.appendChild(label);
      
      twinned.forEach(place => {
        const item = document.createElement('span');
        item.className = 'twinning-item';
        item.textContent = place;
        twinningContainer.appendChild(item);
      });
    }

    document.getElementById('lens-label').textContent =
      LENSES.find(l => l.id === result.lens)?.label ?? result.lens;

    const commentary = document.getElementById('commentary');
    commentary.innerHTML = '';
    (result.commentary ?? []).forEach(block => {
      const div = document.createElement('div');
      div.className = 'commentary-block';
      div.innerHTML = \`
        <div class="commentary-element">\${escapeHtml(block.element)}</div>
        <div class="commentary-text">\${escapeHtml(block.text)}</div>\`;
      commentary.appendChild(div);
    });

    document.getElementById('excuse-block').textContent = result.excuse ?? '';
    document.getElementById('output-panel').classList.add('visible');
    document.getElementById('output-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }`;

html = html.replace(/function renderOutput\(location, result\) \{[\s\S]*?\}\s*function escapeHtml/, renderOutputJs + '\n\n  function escapeHtml');

fs.writeFileSync(htmlPath, html, 'utf8');
fs.writeFileSync(rootHtmlPath, html, 'utf8');
console.log('Successfully updated code/index.html and index.html');

// 4. Update code/worker.js prompts & SVG rendering specs
let workerJs = fs.readFileSync(workerPath, 'utf8');

const newResearchSystem = `const RESEARCH_SYSTEM = \`You are the Herald's Researcher. Your job is to surface what a place actually is — not what it claims to be.

Research the given location and return a JSON object with this exact structure:
{
  "subject": "<the place name as given>",
  "affectation": "<a punchy, witty nickname or popular affectation, e.g. 'The Royal Borough's Unwanted Cousin' or 'Gateway to the M4'>",
  "twinned_with": [
    "<real or humorously twinned town 1>",
    "<real or humorously twinned town 2>"
  ],
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

Return ONLY valid JSON. No preamble. No explanation.\`;`;

workerJs = workerJs.replace(/const RESEARCH_SYSTEM = [\s\S]*?;\n\nfunction buildDesignSystem/, newResearchSystem + '\n\nfunction buildDesignSystem');

const newBuildDesignSystem = `function buildDesignSystem(lens) {
  const lensDesc = LENSES[lens] ?? LENSES.proud_of_it;
  const vocab = \`CONTROLLED VOCABULARY — use ONLY these values:
Tinctures: \${VALID_TINCTURES.join(', ')}
Field divisions: \${VALID_DIVISIONS.join(', ')}
Charge ids: \${VALID_CHARGES.join(', ')}
Positions: centre, dexter, sinister, chief, base, dexter_chief, sinister_chief, dexter_base, sinister_base\`;

  return \`You are the Herald. You design coats of arms that depict what a place actually was — with the full dignity it never deserved.

DEFENCE LENS: \${lensDesc}
The chosen excuse must be contextually derived from the research findings — not generic. It should be the most fitting and therefore funniest deflection available given what was actually found.

\${HERALD_REGISTER}

\${vocab}

Return ONLY this JSON structure — no preamble, no markdown, no explanation:
{
  "affectation": "<a punchy, witty nickname or affectation for this place/family>",
  "twinned_with": ["<twinned place 1>", "<twinned place 2>"],
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
    { "element": "Field & Division", "text": "<story of the background division and tinctures chosen>" },
    { "element": "Segment Picture: <charge name>", "text": "<detailed story describing why this specific segment picture/symbol was chosen for the crest>" }
  ]
}

Include one commentary block per element (field + each segment picture/charge + motto = typically 3–5 blocks).
The motto should be memorable, slightly ironic, and in keeping with the lens.
The commentary should be in the Herald's register — Victorian, authoritative, dry. Never explain the joke.\`;
}`;

workerJs = workerJs.replace(/function buildDesignSystem\(lens\) \{[\s\S]*?\}\n\n\/\/ ── Anthropic call/, newBuildDesignSystem + '\n\n// ── Anthropic call');

// Re-embed INDEX_HTML into worker.js
const indexConst = 'const INDEX_HTML = ' + JSON.stringify(html) + ';\n\n';
if (workerJs.startsWith('const INDEX_HTML =')) {
  workerJs = workerJs.replace(/^const INDEX_HTML = [\s\S]*?;\n\n/, indexConst);
} else {
  workerJs = indexConst + workerJs;
}

fs.writeFileSync(workerPath, workerJs, 'utf8');
console.log('Successfully updated worker.js with new prompts and embedded index.html');
