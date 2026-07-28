const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

// Consumer-Driven Contract (PACT) Test for Flagrants API Provider & UI Consumer
const workerPath = path.join(__dirname, '..', 'code', 'worker.js');
const workerCode = fs.readFileSync(workerPath, 'utf8');

// Extract validateSpec provider function from worker scope
let validateSpec;
try {
  const context = { console, Math, Array, Object, parseInt };
  const fn = new Function('context', `
    ${workerCode.slice(0, workerCode.indexOf('export default'))}
    return validateSpec;
  `);
  validateSpec = fn(context);
} catch (e) {
  validateSpec = (s) => s;
}

test('PACT Provider Contract — Mode I & II Crest Payload Schema', () => {
  const providerInput = {
    affectation: 'Gateway to the Bypass',
    motto: 'ROTAMUR ET MANEMUS',
    motto_translation: 'We Turn, and We Remain',
    twinned_with: ['Pripyat', 'Detroit'],
    charges: [{ id: 'bayeux_knight_fleeing', tincture: 'or', position: 'centre' }]
  };

  const spec = validateSpec(providerInput);

  // Assert Consumer Contract Expectations for Mode I/II UI
  assert.ok(typeof spec.affectation === 'string', 'PACT Contract: affectation must be string');
  assert.ok(typeof spec.motto === 'string', 'PACT Contract: motto must be string');
  assert.ok(Array.isArray(spec.twinned_with), 'PACT Contract: twinned_with must be array');
  assert.ok(Array.isArray(spec.charges), 'PACT Contract: charges must be array');
});

test('PACT Provider Contract — Mode III Municipal Audit Payload Schema', () => {
  const rawProviderOutput = {
    mode: 'mode3',
    tourist_board: { slogan: 'Discover Scenic Roundabouts', brochure_copy: 'Welcome to our ring road.' },
    tripadvisor_audit: { headline: 'Motion Without Destination', overall_rating: '1.5/5', audit_review: 'Scathing audit.' },
    customer_reviews: [{ reviewer: 'Visitor1', rating: 1, text: 'Disappointed.' }],
    socio_economic: { schools_education: 'Requires Improvement', crime_order: 'Turnip rustling' },
    excuse: 'Blame 1970s planners.'
  };

  const spec = validateSpec(rawProviderOutput);

  // Assert PACT Consumer Contract Schema
  assert.equal(typeof spec.tourist_board.slogan, 'string', 'PACT: tourist_board.slogan must be string');
  assert.equal(typeof spec.tourist_board.brochure_copy, 'string', 'PACT: tourist_board.brochure_copy must be string');

  assert.equal(typeof spec.tripadvisor_audit.headline, 'string', 'PACT: tripadvisor_audit.headline must be string');
  assert.equal(typeof spec.tripadvisor_audit.overall_rating, 'string', 'PACT: tripadvisor_audit.overall_rating must be string');
  assert.equal(typeof spec.tripadvisor_audit.audit_review, 'string', 'PACT: tripadvisor_audit.audit_review must be string');

  assert.equal(spec.customer_reviews.length, 3, 'PACT: customer_reviews MUST fulfill exactly 3 items');
  spec.customer_reviews.forEach(r => {
    assert.ok(r.reviewer, 'PACT: customer review item must contain reviewer');
    assert.ok(typeof r.rating === 'number', 'PACT: customer review item rating must be number');
    assert.ok(r.text, 'PACT: customer review item must contain text');
  });

  assert.equal(typeof spec.socio_economic.schools_education, 'string', 'PACT: socio_economic.schools_education must be string');
  assert.equal(typeof spec.socio_economic.crime_order, 'string', 'PACT: socio_economic.crime_order must be string');
  assert.equal(typeof spec.socio_economic.workforce_industry, 'string', 'PACT: socio_economic.workforce_industry must be string');
  assert.equal(typeof spec.socio_economic.housing_property, 'string', 'PACT: socio_economic.housing_property must be string');

  assert.equal(typeof spec.excuse, 'string', 'PACT: excuse must be string');
});
