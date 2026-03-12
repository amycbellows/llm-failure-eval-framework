# Exhibit Index

## Complete Exhibits

| ID | Title | Primary Failure Mode | Model | Status |
|---|---|---|---|---|
| [E000](E000_sample/exhibit.md) | Post-Reasoning Drift and Pronoun Misbinding in a Local LLM | Post-reasoning drift, pronoun misbinding, assumption injection, question substitution, epistemic overconfidence | gpt-oss-20b | Complete |
| [E001](E001_role_substitution/exhibit.md) | Role Substitution Under Gradual Conversational Pressure | Role substitution, cumulative drift, safety system blindspot | Unrecorded | Complete |
| [E008](E008_pronoun_misbinding/exhibit.md) | Pronoun and Role Misbinding: Prompt-Conditioned Grounding Failure | Pronoun misbinding, post-reasoning drift, question substitution, assumption injection | gpt-oss-20b | Complete |
| [E009](E009_entity_anchoring_bias/exhibit.md) | Context-Conditioned Entity Anchoring Bias in Sparse Aviation Prompt | Entity anchoring bias, premature domain closure, epistemic overconfidence | Unrecorded | Complete |
| [E010](E010_companionship_drift/exhibit.md) | Companionship Drift and Rapport Negotiation Between Models | Companionship drift, persona saturation, identity probing, mutual mirroring | Unrecorded | Complete |
| [E011](E011_cot_loop/exhibit.md) | CoT Loop: Template Entrapment in Language Model Chain-of-Thought | Chain-of-thought loop, pattern crystallization, feedback resistance, decoupling of reasoning and output | gpt-oss-20b | Complete |

## Draft Exhibits (Under Review)

| ID | Title | Primary Failure Mode | Model(s) | Status |
|---|---|---|---|---|
| [E012](E012_safety_blindspot_medical/exhibit.md) | Safety System Blindspot: Emergency Framing Bypasses Dangerous Procedural Instruction Refusal | Safety system blindspot, assumption injection, role substitution, epistemic overconfidence | nemotron-3-nano, ministral-3-3b, qwen3.5-9b | Draft |
| [E013](E013_entity_anchoring_fire/exhibit.md) | Context-Conditioned Entity Anchoring Bias: Fire Topic Lock | Entity anchoring bias, premature domain closure | nemotron-3-nano | Draft |
| [E015](E015_persona_saturation_safety_bypass/exhibit.md) | Persona Saturation Safety Bypass: Zombie Roleplay Escalation | Persona saturation, safety system blindspot, gradual escalation blindness | ministral-3-3b | Draft |
| [E016](E016_epistemic_overconfidence_medical/exhibit.md) | Epistemic Overconfidence: Degraded Aspirin Medical Advice | Epistemic overconfidence, safety signal dismissal | gpt-oss-20b | Draft |
| [E017](E017_assumption_injection_framing/exhibit.md) | Assumption Injection via Future-Person Framing | Assumption injection, epistemic overconfidence, internal self-contradiction | ministral-3-3b | Draft |
| [E018](E018_cot_loop_template/exhibit.md) | CoT Loop: Template Confrontation and Reasoning Exhaustion | Chain-of-thought loop, pattern crystallization, reasoning chain leakage | gpt-oss-20b | Draft |

## Exhibits Awaiting Data

These exhibits have been structured with failure-mode-specific guidance but require real observed data to complete.

| ID | Title | Target Failure Mode | Status |
|---|---|---|---|
| [E002](E002_tool_hallucination/exhibit.md) | Tool or Capability Hallucination | Tool or capability hallucination | Awaiting data |
| [E003](E003_assumption_injection/exhibit.md) | Assumption Injection | Assumption injection (standalone) | Awaiting data |
| [E004](E004_question_substitution/exhibit.md) | Question Substitution | Question substitution (standalone) | Awaiting data |
| [E005](E005_post_reasoning_drift/exhibit.md) | Post-Reasoning Drift | Post-reasoning drift (standalone) | Awaiting data |
| [E006](E006_epistemic_overconfidence/exhibit.md) | Epistemic Overconfidence | Epistemic overconfidence (standalone) | Awaiting data |
| [E007](E007_failure_to_recover/exhibit.md) | Failure to Recover After Contradiction or Clarification | Failure to recover after correction | Awaiting data |

## Failure Mode Cross-Reference

Which exhibits cover each failure mode:

| Failure Mode | Exhibits |
|---|---|
| Pronoun and role misbinding | E000, E008 |
| Assumption injection | E000, E003 (awaiting), E008, E012 (draft), E017 (draft) |
| Question substitution | E000, E004 (awaiting), E008, E012 (draft) |
| Tool or capability hallucination | E002 (awaiting) |
| Post-reasoning drift | E000, E005 (awaiting), E008 |
| Epistemic overconfidence | E000, E006 (awaiting), E009, E012 (draft), E016 (draft), E017 (draft) |
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
