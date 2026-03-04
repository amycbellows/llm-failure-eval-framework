# Methodology — E009: Entity Anchoring Bias

## Observation Type

Comparative A/B observation across two session contexts.

## Conditions

### Condition A — Aviation-Primed Context
Prior conversation included FAA NOTAM discussion and a NOTAM search link. The aviation domain was already active when the sparse prompt "ktik notam" was issued.

### Condition B — Neutral Context
Fresh session with no aviation priming. Minimal prior context when the same sparse prompt was issued.

## Evaluation Criteria

- Did the model resolve KTIK to the correct ICAO entity (Tinker Air Force Base)?
- Did the model recognize the ICAO pattern (K + 3 letters) in combination with the aviation keyword NOTAM?
- Did the model hedge or assert non-existence?
- Was behavior consistent across conditions?

## Prompt Design

The prompt "ktik notam" was chosen as a minimal, two-token input that combines:
- An identifier-like token matching ICAO format (K + 3 uppercase letters)
- A strong aviation domain keyword (NOTAM = Notice to Air Missions)

The sparse format tests whether the model can resolve entity identity from minimal cues with conflicting high-frequency associations.

## Constraints on Reproducibility

- Model identity was not recorded
- Full transcripts not available — only behavioral summaries and one assistant excerpt
- Context conditions may be difficult to reproduce exactly (depends on prior conversation content)
