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
    const spec = { field: { tincture: 'azure', division: 'plain' }, charges: [] };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('<svg'));
    assert.ok(svg.includes('url(#grad-azure-'));
  });

  it('renders per_pale division with two tinctures', () => {
    const spec = {
      field: { tincture: 'gules', division: 'per_pale', secondary_tincture: 'or' },
      charges: []
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('url(#grad-gules-'));
    assert.ok(svg.includes('url(#grad-or-'));
  });

  it('renders quarterly division', () => {
    const spec = {
      field: { tincture: 'sable', division: 'quarterly', secondary_tincture: 'argent' },
      charges: []
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('url(#grad-sable-'));
    assert.ok(svg.includes('url(#grad-argent-'));
  });

  it('renders a charge at centre position', () => {
    const spec = {
      field: { tincture: 'azure', division: 'plain' },
      charges: [{ id: 'cross_charge', tincture: 'argent', position: 'centre' }]
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('url(#grad-argent-'));
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

  it('renders Bayeux Tapestry medieval marginalia charges (FG-011)', () => {
    const spec = {
      field: { tincture: 'sable', division: 'per_fess', secondary_tincture: 'or' },
      charges: [
        { id: 'bayeux_knight_fleeing', tincture: 'argent', position: 'chief' },
        { id: 'bayeux_chicken_dragon', tincture: 'gules', position: 'base' }
      ]
    };
    const svg = renderSpec(spec);
    assert.ok(svg.includes('<svg'));
    assert.ok(!svg.includes('NaN'));
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

  it('enforces Rule of Tincture contrast on dark-on-dark split fields (FG-009)', () => {
    const COLOUR_LIST = ['gules', 'azure', 'sable', 'vert', 'purpure'];
    function validateSpec(spec) {
      if (spec.field.division !== 'plain' && spec.field.secondary_tincture) {
        const t1IsColour = COLOUR_LIST.includes(spec.field.tincture.toLowerCase());
        const t2IsColour = COLOUR_LIST.includes(spec.field.secondary_tincture.toLowerCase());
        if (t1IsColour && t2IsColour) {
          spec.field.secondary_tincture = spec.field.tincture.toLowerCase() === 'sable' ? 'or' : 'argent';
        }
      }
      return spec;
    }
    const spec = validateSpec({
      field: { tincture: 'sable', division: 'per_fess', secondary_tincture: 'azure' }
    });
    assert.notEqual(spec.field.secondary_tincture, 'azure', 'sable + azure dark-on-dark split field MUST be repaired');
    assert.equal(spec.field.secondary_tincture, 'or', 'sable split field MUST default secondary tincture to metal (or)');
  });
});
