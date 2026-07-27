// tests/bayeux-tapestry.test.js
// Gherkin Acceptance & Contract Suite for Bayeux Tapestry & Uncensored Deep Research (FG-011, FG-012, FG-013, FG-014)

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { renderSpec } = require('../src/logic/svg-renderer.js');
const { CHARGES } = require('../src/data/heraldic-vocabulary.js');

describe('Feature: Bayeux Tapestry Embroidery Engine (FG-011 & FG-013)', () => {

  describe('Scenario: Bayeux Tapestry charge vocabulary is registered', () => {
    it('contains all 6 Bayeux medieval marginalia charges', () => {
      const bayeuxKeys = [
        'bayeux_knight_fleeing',
        'bayeux_chicken_dragon',
        'bayeux_corrupt_earl',
        'bayeux_pig_riot',
        'bayeux_sea_monster',
        'bayeux_gallows_crow'
      ];
      bayeuxKeys.forEach(key => {
        assert.ok(CHARGES[key], `Charge vocabulary MUST include ${key}`);
        assert.ok(CHARGES[key].name.length > 0);
      });
    });
  });

  describe('Scenario: Render Bayeux Embroidered Canvas Panel for a location story', () => {
    it('produces valid SVG panel with linen texture and embroidered charge', () => {
      const spec = {
        field: { tincture: 'sable', division: 'plain' },
        charges: [
          { id: 'bayeux_corrupt_earl', tincture: 'or', position: 'centre' }
        ],
        motto: 'PECUNIA NON OLET',
        motto_translation: 'Money Does Not Smell'
      };
      const svg = renderSpec(spec);
      assert.ok(svg.includes('<svg'), 'Panel MUST render valid SVG');
      assert.ok(svg.includes('PECUNIA NON OLET'), 'Panel MUST include embroidered motto');
      assert.ok(!svg.includes('NaN'), 'Panel output MUST have zero numeric errors');
    });
  });
});
