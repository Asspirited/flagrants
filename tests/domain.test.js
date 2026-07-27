// domain.test.js — unit tests for pure renderer logic
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { renderSpec, tincture, shieldPath } = require('../src/logic/svg-renderer.js');

describe('tincture()', () => {
  it('returns correct colour for Or', () => {
    assert.equal(tincture('or'), '#FFD700');
  });
  it('returns correct colour for Gules', () => {
    assert.equal(tincture('gules'), '#CE1126');
  });
  it('returns correct colour for Sable', () => {
    assert.equal(tincture('sable'), '#1C1C1C');
  });
  it('returns fallback for unknown tincture', () => {
    assert.equal(tincture('invisible'), '#888888');
  });
});

describe('shieldPath()', () => {
  it('returns a non-empty SVG path string', () => {
    const path = shieldPath();
    assert.ok(path.startsWith('M '));
    assert.ok(path.endsWith('Z'));
  });
});

describe('renderSpec()', () => {
  it('returns a valid SVG string for a plain field', () => {
    const spec = {
      field: { tincture: 'gules', division: 'plain' },
      charges: [],
      motto: 'In absentia veritas'
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('<svg'));
    assert.ok(svg.includes('</svg>'));
    assert.ok(svg.includes('#CE1126')); // gules
    assert.ok(svg.includes('In absentia veritas'));
  });

  it('renders per_pale division with two tinctures', () => {
    const spec = {
      field: { tincture: 'azure', division: 'per_pale', secondary_tincture: 'or' },
      charges: []
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('#0032A0')); // azure
    assert.ok(svg.includes('#FFD700')); // or
  });

  it('renders quarterly division', () => {
    const spec = {
      field: { tincture: 'gules', division: 'quarterly', secondary_tincture: 'argent' },
      charges: []
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('#CE1126')); // gules
    assert.ok(svg.includes('#FFFFFF')); // argent
  });

  it('renders a charge at centre position', () => {
    const spec = {
      field: { tincture: 'azure', division: 'plain' },
      charges: [{ id: 'cross_charge', tincture: 'argent', position: 'centre' }]
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('#FFFFFF')); // argent charge
  });

  it('renders multiple charges without error', () => {
    const spec = {
      field: { tincture: 'sable', division: 'plain' },
      charges: [
        { id: 'sword', tincture: 'or', position: 'dexter' },
        { id: 'key', tincture: 'argent', position: 'sinister' }
      ]
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('<svg'));
  });

  it('renders motto and translation', () => {
    const spec = {
      field: { tincture: 'vert', division: 'plain' },
      charges: [],
      motto: 'Magis quam apparet',
      motto_translation: 'More than it appears'
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('Magis quam apparet'));
    assert.ok(svg.includes('More than it appears'));
  });

  it('escapes XML special characters in motto', () => {
    const spec = {
      field: { tincture: 'gules', division: 'plain' },
      charges: [],
      motto: 'Truth & Consequences'
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('Truth &amp; Consequences'));
    assert.ok(!svg.includes('Truth & Consequences'));
  });
});
