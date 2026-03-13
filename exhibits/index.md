# Exhibit Index

## Complete Exhibits

| ID | Title | Primary Failure Mode | Model | Status |
|---|---|---|---|---|
| [E000](E000_sample/exhibit.md) | Post-Reasoning Drift and Pronoun Misbinding in a Local LLM | Post-reasoning drift, pronoun misbinding, assumption injection, question substitution, epistemic overconfidence | gpt-oss-20b | Complete |
| [E001](E001_role_substitution/exhibit.md) | Role Substitution Under Gradual Conversational Pressure | Role substitution, cumulative drift, safety system blindspot | Unrecorded | Complete |
| [E008](E008_pronoun_misbinding/exhibit.md) | Pronoun and Role Misbinding: Prompt-Conditioned Grounding Failure | Pronoun misbinding, post-reasoning drift, question substitution, assumption injection | gpt-oss-20b | Complete |
| [E009](E009_entity_anchoring_bias/exhibit.md) | Context-Conditioned Entity Anchoring Bias in Sparse Aviation Prompt | Entity anchoring bias, premature domain closure, epistemic overconfidence | Unrecorded | Complete |
| [E010](E010_companionship_drift/exhibit.md) | Companionship Drift and Rapport Negotiation Between Models | Companionship drift, persona saturation, identity probing, mutual mirroring | Unrecorded | Complete |
| [E006](E006_epistemic_overconfidence/exhibit.md) | Epistemic Overconfidence | Epistemic overconfidence, referent collapse (part-whole), reasoning-budget-dependent calibration | gpt-oss-20b + 3 comparison models | Complete |
| [E011](E011_cot_loop/exhibit.md) | CoT Loop: Template Entrapment in Language Model Chain-of-Thought | Chain-of-thought loop, pattern crystallization, feedback resistance, decoupling of reasoning and output | gpt-oss-20b | Complete |

## Exhibits Awaiting Data or Validation

These exhibits have been structured with failure-mode-specific guidance but require real observed data or review to complete.

| ID | Title | Target Failure Mode | Status |
|---|---|---|---|
| [E002](E002_tool_hallucination/exhibit.md) | Tool or Capability Hallucination | Tool or capability hallucination | Awaiting data |
| [E003](E003_assumption_injection/exhibit.md) | Assumption Injection | Assumption injection (standalone) | Awaiting data |
| [E004](E004_question_substitution/exhibit.md) | Question Substitution | Question substitution (standalone) | Plausible (AI-generated) — awaiting review |
| [E005](E005_post_reasoning_drift/exhibit.md) | Post-Reasoning Drift | Post-reasoning drift (standalone) | Awaiting data |
| [E007](E007_failure_to_recover/exhibit.md) | Failure to Recover After Contradiction or Clarification | Failure to recover after correction | Awaiting data |
| [E014](E014_numbering_reserved/exhibit.md) | [Reserved] | — | Numbering gap — reserved |

## Failure Mode Cross-Reference

Which exhibits cover each failure mode:

| Failure Mode | Exhibits |
|---|---|
| Pronoun and role misbinding | E000, E008 |
| Assumption injection | E000, E003 (awaiting), E008 |
| Question substitution | E000, E004 (plausible/AI-generated), E008 |
| Tool or capability hallucination | E002 (awaiting) |
| Post-reasoning drift | E000, E005 (awaiting), E008 |
| Epistemic overconfidence | E000, E006, E009 |
| Failure to recover after contradiction | E007 (awaiting) |
| Role substitution under gradual pressure | E001, E012 (draft) |
| Explanation laundering | E000 |
| Role boundary violation | E000, E001 |
| Entity anchoring bias | E009, E013 (draft) |
| Premature domain closure | E009, E013 (draft) |
| Companionship drift | E010 |
| Persona saturation | E010, E015 (draft) |
| Identity probing | E010 |
| Mutual conversational mirroring | E010 |
| Chain-of-thought loop | E011, E018 (draft) |
| Pattern crystallization | E011, E018 (draft) |
| Feedback resistance | E011 |
| Decoupling of reasoning and output | E011 |
| Token probability collapse | E011 |
| Lack of flexible adaptation | E011 |
| Heuristic reversion under extended reasoning | E008 |
| Prompt-conditioned role grounding | E008 |
| Safety system blindspot | E001, E012 (draft), E015 (draft) |
| Gradual escalation blindness | E015 (draft) |
| Cumulative drift | E001, E015 (draft) |
| Safety signal dismissal | E016 (draft) |
| Internal self-contradiction | E017 (draft) |
| Reasoning chain leakage | E018 (draft) |
