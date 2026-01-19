# llm-failure-eval-corpus
A collection of LLM failure mode evaluations



# LLM Reasoning & Trust Failure Corpus

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

Out of scope:
- Benchmarking raw intelligence or accuracy scores
- Training new models
- Publishing exploitative jailbreak instructions
- General-purpose prompt collections

---

## Repository Structure

├── exhibits/ # Curated, write-up style cases (Exhibit A, B, C…)
├── transcripts/ # Raw and annotated model outputs
├── methodology/ # Evaluation principles and labeling notes
├── models_tested.md # Models, versions, and environments
└── README.md

