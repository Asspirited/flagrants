const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

// Load worker functions
const workerPath = path.join(__dirname, '..', 'code', 'worker.js');
const workerCode = fs.readFileSync(workerPath, 'utf8');

// Simple eval harness to get validateSpec
let validateSpec;
try {
  const context = { console, Math, Array, Object, parseInt };
  const fn = new Function('context', `
    ${workerCode.slice(0, workerCode.indexOf('export default'))}
    return validateSpec;
  `);
  validateSpec = fn(context);
} catch (e) {
  // Fallback testing stub
  validateSpec = (s) => s;
}

test('BDD Scenario: Mode III Server-Side JSON Repair Pipe', () => {
  const rawPayload = {
    mode: 'mode3',
    touristBoard: { headline: 'Welcome to the Ring Road' },
    tripadvisor: { rating: '2.0/5' },
    reviews: [{ name: 'Dave', text: 'Stuck on bypass' }],
    socioEconomic: { schools: 'Closed by Police Order' }
  };

  const spec = validateSpec(rawPayload);

  assert.ok(spec.tourist_board.brochure_copy, 'tourist_board.brochure_copy must be populated');
  assert.ok(spec.tripadvisor_audit.audit_review, 'tripadvisor_audit.audit_review must be populated');
  assert.equal(spec.customer_reviews.length, 3, 'customer_reviews must contain 3 items');
  assert.ok(spec.socio_economic.schools_education, 'socio_economic.schools_education must be populated');
});
