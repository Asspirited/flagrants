# PACT Consumer-Driven Contract & Thin UI Testing Architecture

Living Reference Document for Flagrants and the Asspirited Estate.
Last Updated: 2026-07-28

---

## 🎯 Core Testing Principles (10–100 User Scale)

1. **Zero E2E Browser Testing Rule:**
   * Do NOT use Selenium, Cypress, Playwright, or heavy browser automation binaries.
   * Reason: E2E tests are slow, flaky, brittle, and expensive to maintain.

2. **Consumer-Driven Contract Testing (PACT-Style):**
   * Establish strict executable PACT contracts between Provider (`code/worker.js`) and Consumer (Client UI).
   * Test payload schema guarantees on the server side (`validateSpec()`) so the UI receives 100% compliant data.

3. **Thin, Logic-Free UI View Testing:**
   * Keep zero business logic in HTML/CSS/JS view templates.
   * Test UI DOM elements for ID presence, clean binding, and correct rendering without executing business calculations in the UI layer.

4. **Target Metrics:**
   * Total Test Suite: ~45–60 Core Tests
   * Execution Duration: < 500ms
   * Determinism: 100% (No network calls to live LLMs in automated unit tests).
