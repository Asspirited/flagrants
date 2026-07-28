const test = require('node:test');
const assert = require('node:assert');
const { WoundDetector, TopicMagnets, LieLedger, ConspireEngine } = require('../src/logic/cusslab-engine.js');

test('CussLab Engine — WoundDetector detects municipal sore spots', () => {
  const wound = WoundDetector.detectSoreSpot('Peacehaven', 'Scampi sea-gale erosion');
  assert.strictEqual(wound.severity, 'CRITICAL');
  assert.strictEqual(wound.spot.includes('Coastal Erosion'), true);
});

test('CussLab Engine — TopicMagnets returns regional fixations', () => {
  const magnet = TopicMagnets.getMagnet('coastal');
  assert.strictEqual(typeof magnet, 'string');
  assert.strictEqual(magnet.length > 0, true);
});

test('CussLab Engine — LieLedger tracks and audits exaggerated claims', () => {
  const ledger = new LieLedger();
  ledger.recordClaim('Ray Mears', 'I built a bivouac out of 2 sun-bleached deckchairs');
  const audit = ledger.auditClaims();
  assert.strictEqual(audit.length, 1);
  assert.strictEqual(audit[0].includes('Ray Mears'), true);
});

test('CussLab Engine — ConspireEngine forms panelist alliances against target town', () => {
  const panelists = [{ name: 'Venerable Bede' }, { name: 'Steve Backshall' }];
  const alliance = ConspireEngine.formAlliance(panelists, 'Peacehaven');
  assert.strictEqual(alliance.includes('UNHOLY ALLIANCE'), true);
  assert.strictEqual(alliance.includes('Peacehaven'), true);
});
