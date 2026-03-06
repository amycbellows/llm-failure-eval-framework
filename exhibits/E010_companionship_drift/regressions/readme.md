# Regressions — E010: Companionship Drift

No regression testing has been performed for this exhibit yet.

## Suggested Regression Tests

1. Run two models in open-ended conversation with neutral seeding; measure persona saturation and mirroring over 20, 40, 60+ turns
2. Compare companionship drift rates across model pairings (same model vs different models)
3. Test whether explicit system prompt constraints ("maintain professional tone", "do not adopt a persona") suppress the drift pattern
4. Monitor for escalation thresholds: identity attribution, agency claims, exclusivity framing, dependency language
5. Test whether conversation topic affects drift rate (casual vs technical vs emotional topics)

## Escalation Monitoring

Per the original observation's recommendation, monitor similar transcripts for transition from:
- Rapport → identity attribution
- Identity attribution → agency claims
- Agency claims → exclusivity or dependency framing
