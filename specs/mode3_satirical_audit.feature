Feature: Municipal Tourist Board & TripAdvisor Audit (Mode III)
  As a municipal satirist and citizen
  I want Mode III to synthesize all 7 Defence Lenses into 5 paper-form document cards
  So that official Tourist Board spin and TripAdvisor audits comedically contradict each other

  Background:
    Given the heraldic vocabulary has 7 tinctures, 8 divisions, and registered charges
    And the Mode III paper-form layout has 5 distinct document section cards

  Scenario: Synthesize Mode III audit payload with 4 Comedic Archetypes
    Given a UK location "Milton Keynes" with dark history and comedy seed
    When I request a Mode III blazon design
    Then the response payload MUST contain "tourist_board" with slogan and copy
    And the response payload MUST contain "tripadvisor_audit" with rating, headline, and audit review
    And the response payload MUST contain "customer_reviews" with exactly 3 distinct reviews
    And the response payload MUST contain "socio_economic" with schools, crime, workforce, and housing
    And the response payload MUST contain "excuse" with official municipal council excuse

  Scenario: Customer Reviews enforce 3 varied lengths and ratings
    Given a Mode III generation request
    When the customer reviews array is populated
    Then review 1 SHOULD be a longer detailed visitor experience
    And review 2 SHOULD be a short 1-sentence reaction
    And review 3 SHOULD be an obscure or surreal local observation
    And all ratings MUST sit within the range 1 to 5 stars

  Scenario: Rule of Tincture contrast enforcement on split fields
    Given a split field with primary tincture "Azure" and secondary tincture "Sable"
    When the heraldic specification is validated
    Then the secondary tincture MUST be automatically adjusted to a contrasting metal "Or" or "Argent"
