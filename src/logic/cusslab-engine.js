// ── CussLab Character Engine (WoundDetector, TopicMagnets, LieLedger, ConspireEngine) ──

const TOPIC_MAGNETS = {
  coastal: ['sea-gale scampi', 'salt-crusted deckchair', 'runaway inflatable flamingo', 'abandoned beach piano', '3-inch cliff erosion'],
  industrial: ['subterranean sausage fermentation', 'disused railway arch', 'foundry steel crucible', 'shuttered market stall', '2am kebab rank'],
  celtic: ['highland haggis hunting', 'bog snorkelling', 'shortbread tin pricing', 'rain mizzle', 'bagpipe noise'],
  agricultural: ['cider barrel rustling', 'manure spreader sabotage', 'shin-kicking tournament', 'prize marrow', 'parish tub budget'],
  commuter: ['47-lap roundabout orbit', 'multi-storey car park ramp', '1970s brutalist subway', 'abstract £3.4m sculpture', 'vape shop concourse']
};

class WoundDetector {
  static detectSoreSpot(town, text) {
    const t = town.toLowerCase();
    if (/peacehaven|brighton|blackpool|seaside|coast/.test(t) && /erosion|seagull|deckchair|scampi/.test(text.toLowerCase())) {
      return { spot: 'Coastal Erosion & Sea-Gale Scampi Disasters', severity: 'CRITICAL' };
    }
    if (/basingstoke|bracknell|slough|newbury/.test(t) && /roundabout|car park|vape|sculpture/.test(text.toLowerCase())) {
      return { spot: '47-Lap Roundabout Traps & £3.4M Potholes', severity: 'HIGH' };
    }
    return { spot: 'Municipal Budget Irregularities', severity: 'MODERATE' };
  }
}

class TopicMagnets {
  static getMagnet(regionKey) {
    const pool = TOPIC_MAGNETS[regionKey] || TOPIC_MAGNETS.commuter;
    return pool[Math.floor(Math.random() * pool.length)];
  }
}

class LieLedger {
  constructor() {
    this.claims = [];
  }

  recordClaim(speaker, claim) {
    this.claims.push({ speaker, claim, timestamp: Date.now() });
  }

  auditClaims() {
    return this.claims.map(c => `⚠️ LIE AUDIT: ${c.speaker} claimed "${c.claim}" — Verified 0% truth.`);
  }
}

class ConspireEngine {
  static formAlliance(panelists, targetTown) {
    const p1 = panelists[0];
    const p2 = panelists[1];
    return `🤝 UNHOLY ALLIANCE: ${p1.name} and ${p2.name} have conspired to gang up against ${targetTown}!`;
  }
}

module.exports = {
  WoundDetector,
  TopicMagnets,
  LieLedger,
  ConspireEngine
};
