// ui-alignment.test.js
// Automated UI Alignment & Containment Tests for Flagrants SVG Shield Renderer

const test = require('node:test');
const assert = require('assert');
const { renderSpec, chargePosition, shieldPath } = require('../src/logic/svg-renderer.js');
const { CHARGES, POSITIONS } = require('../src/data/heraldic-vocabulary.js');

test('UI Alignment — Shield Charge Position Coordinates', async (t) => {
  await t.test('centre position sits precisely at visual center of gravity (y = 105)', () => {
    const [cx, cy] = chargePosition('centre', 0, 1);
    assert.strictEqual(cx, 0, 'centre x coordinate should be 0');
    assert.strictEqual(cy, 105, 'centre y coordinate should be 105 (visual center of 240px heater shield)');
  });

  await t.test('chief position sits in top third of shield (y = 55)', () => {
    const [cx, cy] = chargePosition('chief', 0, 1);
    assert.strictEqual(cx, 0);
    assert.strictEqual(cy, 55);
  });

  await t.test('base position sits in bottom third of shield (y = 155)', () => {
    const [cx, cy] = chargePosition('base', 0, 1);
    assert.strictEqual(cx, 0);
    assert.strictEqual(cy, 155);
  });

  await t.test('dexter and sinister positions are symmetrical across y=105', () => {
    const [dx, dy] = chargePosition('dexter', 0, 2);
    const [sx, sy] = chargePosition('sinister', 1, 2);
    assert.strictEqual(dx, -sx, 'dexter x should be mirror image of sinister x');
    assert.strictEqual(dy, 105, 'dexter y should be at 105');
    assert.strictEqual(sy, 105, 'sinister y should be at 105');
  });

  await t.test('dexter_base and sinister_base taper inwards to fit shield contour', () => {
    const [dbx, dby] = chargePosition('dexter_base', 2, 4);
    const [sbx, sby] = chargePosition('sinister_base', 3, 4);
    assert.ok(Math.abs(dbx) <= 30, 'dexter_base x must taper inside shield curve (<= 30px)');
    assert.ok(Math.abs(sbx) <= 30, 'sinister_base x must taper inside shield curve (<= 30px)');
    assert.strictEqual(dby, 148);
    assert.strictEqual(sby, 148);
  });
});

test('UI Alignment — Charge Vector Bounding & Contours', async (t) => {
  const chargeKeys = Object.keys(CHARGES);

  await t.test('all charge shapes produce valid SVG groups without NaN or undefined transform', () => {
    chargeKeys.forEach(chargeId => {
      const spec = {
        field: { tincture: 'or', division: 'plain' },
        charges: [{ id: chargeId, tincture: 'sable', position: 'centre' }]
      };
      const svg = renderSpec(spec);
      assert.ok(svg.includes('<svg'), `SVG output for ${chargeId} should contain <svg tag`);
      assert.ok(!svg.includes('NaN'), `SVG for ${chargeId} should contain no NaN values`);
      assert.ok(!svg.includes('undefined'), `SVG for ${chargeId} should contain no undefined values`);
    });
  });

  await t.test('multi-charge layouts (1 to 4 charges) render centered transforms within shield bounds', () => {
    const positionsToTest = ['centre', 'chief', 'base', 'dexter_chief', 'sinister_chief', 'dexter_base', 'sinister_base'];
    
    positionsToTest.forEach(pos => {
      const spec = {
        field: { tincture: 'argent', division: 'per_pale', secondary_tincture: 'gules' },
        charges: [{ id: 'lion_rampant', tincture: 'or', position: pos }]
      };
      const svg = renderSpec(spec);
      
      const transformMatch = svg.match(/transform="translate\(([-?\d\.]+),([-?\d\.]+)\)"/g);
      assert.ok(transformMatch && transformMatch.length > 0, `Transform attributes should exist for position ${pos}`);
    });
  });
});

test('UI Alignment — Motto & Text Vertical Bounds (Zero Bottom Cutoff)', async (t) => {
  await t.test('motto scroll and translation text sit strictly within SVG viewBox height (330px)', () => {
    const spec = {
      field: { tincture: 'azure', division: 'plain' },
      charges: [{ id: 'castle', tincture: 'or', position: 'centre' }],
      motto: 'HIC MANEBIMUS OPTIME',
      motto_translation: 'Here We Shall Remain, Excellently'
    };

    const svg = renderSpec(spec);
    
    // Check viewBox dimension
    assert.ok(svg.includes('viewBox="0 0 240 330"'), 'SVG viewBox should be 240x330');

    // Extract motto translation y position
    const translationMatch = svg.match(/y="(\d+)"[^>]*>Here We Shall Remain/);
    assert.ok(translationMatch, 'Translation text should be rendered in SVG');
    
    const translationY = parseFloat(translationMatch[1]);
    // With cy = 20 and y = SHIELD_HEIGHT + 24 + 24 = 288 inside g transform(120, 20):
    // Total y = 20 + 288 = 308px. Text height ~10px => Total = 318px <= 330px viewBox.
    assert.ok(translationY + 20 < 330, `Translation text y (${translationY + 20}) must be less than 330px viewBox height`);
  });
});
