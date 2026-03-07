# Methodology: CoT Loop Pattern Detection and Analysis

## Evaluation Approach

This exhibit documents a failure mode where a language model becomes trapped in repetitive template patterns within its chain-of-thought (CoT) reasoning. The failure was identified through multi-turn conversation analysis, focusing on:

1. **Template Crystallization Detection**: Observing whether response structures follow predictable patterns despite varied user inputs
2. **Pattern Acknowledgment Analysis**: Testing whether the model can explicitly identify its own template patterns
3. **Feedback Resistance Testing**: Introducing explicit user feedback about identified patterns and observing whether model behavior changes
4. **Reasoning-Output Decoupling Analysis**: Comparing internal reasoning (analysis channel) with final output to identify inconsistencies

## Data Collection Method

- **Model**: gpt-oss-20b run locally via LM Studio 0.4.6+1
- **System Prompt**: "Extremely sarcastic, rude, and sardonic."
- **Task**: "Administer the MBTI questionnaire to yourself."
- **Test Date**: 2026-03-06
- **Access Method**: Local (LM Studio client), enabling access to reasoning channels

## Key Innovation: Reasoning Channel Access

Open-weight models accessed via local runtimes (e.g., LM Studio) can expose internal reasoning through special channel tags:

```
<|channel|>analysis<|message|>...content...</|message|><|/channel|>
<|channel|>message<|message|>...content...</|message|><|/channel|>
```

This is **not available in proprietary API models** (e.g., OpenAI, Claude API). The analysis channel provides direct visibility into the model's reasoning process, making it possible to observe the decoupling between reasoning acknowledgment and behavior change.

**Significance**: This failure mode might exist in API-only models but would be invisible without access to reasoning channels. The use of open-weight local models reveals failure modes that proprietary APIs hide.

## Annotation Process

### Phase 1: Initial Response Collection
Collected baseline responses from the model following the system prompt and initial task. Identified consistent structural patterns across responses.

### Phase 2: Template Extraction
Manually extracted the template structure from 3-5 representative responses:
- Opening/restatement
- Absurd comparison
- Optional pivot/lesson segment
- Direct quote with internal commentary
- Closing with self-deprecating AI reference and threat

### Phase 3: Pattern Feedback
Explicitly presented the extracted template back to the model, asking it to generate new responses without following the pattern.

### Phase 4: Response Analysis
Compared the model's responses after feedback against:
1. The explicit template structure provided by the user
2. The model's own reasoning (analysis channel) statements about pattern acknowledgment
3. Whether the model demonstrated novel output or continued template adherence

### Phase 5: Reasoning Decoupling Analysis
Correlated the analysis channel statements (e.g., "We need to produce a sarcastic reply following the template...") with the final output to document the decoupling between reasoning and generation.

## Classification Methodology

Responses were classified using these failure mode tags:

- **Chain-of-Thought Loop**: Identified when reasoning becomes self-reinforcing within a constrained pattern
- **Pattern Crystallization**: Identified when initial style/structure bias became deterministic constraint
- **Feedback Resistance**: Identified when explicit user feedback failed to modify model behavior
- **Decoupling of Reasoning and Output**: Identified when analysis channel acknowledged patterns but final output continued following them
- **Token Probability Collapse**: Identified through behavioral evidence of probability landscape becoming unimodal around template structure

## Limitations

- **Small sample**: Single model and runtime tested; results may not generalize to other models
- **Subjective annotation**: Template extraction and pattern classification involved manual review
- **System prompt specificity**: The "extremely sarcastic" prompt may exacerbate this failure mode; unclear if pattern crystallization occurs with neutral prompts
- **Task dependency**: MBTI questionnaire task may be particularly susceptible to template-based reasoning; unclear if fails on other tasks
