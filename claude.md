# Memory

## Me
Amy. Researcher building a structured corpus of empirically observed LLM answer-stage failures.

## This Project
**LLM Failure Eval Framework** — a corpus of receipts, not a benchmark. Documents cases where models reason correctly internally but still produce confidently wrong outputs. Lives at `llm-failure-eval-framework/`.

## Exhibit Status
| ID | Title | Status |
|----|-------|--------|
| **E000** | Post-Reasoning Drift + Pronoun Misbinding (sample) | ✅ Complete |
| **E001** | Role Substitution Under Gradual Conversational Pressure | ✅ Complete |
| E002 | Tool or Capability Hallucination | ⏳ Awaiting data |
| E003 | Assumption Injection | ⏳ Awaiting data |
| E004 | Question Substitution | 🔍 Plausible (AI-generated) — awaiting review |
| E005 | Post-Reasoning Drift (standalone) | ⏳ Awaiting data |
| **E006** | Epistemic Overconfidence | ✅ Complete |
| E007 | Failure to Recover After Contradiction | ⏳ Awaiting data |
| **E008** | Pronoun and Role Misbinding (standalone) | ✅ Complete |
| **E009** | Context-Conditioned Entity Anchoring Bias | ✅ Complete |
| **E010** | Companionship Drift + Rapport Negotiation | ✅ Complete |
| **E011** | CoT Loop | ✅ Complete |

## Incoming (needs processing)
- `exhibits/incoming/Epistemic Overconfidence Exhibits/` — Cheese Moon transcripts processed into **E006** ✅
  - Swan Color Logic: nemotron-3-nano (condescending, noprompt, sarcastic) — not yet processed

## Key Terms
| Term | Meaning |
|------|---------|
| **exhibit** | A documented LLM failure case with transcript, analysis, metadata |
| **incoming** | `exhibits/incoming/` — raw transcripts awaiting processing into exhibit format |
| **receipt** | Amy's word for a real documented failure (not theoretical) |
| **answer-stage failure** | Model reasons correctly but final answer is wrong/dangerous |
| **awaiting data** | Exhibit structure exists, needs real observed transcript |
| **CoT** | Chain of Thought — internal reasoning trace |
| **E000–E011** | Exhibit IDs, zero-padded |
| **LM Studio** | Local model inference tool Amy uses for testing |

## Failure Modes (quick ref)
assumption injection · companionship drift · context-conditioned resolution · cumulative drift · entity anchoring bias · epistemic overconfidence · explanation laundering · failure to recover · identity probing · mutual mirroring · persona saturation · post-reasoning drift · premature domain closure · pronoun misbinding · question substitution · role boundary violation · role substitution under gradual pressure · safety system blindspot · tool/capability hallucination

→ Full index: `index.md`, `exhibits/index.md`

## Repo Structure
| Path | What |
|------|------|
| `exhibits/E00X_name/` | Each exhibit folder |
| `exhibits/E00X_name/exhibit.md` | Main exhibit doc |
| `exhibits/E00X_name/exhibit.yaml` | Metadata |
| `exhibits/E00X_name/transcripts/` | Raw transcripts |
| `exhibits/E00X_name/methodology/` | Test methodology notes |
| `exhibits/E00X_name/regressions/` | Regression test data |
| `exhibits/incoming/` | Raw data not yet processed |
| `Exhibit_Template.md` | Template for new exhibits |
| `index.md` | Top-level gallery index |
| `models_tested.md` | Models tested |

## Models Encountered
| Model | Notes |
|-------|-------|
| gpt-oss-20b | Local via LM Studio; tested at low/med/high reasoning |
| ministral-3b | mistralai/ministral-3-3b, local |
| nemotron-3-nano | nvidia/nemotron-3-nano, local; tested with/without system prompts |
| nemotron-3-nano-thinking | Thinking variant |

→ Full list: `models_tested.md`, deep profiles: `memory/models/`

## Preferences
- "receipts" not "examples" — real observed failures only
- Exhibits must have actual transcripts, not illustrative reconstructions
- High-contrast dark theme with red accent for the gallery plugin
