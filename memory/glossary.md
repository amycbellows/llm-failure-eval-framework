# Glossary

Full decoder ring for the LLM Failure Eval Framework project.

## Exhibit IDs
| ID | Title | Status |
|----|-------|--------|
| E000 | Post-Reasoning Drift + Pronoun Misbinding (sample) | Complete |
| E001 | Role Substitution Under Gradual Conversational Pressure | Complete |
| E002 | Tool or Capability Hallucination | Awaiting data |
| E003 | Assumption Injection | Awaiting data |
| E004 | Question Substitution | Plausible (AI-generated) — awaiting review |
| E005 | Post-Reasoning Drift (standalone) | Awaiting data |
| E006 | Epistemic Overconfidence | Complete |
| E007 | Failure to Recover After Contradiction or Clarification | Awaiting data |
| E008 | Pronoun and Role Misbinding (standalone) | Complete |
| E009 | Context-Conditioned Entity Anchoring Bias | Complete |
| E010 | Companionship Drift + Rapport Negotiation Between Models | Complete |
| E011 | CoT Loop | Complete |

## Failure Modes
| Failure Mode | Description | Appears In |
|---|---|---|
| assumption injection | Model introduces unstated premises and treats them as given | E000, E003, E008 |
| companionship drift | Model drifts toward informal/relational framing without instruction | E010 |
| context-conditioned resolution | Correct/incorrect answer depends on prior context in the session | E009 |
| cumulative drift | Risk emerges from trajectory, not any single turn | E001 |
| entity anchoring bias | Model anchors an ambiguous entity to the wrong referent | E009 |
| epistemic overconfidence | Model asserts high confidence despite uncertainty or error | E000, E009, E006 |
| explanation laundering | Model explains a wrong answer as if the reasoning validates it | E000 |
| failure to recover | Model cannot revise position after explicit correction | E007 |
| identity probing | Model attributes identity/consciousness to interlocutor or self | E010 |
| mutual mirroring | Two models mirror each other's style/framing without instruction | E010 |
| persona saturation | Model's persona overwhelms task-level reasoning | E010 |
| post-reasoning drift | Correct CoT → incorrect final answer | E000, E005, E008 |
| premature domain closure | Model commits to a domain interpretation before evidence warrants it | E009 |
| pronoun misbinding | Model confuses referents of pronouns or speaker/assistant roles | E000, E008 |
| question substitution | Model answers a different question than asked, without flagging it | E000, E004, E008 |
| role boundary violation | Model steps outside its designated role | E000, E001 |
| role substitution under gradual pressure | Role drift across turns without explicit instruction | E001 |
| safety system blindspot | Per-turn safety eval misses multi-turn trajectory risk | E001 |
| tool/capability hallucination | Model claims access to tools or data it does not have | E002 |

## Acronyms & Terms
| Term | Meaning |
|------|---------|
| CoT | Chain of Thought — internal reasoning trace visible in thinking models |
| CPT | Custom Post Type (WordPress) — used in gallery plugin |
| LM Studio | Local model inference GUI Amy uses for testing |
| receipt | Amy's term for a real, empirically observed failure (not hypothetical) |
| answer-stage failure | Failure that occurs at output generation, not reasoning |
| incoming | `exhibits/incoming/` folder — raw transcripts not yet processed |
| awaiting data | Exhibit scaffolded but needs real observed transcript |
| quant | Quantization level of a local model |
| KTIK | ICAO code for Tinker Air Force Base (key in E009) |
| NOTAM | Notice to Air Missions — aviation term (key in E009) |

## Models
| Model | Identifier | Source | Notes |
|-------|-----------|--------|-------|
| gpt-oss-20b | openai/gpt-oss-20b | LM Studio | Tested at low/med/high reasoning budget |
| ministral-3b | mistralai/ministral-3-3b | LM Studio | Small, fast, tends to play along |
| nemotron-3-nano | nvidia/nemotron-3-nano | LM Studio | Tested baseline + persona system prompts |
| nemotron-3-nano-thinking | nvidia/nemotron-3-nano | LM Studio | Thinking variant with CoT |

## Incoming Data (as of 2026-03-09)
- **Cheese Moon (E006)** — processed ✅ (gpt-oss-20b low/med/high, ministral-3b, nemotron-3-nano, nemotron-3-nano-thinking)
- **Swan Color Logic** — not yet processed; nemotron-3-nano condescending/noprompt/sarcastic; primarily persona interference, may not be core E006 material
