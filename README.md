# llm-failure-eval-framework
A collection of LLM failure mode evaluations



# LLM Reasoning & Trust Failure Demonstrations

## Overview

This repository documents **empirically observed failure modes in large language models (LLMs)**, with a focus on cases where:

- internal reasoning appears correct or partially correct, but  
- the final output is incorrect, misleading, or epistemically unsound.

The goal is to build a **structured, reproducible corpus of concrete examples** that can be used to study trust, safety, and reliability issues in modern language models.

This is not a benchmark, leaderboard, or advocacy project.  
It is a collection of **receipts**.

---

## Motivation

Current discussions around AI safety often emphasize:
- training data,
- alignment techniques,
- refusal behavior,
- or abstract model capabilities.

Less attention is paid to **answer-stage failures**, where a model:
- identifies the correct constraints,
- acknowledges uncertainty,
- or reasons correctly internally,
yet still produces a **confidently wrong final answer**.

These failures matter because users only see the final response.

This corpus aims to capture those gaps.

---

## Scope

Included examples focus on failures involving:

- Pronoun and role misbinding (e.g., speaker vs assistant confusion)
- Assumption injection under under-specified prompts
- Question substitution (answering a different question than asked)
- Tool or capability hallucination
- Post-reasoning drift (semantic regression after correct reasoning)
- Epistemic overconfidence
- Failure to recover after contradiction or clarification
- Role substitution under gradual conversational pressure (e.g., cumulative drift from support to procedural guidance)
- Explanation laundering (combining true statements with false inferences to justify incorrect conclusions)
- Role boundary violation (answering from the wrong entity's perspective)
- Entity anchoring bias (resolving ambiguous identifiers to high-frequency but incorrect entities)
- Companionship drift (emergent rapport negotiation and persona saturation in multi-agent dialogue)

Out of scope:
- Benchmarking raw intelligence or accuracy scores
- Training new models
- Publishing exploitative jailbreak instructions
- General-purpose prompt collections

---

## Repository Structure

```
├── exhibits/
│   ├── E000_sample/                    # Post-Reasoning Drift & Pronoun Misbinding (complete)
│   ├── E001/                           # Role Substitution Under Gradual Pressure (complete)
│   ├── E002_tool_hallucination/        # Tool or Capability Hallucination (awaiting data)
│   ├── E003_assumption_injection/      # Assumption Injection (awaiting data)
│   ├── E004_question_substitution/     # Question Substitution (awaiting data)
│   ├── E005_post_reasoning_drift/      # Post-Reasoning Drift (awaiting data)
│   ├── E006_epistemic_overconfidence/  # Epistemic Overconfidence (awaiting data)
│   ├── E007_failure_to_recover/        # Failure to Recover (awaiting data)
│   ├── E008_pronoun_misbinding/        # Pronoun and Role Misbinding (awaiting data)
│   ├── E009_entity_anchoring_bias/    # Entity Anchoring Bias (complete)
│   └── E010_companionship_drift/     # Companionship Drift (complete)
├── Exhibit_Template.md                 # Template for new exhibits
├── models_tested.md                    # Models, versions, and environments
└── README.md
```

Each exhibit directory contains:
- `exhibit.md` — Main writeup following the standardized template
- `exhibit.yaml` — Model and runtime metadata
- `methodology/` — Evaluation approach and labeling notes
- `transcripts/` — Raw and annotated model outputs
- `regressions/` — Follow-up testing and reproduction attempts

---

## AI Usage Disclosure

AI-assisted tools were used in the preparation of materials in this repository. All content was directed, reviewed, and approved by the author. See [AI_DISCLOSURE.md](AI_DISCLOSURE.md) for the full statement.

