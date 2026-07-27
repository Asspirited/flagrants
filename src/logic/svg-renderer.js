// svg-renderer.js
// Takes a heraldic spec JSON, returns an SVG string.
// All rendering is pure — no DOM, no side effects. Testable in Node.

const { TINCTURES, FIELD_DIVISIONS } = require('../data/heraldic-vocabulary.js');

const SHIELD_WIDTH = 200;
const SHIELD_HEIGHT = 240;
const SVG_WIDTH = 240;
const SVG_HEIGHT = 300;

// Heater shield path — the classic English shield shape
// Centred at (0,0), fits in a 200×240 box
function shieldPath() {
  const w = SHIELD_WIDTH;
  const h = SHIELD_HEIGHT;
  const hw = w / 2;
  // Rounded top corners, straight sides tapering to a point at the bottom
  return `M ${-hw},0
    Q ${-hw},${-h * 0.05} ${-hw + 8},${-h * 0.05}
    L ${hw - 8},${-h * 0.05}
    Q ${hw},${-h * 0.05} ${hw},0
    L ${hw},${h * 0.55}
    Q ${hw},${h * 0.75} 0,${h}
    Q ${-hw},${h * 0.75} ${-hw},${h * 0.55}
    Z`;
}

function tincture(name) {
  const all = { ...TINCTURES.metals, ...TINCTURES.colours };
  return all[name]?.colour ?? '#888888';
}

function renderField(spec) {
  const div = spec.field?.division ?? 'plain';
  const t1 = tincture(spec.field?.tincture ?? 'argent');
  const t2 = tincture(spec.field?.secondary_tincture ?? 'gules');
  const w = SHIELD_WIDTH;
  const h = SHIELD_HEIGHT;
  const hw = w / 2;

  if (div === 'plain') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t1}" />`;
  }
  if (div === 'per_pale') {
    return `<rect x="${-hw}" y="0" width="${hw}" height="${h}" fill="${t1}" />
            <rect x="0" y="0" width="${hw}" height="${h}" fill="${t2}" />`;
  }
  if (div === 'per_fess') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h / 2}" fill="${t1}" />
            <rect x="${-hw}" y="${h / 2}" width="${w}" height="${h / 2}" fill="${t2}" />`;
  }
  if (div === 'quarterly') {
    return `<rect x="${-hw}" y="0" width="${hw}" height="${h / 2}" fill="${t1}" />
            <rect x="0" y="0" width="${hw}" height="${h / 2}" fill="${t2}" />
            <rect x="${-hw}" y="${h / 2}" width="${hw}" height="${h / 2}" fill="${t2}" />
            <rect x="0" y="${h / 2}" width="${hw}" height="${h / 2}" fill="${t1}" />`;
  }
  if (div === 'per_bend') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${-hw},0 ${hw},0 ${-hw},${h}" fill="${t1}" />`;
  }
  if (div === 'per_bend_sinister') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${hw},0 ${hw},${h} ${-hw},${h}" fill="${t1}" />`;
  }
  if (div === 'per_chevron') {
    return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t2}" />
            <polygon points="${-hw},${h * 0.55} 0,${h * 0.2} ${hw},${h * 0.55} ${hw},${h} ${-hw},${h}" fill="${t1}" />`;
  }
  // Fallback
  return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t1}" />`;
}

function chargePosition(pos, index, total) {
  const hw = SHIELD_WIDTH / 2;
  const h = SHIELD_HEIGHT;
  const positions = {
    centre: [0, h * 0.45],
    dexter: [-hw * 0.45, h * 0.45],
    sinister: [hw * 0.45, h * 0.45],
    chief: [0, h * 0.2],
    base: [0, h * 0.72],
    dexter_chief: [-hw * 0.4, h * 0.22],
    sinister_chief: [hw * 0.4, h * 0.22],
    dexter_base: [-hw * 0.4, h * 0.68],
    sinister_base: [hw * 0.4, h * 0.68]
  };
  // Auto-distribute if no explicit position
  if (!pos || pos === 'auto') {
    if (total === 1) return positions.centre;
    if (total === 2) return index === 0 ? positions.dexter : positions.sinister;
    if (total === 3) {
      const pts = [positions.dexter_chief, positions.sinister_chief, positions.base];
      return pts[index] ?? positions.centre;
    }
    const pts = [positions.dexter_chief, positions.sinister_chief, positions.dexter_base, positions.sinister_base];
    return pts[index] ?? positions.centre;
  }
  return positions[pos] ?? positions.centre;
}

function renderCharge(charge, index, total) {
  const [cx, cy] = chargePosition(charge.position, index, total);
  const colour = tincture(charge.tincture ?? 'or');
  const size = charge.size ?? 52;

  // Inline SVG shapes for each charge type
  // In production these would be loaded from src/svg/charges/*.svg
  // For now: simple geometric stand-ins that read as the right symbol
  const shapes = {
    lion_rampant: `<g transform="translate(${cx},${cy})">
      <text text-anchor="middle" dominant-baseline="central" font-size="${size * 0.9}" fill="${colour}" style="font-family:serif">🦁</text>
    </g>`,
    lion_passant: `<g transform="translate(${cx},${cy})">
      <text text-anchor="middle" dominant-baseline="central" font-size="${size * 0.8}" fill="${colour}" style="font-family:serif">🦁</text>
    </g>`,
    eagle_displayed: `<g transform="translate(${cx},${cy})">
      <text text-anchor="middle" dominant-baseline="central" font-size="${size * 0.85}" fill="${colour}">🦅</text>
    </g>`,
    castle: `<g transform="translate(${cx - size/2},${cy - size/2})">
      <rect x="0" y="${size*0.35}" width="${size}" height="${size*0.65}" fill="${colour}" />
      <rect x="${size*0.05}" y="${size*0.1}" width="${size*0.25}" height="${size*0.3}" fill="${colour}" />
      <rect x="${size*0.37}" y="${size*0.1}" width="${size*0.25}" height="${size*0.3}" fill="${colour}" />
      <rect x="${size*0.69}" y="${size*0.1}" width="${size*0.25}" height="${size*0.3}" fill="${colour}" />
      <rect x="${size*0.35}" y="${size*0.5}" width="${size*0.3}" height="${size*0.5}" fill="none" stroke="${colour}" stroke-width="2"/>
    </g>`,
    sword: `<g transform="translate(${cx},${cy - size/2})">
      <rect x="-2" y="0" width="4" height="${size * 0.7}" fill="${colour}" rx="1"/>
      <rect x="-${size*0.18}" y="${size*0.65}" width="${size*0.36}" height="${size*0.07}" fill="${colour}" rx="1"/>
      <polygon points="0,${size} -4,${size*0.72} 4,${size*0.72}" fill="${colour}"/>
    </g>`,
    crown: `<g transform="translate(${cx - size*0.4},${cy - size*0.25})">
      <rect x="0" y="${size*0.3}" width="${size*0.8}" height="${size*0.35}" fill="${colour}" rx="2"/>
      <polygon points="${size*0.1},${size*0.3} ${size*0.1},0 ${size*0.25},${size*0.15} ${size*0.4},0 ${size*0.55},${size*0.15} ${size*0.7},0 ${size*0.7},${size*0.3}" fill="${colour}"/>
    </g>`,
    key: `<g transform="translate(${cx},${cy - size*0.45})">
      <circle cx="0" cy="${size*0.18}" r="${size*0.18}" fill="none" stroke="${colour}" stroke-width="${size*0.08}"/>
      <rect x="-${size*0.04}" y="${size*0.35}" width="${size*0.08}" height="${size*0.55}" fill="${colour}" rx="1"/>
      <rect x="0" y="${size*0.7}" width="${size*0.15}" height="${size*0.07}" fill="${colour}"/>
      <rect x="0" y="${size*0.82}" width="${size*0.12}" height="${size*0.07}" fill="${colour}"/>
    </g>`,
    wheel: `<g transform="translate(${cx},${cy})">
      <circle cx="0" cy="0" r="${size*0.42}" fill="none" stroke="${colour}" stroke-width="${size*0.1}"/>
      <circle cx="0" cy="0" r="${size*0.1}" fill="${colour}"/>
      ${[0,45,90,135].map(a => {
        const r = a * Math.PI / 180;
        const x1 = Math.cos(r) * size*0.1; const y1 = Math.sin(r) * size*0.1;
        const x2 = Math.cos(r) * size*0.4; const y2 = Math.sin(r) * size*0.4;
        const x3 = -x1; const y3 = -y1; const x4 = -x2; const y4 = -y2;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colour}" stroke-width="${size*0.07}"/>
                <line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y4}" stroke="${colour}" stroke-width="${size*0.07}"/>`;
      }).join('')}
    </g>`,
    cross_charge: `<g transform="translate(${cx},${cy})">
      <rect x="-${size*0.08}" y="-${size*0.4}" width="${size*0.16}" height="${size*0.8}" fill="${colour}"/>
      <rect x="-${size*0.4}" y="-${size*0.08}" width="${size*0.8}" height="${size*0.16}" fill="${colour}"/>
    </g>`,
    fleur_de_lis: `<g transform="translate(${cx},${cy - size*0.4})">
      <text text-anchor="middle" dominant-baseline="hanging" font-size="${size}" fill="${colour}" style="font-family:serif">⚜</text>
    </g>`,
    anchor: `<g transform="translate(${cx},${cy - size*0.45})">
      <circle cx="0" cy="${size*0.12}" r="${size*0.12}" fill="none" stroke="${colour}" stroke-width="${size*0.08}"/>
      <rect x="-${size*0.04}" y="${size*0.22}" width="${size*0.08}" height="${size*0.6}" fill="${colour}" rx="1"/>
      <rect x="-${size*0.3}" y="${size*0.18}" width="${size*0.6}" height="${size*0.07}" fill="${colour}"/>
      <path d="M -${size*0.3},${size*0.82} Q -${size*0.4},${size*0.95} 0,${size*0.9} Q ${size*0.4},${size*0.95} ${size*0.3},${size*0.82}" fill="none" stroke="${colour}" stroke-width="${size*0.08}"/>
    </g>`,
    flame: `<g transform="translate(${cx},${cy - size*0.4})">
      <text text-anchor="middle" dominant-baseline="hanging" font-size="${size}" fill="${colour}">🔥</text>
    </g>`,
    star: `<g transform="translate(${cx},${cy})">
      ${(() => {
        const pts = [];
        for (let i = 0; i < 5; i++) {
          const outer = (i * 72 - 90) * Math.PI / 180;
          const inner = ((i * 72) + 36 - 90) * Math.PI / 180;
          pts.push(`${Math.cos(outer)*size*0.4},${Math.sin(outer)*size*0.4}`);
          pts.push(`${Math.cos(inner)*size*0.18},${Math.sin(inner)*size*0.18}`);
        }
        return `<polygon points="${pts.join(' ')}" fill="${colour}"/>`;
      })()}
    </g>`,
    serpent: `<g transform="translate(${cx},${cy})">
      <text text-anchor="middle" dominant-baseline="central" font-size="${size*0.85}" fill="${colour}">🐍</text>
    </g>`,
    hand: `<g transform="translate(${cx},${cy})">
      <text text-anchor="middle" dominant-baseline="central" font-size="${size*0.85}" fill="${colour}">✋</text>
    </g>`
  };

  return shapes[charge.id] ?? `<circle cx="${cx}" cy="${cy}" r="${size*0.3}" fill="${colour}" opacity="0.5"/>`;
}

function renderMotto(motto, translation) {
  if (!motto) return '';
  const y = SHIELD_HEIGHT + 28;
  return `
    <g transform="translate(0, ${y})">
      <rect x="-${SHIELD_WIDTH/2}" y="-14" width="${SHIELD_WIDTH}" height="22" rx="3" fill="#2a1a00" opacity="0.85"/>
      <text text-anchor="middle" dominant-baseline="middle" y="1"
        font-family="Palatino, Georgia, serif" font-size="11" font-style="italic"
        fill="#FFD700" letter-spacing="1">${escapeXml(motto)}</text>
    </g>
    ${translation ? `<text x="0" y="${y + 22}" text-anchor="middle"
      font-family="Georgia, serif" font-size="8.5" fill="#555" font-style="italic"
      dominant-baseline="hanging">${escapeXml(translation)}</text>` : ''}`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSpec(spec) {
  const charges = spec.charges ?? [];
  const clipId = `shield-clip-${Math.random().toString(36).slice(2, 7)}`;
  const cx = SVG_WIDTH / 2;
  const cy = 20;

  const fieldSvg = renderField(spec);
  const chargesSvg = charges.map((c, i) => renderCharge(c, i, charges.length)).join('\n');
  const mottoSvg = renderMotto(spec.motto, spec.motto_translation);

  return `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
  width="${SVG_WIDTH}" height="${SVG_HEIGHT}">

  <defs>
    <clipPath id="${clipId}">
      <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"/>
    </clipPath>
    <filter id="shield-shadow" x="-8%" y="-4%" width="116%" height="116%">
      <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#00000055"/>
    </filter>
  </defs>

  <!-- Shield outline (drop shadow layer) -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="#00000033" filter="url(#shield-shadow)"/>

  <!-- Field (clipped to shield shape) -->
  <g clip-path="url(#${clipId})" transform="translate(${cx}, ${cy})">
    ${fieldSvg}
  </g>

  <!-- Charges (clipped) -->
  <g clip-path="url(#${clipId})" transform="translate(${cx}, ${cy})">
    ${chargesSvg}
  </g>

  <!-- Shield border -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="none" stroke="#2a1a00" stroke-width="3"/>

  <!-- Motto scroll -->
  <g transform="translate(${cx}, ${cy})">
    ${mottoSvg}
  </g>

</svg>`;
}

module.exports = { renderSpec, shieldPath, renderField, renderCharge, tincture };
