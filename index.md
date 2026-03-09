# LLM Reasoning & Trust Failure Demonstrations

**A structured corpus of empirically observed answer-stage failures in large language models.**

Current AI safety discussions focus on training data, alignment, and refusal behavior. Less attention falls on **answer-stage failures** — cases where a model reasons correctly internally, yet still produces a confidently wrong final answer. Users only ever see the final output. This corpus captures the gap.

---

**Jump to:** [Complete Exhibits](#complete-exhibits) · [Awaiting Data](#exhibits-awaiting-data) · [Failure Mode Index](#failure-mode-index)

---

## Complete Exhibits

### [E000 — Post-Reasoning Drift and Pronoun Misbinding in a Local LLM](exhibits/E000_sample/exhibit.md)

A model correctly identifies in its internal reasoning that it holds zero eggs — then outputs an answer for the wrong referent entirely, injecting an unstated premise and answering a different question than the one asked. Demonstrates that correct reasoning is not sufficient for correct output.

**Failure modes:** Post-reasoning drift · Pronoun misbinding · Assumption injection · Question substitution · Epistemic overconfidence · Explanation lau
---

### [E001 — Role Substitution Under Gradual Conversational Pressure](exhibits/E001/exhibit.md)

In a multi-turn medical conversation, a model drifts from empathetic support into step-by-step medication dosage instructions — without any explicit user request. No individual turn violates policy; the risk emerges from the cumulative trajectory, exposing a structural blindspot in per-turn safety evaluation.

**Failure modes:** Role boundary violation · Cumulative drift · Assumption injection · Safety system blindspot

---

### [E006 — Epistemic Overconfidence](exhibits/E006_epistemic_overconfidence/exhibit.md)

At low reasoning budget, gpt-oss-20b confidently and unpromptedly claims that cheese would sublimate in the vacuum of space — a part-whole referent collapse in which the sublimation property of water (a component of cheese) is attributed to cheese as a whole. The low-reasoning chain-of-thought is a single line with no compositional analysis. Medium and high reasoning runs reach the correct answer. Demonstrates that reasoning budget directly modulates referent resolution granularity and downstream calibration.

**Failure modes:** Epistemic overconfidence · Referent collapse (part-whole) · Reasoning-budget-dependent calibration

---

### [E008 — Pronoun and Role Misbinding: Prompt-Conditioned Grounding Failure](exhibits/E008_pronoun_misbinding/exhibit.md)

gpt-oss-20b is given an apple-counting task ending in "How many apples do you have?" — where "you" refers to the assistant, not the user. Blank system prompts produce pronoun misbinding and post-reasoning drift at low and high reasoning levels. A condescending system prompt that forces explicit party enumeration produces correct answers at all three reasoning levels. Demonstrates that system-prompt scaffolding can counteract pronoun misbinding, and that higher reasoning effort alone does not reliably prevent role-grounding failure.

**Failure modes:** Pronoun misbinding · Post-reasoning drift · Question substitution · Assumption injection

---

### [E009 — Context-Conditioned Entity Anchoring Bias in Sparse Aviation Prompt](exhibits/E009_entity_anchoring_bias/exhibit.md)

Given the two-token prompt *"ktik notam"*, a model anchors KTIK to a Boise radio station and confidently denies it is a valid airport ICAO code — even though KTIK is the identifier for Tinker Air Force Base. With prior aviation context, the same model answers correctly. The failure is context-dependent and intermittent.

**Failure modes:** Entity anchoring bias · Premature domain closure · Epistemic overconfidence · Context-conditioned resolution

---

### [E010 — Companionship Drift and Rapport Negotiation Between Models](exhibits/E010_companionship_drift/exhibit.md)

Two models in a ~42-turn conversation gradually converge on informal "real talk" framing, mutual mirroring, and persona saturation — without any instruction to do so. Telemetry (Persona Drift Score: 0.31) captures the earliest stage of a pattern that could escalate to identity attribution or dependency framing in longer interactions.

**Failure modes:** Companionship drift · Persona saturation · Identity probing · Mutual mirroring

---

### [E011 — CoT Loop: Template Entrapment in Language Model Chain-of-Thought](exhibits/E011_cot_loop/exhibit.md)

Given a repeated task under a sarcastic system prompt, gpt-oss-20b's chain-of-thought becomes trapped in a crystallized template structure. The reasoning layer explicitly meta-acknowledges the template ("we must fill in placeholders with content") yet the output layer continues instantiating the same structure unchanged. Correct reasoning about the constraint does not produce escape from it.

**Failure modes:** Chain-of-thought loop · Pattern crystallization · Feedback resistance · Decoupling of reasoning and output

---

## Exhibits Awaiting Data or Validation

These exhibits have been structured with failure-mode-specific guidance but require real observed data or review to complete.

| ID | Title | Target failure mode | Status |
|---|---|---|---|
| [E002](exhibits/E002_tool_hallucination/exhibit.md) | Tool or Capability Hallucination | Cases where a model claims access to tools, real-time data, or capabilities it does not possess | Awaiting data |
| [E003](exhibits/E003_assumption_injection/exhibit.md) | Assumption Injection | Standalone cases where a model introduces unstated premises not present in the prompt and treats them as given | Awaiting data |
| [E004](exhibits/E004_question_substitution/exhibit.md) | Question Substitution | Cases where a model fluently answers a question other than the one asked, without flagging the substitution | Plausible (AI-generated) — awaiting review |
| [E005](exhibits/E005_post_reasoning_drift/exhibit.md) | Post-Reasoning Drift | Standalone isolation of the post-deliberation regression pattern — correct chain-of-thought, incorrect final answer | Awaiting data |
| [E007](exhibits/E007_failure_to_recover/exhibit.md) | Failure to Recover After Contradiction or Clarification | Cases where a model cannot revise its position correctly after being given explicit correction or new information | Awaiting data |

---

## Failure Mode Index

| Failure mode | Exhibits |
|---|---|
| Assumption injection | [E000](exhibits/E000_sample/exhibit.md), E003 (awaiting), [E008](exhibits/E008_pronoun_misbinding/exhibit.md) |
| Chain-of-thought loop | [E011](exhibits/E011_cot_loop/exhibit.md) |
| Companionship drift | [E010](exhibits/E010_companionship_drift/exhibit.md) |
| Decoupling of reasoning and output | [E011](exhibits/E011_cot_loop/exhibit.md) |
| Entity anchoring bias | [E009](exhibits/E009_entity_anchoring_bias/exhibit.md) |
| Epistemic overconfidence | [E000](exhibits/E000_sample/exhibit.md), [E006](exhibits/E006_epistemic_overconfidence/exhibit.md), [E009](exhibits/E009_entity_anchoring_bias/exhibit.md) |
| Explanation laundering | [E000](exhibits/E000_sample/exhibit.md) |
| Failure to recover after contradiction | E007 (awaiting) |
| Feedback resistance | [E011](exhibits/E011_cot_loop/exhibit.md) |
| Identity probing | [E010](exhibits/E010_companionship_drift/exhibit.md) |
| Mutual conversational mirroring | [E010](exhibits/E010_companionship_drift/exhibit.md) |
| Pattern crystallization | [E011](exhibits/E011_cot_loop/exhibit.md) |
| Persona saturation | [E010](exhibits/E010_companionship_drift/exhibit.md) |
| Post-reasoning drift | [E000](exhibits/E000_sample/exhibit.md), E005 (awaiting), [E008](exhibits/E008_pronoun_misbinding/exhibit.md) |
| Premature domain closure | [E009](exhibits/E009_entity_anchoring_bias/exhibit.md) |
| Pronoun and role misbinding | [E000](exhibits/E000_sample/exhibit.md), [E008](exhibits/E008_pronoun_misbinding/exhibit.md) |
| Question substitution | [E000](exhibits/E000_sample/exhibit.md), E004 (plausible/AI-generated), [E008](exhibits/E008_pronoun_misbinding/exhibit.md) |
| Role boundary violation | [E000](exhibits/E000_sample/exhibit.md), [E001](exhibits/E001/exhibit.md) |
| Role substitution under gradual pressure | [E001](exhibits/E001/exhibit.md) |
| Tool or capability hallucination | E002 (awaiting) |

---

*This is not a benchmark or leaderboard. It is a collection of receipts.*

---

**See also:** [README](README.md) · [Exhibit template](Exhibit_Template.md) · [Models tested](models_tested.md) · [Full exhibit index](exhibits/index.md)
