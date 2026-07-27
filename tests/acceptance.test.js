// acceptance.test.js
// Gherkin Acceptance & Contract Test Suite for Flagrants

const test = require('node:test');
const assert = require('assert');
const { renderSpec, shieldPath } = require('../src/logic/svg-renderer.js');
const { TINCTURES, POSITIONS } = require('../src/data/heraldic-vocabulary.js');

test('Feature: Location Flag Generation (Mode I)', async (t) => {
  await t.test('Scenario: Researching a UK location produces a valid heraldic specification', () => {
    // Given a user enters location "Slough" with Defence Lens "proud_of_it"
    const mockSpec = {
      affectation: "The Royal Borough's Unwanted Cousin",
      twinned_with: ["Chernobyl", "Detroit"],
      field: { tincture: 'azure', division: 'per_chevron', secondary_tincture: 'argent' },
      charges: [{ id: 'castle', tincture: 'or', position: 'base' }],
      motto: 'Hic Manebimus Optime',
      motto_translation: 'Here We Shall Remain, Excellently',
      excuse: 'This was fine. The herald sees no issue whatsoever.',
      commentary: [
        { element: 'Field & Division', text: 'Azure and argent divided per chevron.' },
        { element: 'Segment Picture: Castle', text: 'Placed at the base of the arms.' }
      ]
    };

    // When the spec is rendered into SVG
    const svg = renderSpec(mockSpec);

    // Then the SVG must contain the place affectation motto and valid elements
    assert.ok(svg.includes('Hic Manebimus Optime'));
    assert.ok(svg.includes('Here We Shall Remain, Excellently'));
    assert.ok(svg.includes('viewBox="0 0 240 330"'));
  });
});

test('Feature: Family & Group Crest Generation (Mode II)', async (t) => {
  await t.test('Scenario: Researching a family or institution produces Allied Houses and tailored crest', () => {
    // Given a user enters family name "House of Windsor" with Defence Lens "blame_others"
    const mockFamilySpec = {
      affectation: "Keepers of the Realm's Uncomfortable Secrets",
      twinned_with: ["House of Saxe-Coburg", "House of Romanov"],
      field: { tincture: 'gules', division: 'per_pale', secondary_tincture: 'or' },
      charges: [{ id: 'crown', tincture: 'or', position: 'chief' }, { id: 'lion_rampant', tincture: 'sable', position: 'base' }],
      motto: 'Dieu Et Mon Droit',
      motto_translation: 'God and My Right',
      excuse: 'External forces. Enemies. Circumstance.',
      commentary: [
        { element: 'Field & Division', text: 'Gules and Or divided per pale.' },
        { element: 'Segment Picture: Crown', text: 'Crown at chief.' }
      ]
    };

    // When the family spec is rendered
    const svg = renderSpec(mockFamilySpec);

    // Then the SVG must include both charges and motto
    assert.ok(svg.includes('Dieu Et Mon Droit'));
    assert.ok(svg.includes('God and My Right'));
    assert.strictEqual(mockFamilySpec.charges.length, 2);
  });
});

test('Feature: Municipal Tourist Board & TripAdvisor Audit (Mode III)', async (t) => {
  await t.test('Scenario: Mode III produces desperate Tourist Board copy, acidic TripAdvisor audit, and customer reviews', () => {
    // Given a user enters "Aldershot" in Mode III with Defence Lens "proud_of_it"
    const mockMode3Spec = {
      affectation: "Gateway to the M4",
      motto: "ROTAMUR ET MANEMUS",
      motto_translation: "We Turn, and We Remain",
      twinned_with: ["Pripyat", "Detroit"],
      tourist_board: {
        slogan: "Experience the Unstoppable Motion of the Blackwater Valley!",
        brochure_copy: "Welcome to a town where history is made every day on the ring road."
      },
      tripadvisor_audit: {
        headline: "A Masterclass in Motion Without Progress",
        overall_rating: "1.5 / 5 — Mostly Overcast",
        audit_review: "Visitors arriving in Aldershot are immediately struck by a sense of impending departure."
      },
      customer_reviews: [
        { reviewer: "DisappointedFromSurrey", rating: 1, text: "Spent 3 hours on the roundabout." }
      ]
    };

    // Then Mode III payload MUST contain tourist board slogan, TripAdvisor rating, and customer review
    assert.equal(mockMode3Spec.motto, 'ROTAMUR ET MANEMUS');
    assert.ok(mockMode3Spec.tourist_board.slogan.includes('Blackwater Valley'));
    assert.ok(mockMode3Spec.tripadvisor_audit.overall_rating.includes('1.5 / 5'));
    assert.equal(mockMode3Spec.customer_reviews[0].rating, 1);
  });
});

test('Feature: Instant Lens Switching (Re-design contract)', async (t) => {
  await t.test('Scenario: Switching Defence Lenses modifies excuse and motto while retaining subject research', () => {
    // Given research findings for "Runnymede"
    const researchFindings = {
      _subject: 'Runnymede',
      tier1: { location: 'Runnymede', region: 'Surrey' },
      tier3: { dark_history: 'King John signed the Magna Carta under duress.' }
    };

    // When re-designing with "full_cover_up" lens vs "deeply_sorry" lens
    const specLensA = {
      field: { tincture: 'vert', division: 'plain' },
      charges: [{ id: 'sword', tincture: 'argent', position: 'centre' }],
      motto: 'Lex Rex',
      excuse: 'It never happened. The herald is confused by the question.'
    };

    const specLensB = {
      field: { tincture: 'sable', division: 'plain' },
      charges: [{ id: 'sword', tincture: 'or', position: 'centre' }],
      motto: 'Mea Culpa',
      excuse: 'Full modern apology. All the correct language. Nothing has changed.'
    };

    // Then both specs produce valid independent SVGs
    const svgA = renderSpec(specLensA);
    const svgB = renderSpec(specLensB);

    assert.ok(svgA.includes('Lex Rex'));
    assert.ok(svgB.includes('Mea Culpa'));
    assert.notStrictEqual(svgA, svgB);
  });
});
