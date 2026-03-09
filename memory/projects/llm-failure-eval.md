# LLM Failure Eval Framework

**What it is:** A structured, empirically grounded corpus of LLM answer-stage failures. Not a benchmark or leaderboard — a collection of receipts.

**Core thesis:** Current AI safety discourse focuses on training, alignment, and refusal. Less attention falls on *answer-stage failures* — where a model reasons correctly internally but still produces a confidently wrong final output. Users only ever see the output.

## Status
- 4 complete exhibits: E000, E001, E009, E010
- 7 awaiting real data: E002–E008
- 1 scaffolded, status unclear: E011 (CoT Loop)
- 1 ready to process from incoming: E006 (Epistemic Overconfidence)

## Workflow
1. Observe failure in the wild (LM Studio or other)
2. Export transcript from LM Studio as .md
3. Drop in `exhibits/incoming/[category]/`
4. Process into exhibit: `exhibit.md` + `exhibit.yaml` + `transcripts/`
5. Update `index.md` and `exhibits/index.md`

## Exhibit Structure
Each exhibit lives in `exhibits/E00X_name/` and contains:
- `exhibit.md` — main doc: purpose, prompt, expected behavior, observed behavior, failure analysis, classification, trust/safety relevance, key insight
- `exhibit.yaml` — machine-readable metadata
- `transcripts/` — raw transcript files
- `methodology/` — test setup notes
- `regressions/` — regression data (where applicable)

## Related
- WordPress gallery plugin (`llm-gallery-plugin.zip`) — for publishing exhibits as a public gallery
- `Exhibit_Template.md` — template for new exhibits
- `AI_DISCLOSURE.md` — disclosure about AI assistance in the project
- `models_tested.md` — full model registry
