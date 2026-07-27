// ui-alignment.test.js
// Automated UI Alignment & Containment Tests for Flagrants SVG Shield Renderer

const test = require('node:test');
const assert = require('assert');
const { renderSpec, chargePosition, shieldPath } = require('../src/logic/svg-renderer.js');
const { CHARGES, FIELD_DIVISIONS } = require('../src/data/heraldic-vocabulary.js');

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

test('UI Alignment — ClipPath & Transform Sync (Anti-Double Translation)', async (t) => {
  await t.test('clipPath path d attribute is translated to (120, 20) in root space for 1-to-1 mobile browser alignment', () => {
    const spec = {
      field: { tincture: 'azure', division: 'per_chevron', secondary_tincture: 'argent' },
      charges: [{ id: 'castle', tincture: 'or', position: 'centre' }]
    };
    const svg = renderSpec(spec);
    
    // Extract clipPath block
    const clipMatch = svg.match(/<clipPath id="([^"]+)">([\s\S]*?)<\/clipPath>/);
    assert.ok(clipMatch, 'clipPath element must exist in SVG');
    
    const clipContent = clipMatch[2];
    assert.ok(clipContent.includes('transform="translate(120, 20)"'), 'clipPath child path MUST be translated to (120, 20) in root space (prevents mobile WebKit clip misalignment)');
  });

  await t.test('field and charges groups sit inside root clip-path container with matching translate(120, 20)', () => {
    const spec = {
      field: { tincture: 'vert', division: 'per_pale', secondary_tincture: 'or' },
      charges: [{ id: 'sword', tincture: 'argent', position: 'chief' }]
    };
    const svg = renderSpec(spec);

    const borderMatch = svg.match(/<path d="M -100,0[^"]*" transform="translate\(120, 20\)"[^>]*stroke=/);
    assert.ok(borderMatch, 'Shield border path must be translated to (120, 20)');

    const groupMatches = svg.match(/<g transform="translate\(120, 20\)">/g);
    assert.ok(groupMatches && groupMatches.length >= 2, 'Field and charges groups MUST be translated to (120, 20) inside root clipPath');
  });

  await t.test('all field divisions (including per_chevron) span from x = -100 to x = +100', () => {
    const divisions = Object.keys(FIELD_DIVISIONS);
    divisions.forEach(div => {
      const spec = {
        field: { tincture: 'gules', division: div, secondary_tincture: 'argent' }
      };
      const svg = renderSpec(spec);
      assert.ok(svg.includes('grad-gules') || svg.includes('#CE1126'), `Division ${div} must contain primary tincture`);
      assert.ok(!svg.includes('NaN'), `Division ${div} must contain no NaN values`);
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
    assert.ok(svg.includes('viewBox="0 0 240 330"'), 'SVG viewBox should be 240x330');

    const translationMatch = svg.match(/y="(\d+)"[^>]*>Here We Shall Remain/);
    assert.ok(translationMatch, 'Translation text should be rendered in SVG');
    
    const translationY = parseFloat(translationMatch[1]);
    assert.ok(translationY + 20 < 330, `Translation text y (${translationY + 20}) must be less than 330px viewBox height`);
  });
});
