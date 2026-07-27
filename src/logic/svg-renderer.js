// svg-renderer.js
// Hybrid Layered SVG Renderer for Flagrants — 3D Metallic & Textured Medieval Heraldry

const { TINCTURES } = require('../data/heraldic-vocabulary.js');

const SHIELD_WIDTH = 200;
const SHIELD_HEIGHT = 240;
const SVG_WIDTH = 240;
const SVG_HEIGHT = 330;

// Heater shield path — classic English shield shape
function shieldPath() {
  const w = SHIELD_WIDTH;
  const h = SHIELD_HEIGHT;
  const hw = w / 2;
  return `M ${-hw},0
    Q ${-hw},${-h * 0.05} ${-hw + 8},${-h * 0.05}
    L ${hw - 8},${-h * 0.05}
    Q ${hw},${-h * 0.05} ${hw},0
    L ${hw},${h * 0.55}
    Q ${hw},${h * 0.75} 0,${h}
    Q ${-hw},${h * 0.75} ${-hw},${h * 0.55}
    Z`;
}

const TINCTURE_HEX = {
  or: '#FFD700',
  argent: '#FFFFFF',
  gules: '#CE1126',
  azure: '#0032A0',
  sable: '#1C1C1C',
  vert: '#008000',
  purpure: '#7B2D8B'
};

function getLuminance(hex) {
  const c = (hex || '#888888').replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const f = v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function getContrastRatio(t1, t2) {
  const h1 = TINCTURE_HEX[(t1 || '').toLowerCase()] || '#888888';
  const h2 = TINCTURE_HEX[(t2 || '').toLowerCase()] || '#888888';
  const l1 = getLuminance(h1);
  const l2 = getLuminance(h2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function enforceColourWheelContrast(tincture1, tincture2) {
  const ratio = getContrastRatio(tincture1, tincture2);
  if (ratio >= 3.5) return tincture2; // High contrast — keep original

  // Step around the colour wheel to the nearest complementary metal/tincture
  const t1Low = (tincture1 || 'sable').toLowerCase();
  if (['sable', 'azure', 'gules', 'vert', 'purpure'].includes(t1Low)) {
    return t1Low === 'sable' ? 'or' : 'argent';
  }
  return 'sable';
}

function tincture(name) {
  const all = { ...TINCTURES.metals, ...TINCTURES.colours };
  return all[name]?.colour ?? '#888888';
}

function tinctureFill(name, uniqueId) {
  const t = (name ?? 'argent').toLowerCase();
  if (t === 'or') return `url(#grad-or-${uniqueId})`;
  if (t === 'argent') return `url(#grad-argent-${uniqueId})`;
  if (t === 'gules') return `url(#grad-gules-${uniqueId})`;
  if (t === 'azure') return `url(#grad-azure-${uniqueId})`;
  if (t === 'sable') return `url(#grad-sable-${uniqueId})`;
  if (t === 'vert') return `url(#grad-vert-${uniqueId})`;
  if (t === 'purpure') return `url(#grad-purpure-${uniqueId})`;
  return tincture(t);
}

function renderDefs(uniqueId) {
  return `
    <!-- 3D Tincture Gradients -->
    <linearGradient id="grad-or-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE875" />
      <stop offset="40%" stop-color="#FFD700" />
      <stop offset="75%" stop-color="#C59B27" />
      <stop offset="100%" stop-color="#805A00" />
    </linearGradient>

    <linearGradient id="grad-argent-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#E0E6ED" />
      <stop offset="80%" stop-color="#B0BCCB" />
      <stop offset="100%" stop-color="#7B8898" />
    </linearGradient>

    <linearGradient id="grad-gules-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E62E3D" />
      <stop offset="45%" stop-color="#CE1126" />
      <stop offset="80%" stop-color="#8B0000" />
      <stop offset="100%" stop-color="#4A0000" />
    </linearGradient>

    <linearGradient id="grad-azure-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2B6CB0" />
      <stop offset="45%" stop-color="#0032A0" />
      <stop offset="80%" stop-color="#001F66" />
      <stop offset="100%" stop-color="#000D33" />
    </linearGradient>

    <linearGradient id="grad-sable-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3A3A3C" />
      <stop offset="45%" stop-color="#1A1A1A" />
      <stop offset="85%" stop-color="#0D0D0E" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>

    <linearGradient id="grad-vert-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2E8B57" />
      <stop offset="45%" stop-color="#006B3D" />
      <stop offset="80%" stop-color="#004020" />
      <stop offset="100%" stop-color="#002010" />
    </linearGradient>

    <linearGradient id="grad-purpure-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#800080" />
      <stop offset="45%" stop-color="#550055" />
      <stop offset="80%" stop-color="#330033" />
      <stop offset="100%" stop-color="#1A001A" />
    </linearGradient>

    <!-- Gold Leaf Emboss Filter -->
    <filter id="gold-emboss-${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.8"/>
    </filter>

    <!-- Shield Plate Inner Shadow -->
    <filter id="shield-shadow-${uniqueId}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  `;
}

function renderField(spec, uniqueId) {
  const div = spec.field?.division ?? 'plain';
  const t1 = tinctureFill(spec.field?.tincture ?? 'argent', uniqueId);
  const t2 = tinctureFill(spec.field?.secondary_tincture ?? 'gules', uniqueId);
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
  return `<rect x="${-hw}" y="0" width="${w}" height="${h}" fill="${t1}" />`;
}

function chargePosition(pos, index, total) {
  const hw = SHIELD_WIDTH / 2; // 100
  const positions = {
    centre: [0, 105],
    dexter: [-hw * 0.42, 105],
    sinister: [hw * 0.42, 105],
    chief: [0, 55],
    base: [0, 155],
    dexter_chief: [-hw * 0.38, 55],
    sinister_chief: [hw * 0.38, 55],
    dexter_base: [-hw * 0.25, 148],
    sinister_base: [hw * 0.25, 148]
  };
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

// Vector-crafted heraldic charge shapes
function renderCharge(charge, index, total, uniqueId) {
  const [cx, cy] = chargePosition(charge.position, index, total);
  const col = tinctureFill(charge.tincture ?? 'or', uniqueId);
  const baseSize = total === 1 ? 44 : total === 2 ? 38 : 34;
  const sz = charge.size ?? baseSize;
  const id = charge.id ?? 'lion_rampant';

  const g = (inner) => `<g transform="translate(${cx},${cy})" filter="url(#gold-emboss-${uniqueId})">${inner}</g>`;

  if (id === 'lion_rampant') {
    return g(`
      <path d="M 0,0 C -${sz*0.15},-${sz*0.2} -${sz*0.1},-${sz*0.4} 0,-${sz*0.42} C ${sz*0.15},-${sz*0.42} ${sz*0.2},-${sz*0.25} ${sz*0.1},0 C ${sz*0.25},${sz*0.1} ${sz*0.2},${sz*0.35} 0,${sz*0.42} Z" fill="${col}"/>
      <circle cx="-${sz*0.05}" cy="-${sz*0.3}" r="${sz*0.11}" fill="${col}"/>
      <path d="M -${sz*0.15},-${sz*0.3} L -${sz*0.35},-${sz*0.33} L -${sz*0.25},-${sz*0.24} Z" fill="${col}"/>
      <path d="M -${sz*0.1},-${sz*0.15} L -${sz*0.35},-${sz*0.25} M -${sz*0.05},-${sz*0.1} L -${sz*0.3},-${sz*0.15}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M 0,${sz*0.2} L -${sz*0.25},${sz*0.42} M ${sz*0.08},${sz*0.2} L ${sz*0.2},${sz*0.4}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M ${sz*0.05},${sz*0.25} Q ${sz*0.38},${sz*0.15} ${sz*0.35},-${sz*0.2} C ${sz*0.32},-${sz*0.3} ${sz*0.42},-${sz*0.35} ${sz*0.38},-${sz*0.25}" fill="none" stroke="${col}" stroke-width="${sz*0.06}"/>
    `);
  }

  if (id === 'lion_passant') {
    return g(`
      <ellipse cx="0" cy="0" rx="${sz*0.35}" ry="${sz*0.18}" fill="${col}"/>
      <circle cx="-${sz*0.28}" cy="-${sz*0.13}" r="${sz*0.13}" fill="${col}"/>
      <path d="M -${sz*0.2},${sz*0.05} L -${sz*0.35},${sz*0.2} M -${sz*0.1},${sz*0.05} L -${sz*0.15},${sz*0.3} M ${sz*0.1},${sz*0.05} L ${sz*0.1},${sz*0.3} M ${sz*0.25},${sz*0.05} L ${sz*0.3},${sz*0.3}" stroke="${col}" stroke-width="${sz*0.07}" stroke-linecap="round"/>
      <path d="M ${sz*0.325},0 Q ${sz*0.48},-${sz*0.25} ${sz*0.4},-${sz*0.4}" fill="none" stroke="${col}" stroke-width="${sz*0.06}"/>
    `);
  }

  if (id === 'eagle_displayed') {
    return g(`
      <ellipse cx="0" cy="0" rx="${sz*0.12}" ry="${sz*0.25}" fill="${col}"/>
      <polygon points="0,${sz*0.1} -${sz*0.15},${sz*0.38} ${sz*0.15},${sz*0.38}" fill="${col}"/>
      <path d="M -${sz*0.1},-${sz*0.1} C -${sz*0.3},-${sz*0.38} -${sz*0.45},-${sz*0.42} -${sz*0.48},-${sz*0.22} C -${sz*0.4},-${sz*0.08} -${sz*0.25},${sz*0.08} -${sz*0.08},${sz*0.1} Z" fill="${col}"/>
      <path d="M ${sz*0.1},-${sz*0.1} C ${sz*0.3},-${sz*0.38} ${sz*0.45},-${sz*0.42} ${sz*0.48},-${sz*0.22} C ${sz*0.4},-${sz*0.08} ${sz*0.25},${sz*0.08} ${sz*0.08},${sz*0.1} Z" fill="${col}"/>
      <circle cx="-${sz*0.08}" cy="-${sz*0.28}" r="${sz*0.09}" fill="${col}"/>
      <path d="M -${sz*0.15},-${sz*0.28} L -${sz*0.26},-${sz*0.24} L -${sz*0.15},-${sz*0.2} Z" fill="${col}"/>
    `);
  }

  if (id === 'castle' || id === 'tower') {
    return g(`
      <rect x="-${sz*0.38}" y="-${sz*0.15}" width="${sz*0.76}" height="${sz*0.5}" fill="${col}"/>
      <rect x="-${sz*0.38}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <rect x="-${sz*0.1}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <rect x="${sz*0.18}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.35}" fill="${col}"/>
      <path d="M -${sz*0.12},${sz*0.35} A ${sz*0.12} ${sz*0.15} 0 0 1 ${sz*0.12},${sz*0.35} V ${sz*0.1} H -${sz*0.12} Z" fill="#1a1008"/>
    `);
  }

  if (id === 'sword') {
    return g(`
      <polygon points="0,-${sz*0.42} -${sz*0.05},-${sz*0.32} -${sz*0.04},${sz*0.2} ${sz*0.04},${sz*0.2} ${sz*0.05},-${sz*0.32}" fill="${col}"/>
      <rect x="-${sz*0.22}" y="${sz*0.2}" width="${sz*0.44}" height="${sz*0.07}" fill="${col}" rx="1"/>
      <rect x="-${sz*0.035}" y="${sz*0.27}" width="${sz*0.07}" height="${sz*0.12}" fill="${col}"/>
      <circle cx="0" cy="${sz*0.43}" r="${sz*0.055}" fill="${col}"/>
    `);
  }

  if (id === 'crown') {
    return g(`
      <rect x="-${sz*0.4}" y="${sz*0.08}" width="${sz*0.8}" height="${sz*0.25}" fill="${col}" rx="2"/>
      <polygon points="-${sz*0.4},${sz*0.08} -${sz*0.4},-${sz*0.26} -${sz*0.22},-${sz*0.08} 0,-${sz*0.32} ${sz*0.22},-${sz*0.08} ${sz*0.4},-${sz*0.26} ${sz*0.4},${sz*0.08}" fill="${col}"/>
      <circle cx="-${sz*0.4}" cy="-${sz*0.29}" r="${sz*0.04}" fill="${col}"/>
      <circle cx="0" cy="-${sz*0.35}" r="${sz*0.05}" fill="${col}"/>
      <circle cx="${sz*0.4}" cy="-${sz*0.29}" r="${sz*0.04}" fill="${col}"/>
    `);
  }

  if (id === 'key') {
    return g(`
      <circle cx="0" cy="-${sz*0.24}" r="${sz*0.16}" fill="none" stroke="${col}" stroke-width="${sz*0.08}"/>
      <rect x="-${sz*0.04}" y="-${sz*0.08}" width="${sz*0.08}" height="${sz*0.48}" fill="${col}" rx="1"/>
      <rect x="0" y="${sz*0.18}" width="${sz*0.15}" height="${sz*0.06}" fill="${col}"/>
      <rect x="0" y="${sz*0.3}" width="${sz*0.12}" height="${sz*0.06}" fill="${col}"/>
    `);
  }

  if (id === 'hammer') {
    return g(`
      <rect x="-${sz*0.3}" y="-${sz*0.28}" width="${sz*0.6}" height="${sz*0.24}" fill="${col}" rx="2"/>
      <rect x="-${sz*0.055}" y="-${sz*0.04}" width="${sz*0.11}" height="${sz*0.44}" fill="${col}" rx="2"/>
    `);
  }

  if (id === 'wheel') {
    return g(`
      <circle cx="0" cy="0" r="${sz*0.4}" fill="none" stroke="${col}" stroke-width="${sz*0.09}"/>
      <circle cx="0" cy="0" r="${sz*0.1}" fill="${col}"/>
      ${[0,45,90,135].map(a => {
        const r = a * Math.PI / 180;
        const x1 = Math.cos(r) * sz*0.1; const y1 = Math.sin(r) * sz*0.1;
        const x2 = Math.cos(r) * sz*0.38; const y2 = Math.sin(r) * sz*0.38;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${sz*0.07}"/>
                <line x1="${-x1}" y1="${-y1}" x2="${-x2}" y2="${-y2}" stroke="${col}" stroke-width="${sz*0.07}"/>`;
      }).join('')}
    `);
  }

  if (id === 'anchor') {
    return g(`
      <circle cx="0" cy="-${sz*0.28}" r="${sz*0.11}" fill="none" stroke="${col}" stroke-width="${sz*0.07}"/>
      <rect x="-${sz*0.04}" y="-${sz*0.17}" width="${sz*0.08}" height="${sz*0.58}" fill="${col}" rx="1"/>
      <rect x="-${sz*0.28}" y="-${sz*0.15}" width="${sz*0.56}" height="${sz*0.07}" fill="${col}"/>
      <path d="M -${sz*0.28},${sz*0.38} Q -${sz*0.35},${sz*0.5} 0,${sz*0.46} Q ${sz*0.35},${sz*0.5} ${sz*0.28},${sz*0.38}" fill="none" stroke="${col}" stroke-width="${sz*0.08}"/>
    `);
  }

  if (id === 'fleur_de_lis') {
    return g(`
      <path d="M 0,-${sz*0.4} C ${sz*0.1},-${sz*0.2} ${sz*0.2},-${sz*0.1} ${sz*0.08},${sz*0.3} L -${sz*0.08},${sz*0.3} C -${sz*0.2},-${sz*0.1} -${sz*0.1},-${sz*0.2} 0,-${sz*0.4} Z" fill="${col}"/>
      <path d="M -${sz*0.05},-${sz*0.05} C -${sz*0.25},-${sz*0.2} -${sz*0.45},-${sz*0.05} -${sz*0.28},${sz*0.15} C -${sz*0.15},${sz*0.15} -${sz*0.08},0 -${sz*0.05},-${sz*0.05} Z" fill="${col}"/>
      <path d="M ${sz*0.05},-${sz*0.05} C ${sz*0.25},-${sz*0.2} ${sz*0.45},-${sz*0.05} ${sz*0.28},${sz*0.15} C ${sz*0.15},${sz*0.15} ${sz*0.08},0 ${sz*0.05},-${sz*0.05} Z" fill="${col}"/>
      <rect x="-${sz*0.14}" y="${sz*0.02}" width="${sz*0.28}" height="${sz*0.07}" fill="${col}" rx="1"/>
    `);
  }

  if (id === 'flame') {
    return g(`
      <path d="M 0,-${sz*0.42} Q ${sz*0.25},-${sz*0.15} ${sz*0.2},${sz*0.2} Q ${sz*0.1},${sz*0.42} 0,${sz*0.38} Q -${sz*0.1},${sz*0.42} -${sz*0.2},${sz*0.2} Q -${sz*0.25},-${sz*0.15} 0,-${sz*0.42} Z" fill="${col}"/>
      <path d="M 0,-${sz*0.22} Q ${sz*0.12},-${sz*0.05} ${sz*0.1},${sz*0.15} Q 0,${sz*0.28} -${sz*0.1},${sz*0.15} Q -${sz*0.12},-${sz*0.05} 0,-${sz*0.22} Z" fill="#FFD700"/>
    `);
  }

  if (id === 'star') {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const outer = (i * 72 - 90) * Math.PI / 180;
      const inner = ((i * 72) + 36 - 90) * Math.PI / 180;
      pts.push(`${Math.cos(outer)*sz*0.42},${Math.sin(outer)*sz*0.42}`);
      pts.push(`${Math.cos(inner)*sz*0.18},${Math.sin(inner)*sz*0.18}`);
    }
    return g(`<polygon points="${pts.join(' ')}" fill="${col}"/>`);
  }

  if (id === 'cross_charge') {
    return g(`
      <rect x="-${sz*0.1}" y="-${sz*0.4}" width="${sz*0.2}" height="${sz*0.8}" fill="${col}"/>
      <rect x="-${sz*0.4}" y="-${sz*0.1}" width="${sz*0.8}" height="${sz*0.2}" fill="${col}"/>
    `);
  }

  if (id === 'serpent') {
    return g(`
      <path d="M -${sz*0.2},${sz*0.28} C -${sz*0.4},${sz*0.1} 0,-${sz*0.1} -${sz*0.1},-${sz*0.25} C -${sz*0.15},-${sz*0.35} ${sz*0.15},-${sz*0.4} ${sz*0.2},-${sz*0.25} C ${sz*0.25},-${sz*0.1} -${sz*0.15},${sz*0.1} 0,${sz*0.28}" fill="none" stroke="${col}" stroke-width="${sz*0.09}" stroke-linecap="round"/>
      <circle cx="${sz*0.2}" cy="-${sz*0.25}" r="${sz*0.07}" fill="${col}"/>
    `);
  }

  if (id === 'hand') {
    return g(`
      <rect x="-${sz*0.14}" y="-${sz*0.05}" width="${sz*0.28}" height="${sz*0.35}" fill="${col}" rx="3"/>
      <rect x="-${sz*0.14}" y="-${sz*0.38}" width="${sz*0.06}" height="${sz*0.35}" fill="${col}" rx="2"/>
      <rect x="-${sz*0.06}" y="-${sz*0.42}" width="${sz*0.06}" height="${sz*0.39}" fill="${col}" rx="2"/>
      <rect x="${sz*0.02}" y="-${sz*0.38}" width="${sz*0.06}" height="${sz*0.35}" fill="${col}" rx="2"/>
      <rect x="${sz*0.1}" y="-${sz*0.32}" width="${sz*0.05}" height="${sz*0.29}" fill="${col}" rx="2"/>
    `);
  }

  return g(`
    <circle cx="0" cy="0" r="${sz*0.32}" fill="${col}" opacity="0.8"/>
    <text text-anchor="middle" dominant-baseline="central" font-size="${sz*0.26}" fill="${tincture(charge.tincture === 'or' ? 'sable' : 'or')}" font-family="Georgia,serif">${id.charAt(0).toUpperCase()}</text>
  `);
}

function renderMotto(motto, translation, uniqueId) {
  if (!motto) return '';
  const y = SHIELD_HEIGHT + 24;
  const esc = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `
    <g transform="translate(0, ${y})">
      <path d="M -${SHIELD_WIDTH/2 + 6},-2 L -${SHIELD_WIDTH/2 - 4},-14 L -${SHIELD_WIDTH/2 - 4},14 Z" fill="#805A00"/>
      <path d="M ${SHIELD_WIDTH/2 + 6},-2 L ${SHIELD_WIDTH/2 - 4},-14 L ${SHIELD_WIDTH/2 - 4},14 Z" fill="#805A00"/>
      <rect x="-${SHIELD_WIDTH/2}" y="-13" width="${SHIELD_WIDTH}" height="26" rx="4" fill="url(#grad-sable-${uniqueId})" stroke="url(#grad-or-${uniqueId})" stroke-width="1.6" filter="url(#gold-emboss-${uniqueId})"/>
      <text text-anchor="middle" dominant-baseline="central" y="0"
        font-family="'Cinzel', Palatino, serif" font-size="11.5" font-weight="700"
        fill="url(#grad-or-${uniqueId})" letter-spacing="1">${esc(motto)}</text>
    </g>
    ${translation ? `<text x="0" y="${y + 24}" text-anchor="middle"
      font-family="'EB Garamond', Georgia, serif" font-size="9.5" fill="#a08040" font-style="italic"
      dominant-baseline="hanging">${esc(translation)}</text>` : ''}`;
}

function renderSpec(spec) {
  const charges = spec.charges ?? [];
  const uniqueId = Math.random().toString(36).slice(2, 7);
  const clipId = `shield-clip-${uniqueId}`;
  const cx = SVG_WIDTH / 2; // 120
  const cy = 20;

  const defsSvg = renderDefs(uniqueId);
  const fieldSvg = renderField(spec, uniqueId);
  const chargesSvg = charges.map((c, i) => renderCharge(c, i, charges.length, uniqueId)).join('\n');
  const mottoSvg = renderMotto(spec.motto, spec.motto_translation, uniqueId);

  return `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
  width="${SVG_WIDTH}" height="${SVG_HEIGHT}">

  <defs>
    ${defsSvg}
    <clipPath id="${clipId}">
      <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"/>
    </clipPath>
  </defs>

  <!-- Outer Drop Shadow -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="#00000044" filter="url(#shield-shadow-${uniqueId})"/>

  <!-- Field & Charges (Clipped to shield shape in absolute 1-to-1 viewBox space) -->
  <g clip-path="url(#${clipId})">
    <g transform="translate(${cx}, ${cy})">
      ${fieldSvg}
    </g>
    <g transform="translate(${cx}, ${cy})">
      ${chargesSvg}
    </g>
  </g>

  <!-- Embossed Gold & Metal Shield Rim -->
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="none" stroke="url(#grad-or-${uniqueId})" stroke-width="4.5" filter="url(#gold-emboss-${uniqueId})"/>
  <path d="${shieldPath()}" transform="translate(${cx}, ${cy})"
    fill="none" stroke="#2a1a00" stroke-width="1.2"/>

  <!-- Motto Scroll -->
  <g transform="translate(${cx}, ${cy})">
    ${mottoSvg}
  </g>

</svg>`;
}

module.exports = { renderSpec, shieldPath, renderField, renderCharge, tincture, chargePosition };
