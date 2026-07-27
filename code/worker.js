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
