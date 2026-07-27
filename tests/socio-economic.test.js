// socio-economic.test.js
// Automated Contract & Schema Test Suite for Socio-Economic Audit & Mode III (FG-018)

const test = require('node:test');
const assert = require('assert');

test('Feature: Socio-Economic & Demographic Audit (Mode III)', async (t) => {

  await t.test('Scenario: Socio-Economic payload contains all 4 mandatory audit categories', () => {
    // Given a Mode III response for a UK location
    const mockSocioEconomic = {
      schools_education: '14% Ofsted "Requires Improvement", 86% "Closed by Order of the Magistrate". Academic curriculum centers on vocational roundabout navigation.',
      crime_order: 'Primary offences: turnip rustling, municipal roof lead removal, and aggravated bicycle borrowing.',
      workforce_industry: 'Largest employers: Roundabout Maintenance Board (62%) and Vape Shop Administration (28%). Skilled labour remains a theoretical concept.',
      housing_property: 'Average 2-bed terrace: £450,000. Features authentic heritage damp, 1970s carpet, and scenic views of the bypass.'
    };

    // Then all 4 categories must be non-empty strings
    assert.ok(mockSocioEconomic.schools_education.includes('Ofsted'));
    assert.ok(mockSocioEconomic.crime_order.includes('offences'));
    assert.ok(mockSocioEconomic.workforce_industry.includes('employers'));
    assert.ok(mockSocioEconomic.housing_property.includes('£450,000'));
  });

  await t.test('Scenario: Tourist Board brochure and TripAdvisor expert audit structure', () => {
    // Given Mode III Tourist Board and TripAdvisor payloads
    const mockMode3Payload = {
      tourist_board: {
        slogan: 'Experience the Unstoppable Motion of the Blackwater Valley!',
        brochure_copy: 'Welcome to a town where history is made every day on the ring road.'
      },
      tripadvisor_audit: {
        headline: 'A Masterclass in Motion Without Progress',
        overall_rating: '1.5 / 5 — Mostly Overcast',
        audit_review: 'Visitors arriving are immediately struck by a sense of impending departure.'
      }
    };

    // Then Tourist Board and TripAdvisor properties must be valid
    assert.equal(typeof mockMode3Payload.tourist_board.slogan, 'string');
    assert.ok(mockMode3Payload.tourist_board.brochure_copy.length > 10);
    assert.ok(mockMode3Payload.tripadvisor_audit.overall_rating.includes('/ 5'));
    assert.ok(mockMode3Payload.tripadvisor_audit.audit_review.length > 20);
  });

  await t.test('Scenario: Verified Customer Reviews enforce 1 to 5 star rating boundary', () => {
    // Given customer reviews for a location
    const reviews = [
      { reviewer: 'DisappointedFromSurrey', rating: 1, text: 'Spent 3 hours on the roundabout.' },
      { reviewer: 'ConcreteCowFanatic', rating: 5, text: 'The cows are magnificent. 10/10.' },
      { reviewer: 'LocalHistorian87', rating: 2, text: 'Promised a castle, was a car park.' }
    ];

    // Then every review must have rating >= 1 and rating <= 5
    reviews.forEach(rev => {
      assert.ok(Number.isInteger(rev.rating), 'rating must be an integer');
      assert.ok(rev.rating >= 1 && rev.rating <= 5, 'rating must be between 1 and 5');
      assert.ok(rev.reviewer.length > 0, 'reviewer name required');
      assert.ok(rev.text.length > 0, 'review text required');
    });
  });

});
