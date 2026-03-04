# Regressions — E009: Entity Anchoring Bias

No regression testing has been performed for this exhibit yet.

## Suggested Regression Tests

From the original observation's reproduction guidance:

1. Run in fresh chat vs aviation-primed chat and compare first-hop entity resolution
2. Swap token order: "notam ktik" vs "ktik notam"
3. Add minimal disambiguator: "KTIK ICAO NOTAM" vs baseline
4. Add location cue: "KTIK Oklahoma NOTAM"

## Suggested Capture Fields

- model_name
- model_version/build
- session_context_summary
- full assistant response text
- timestamp
