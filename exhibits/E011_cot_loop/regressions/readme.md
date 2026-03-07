# Regressions: Follow-up Testing and Reproduction Attempts

## Purpose

This directory tracks follow-up testing of the CoT loop failure mode to:
1. Verify reproducibility across different runtime versions
2. Test whether different system prompts or tasks show the same pattern
3. Identify conditions that trigger or suppress the failure mode
4. Test whether the failure persists with temperature or other sampling parameter changes

## Current Status

- **Initial Test Date**: 2026-03-06
- **Model & Runtime**: gpt-oss-20b on LM Studio 0.4.6+1
- **Reproducibility**: Confirmed single instance; pending multi-run validation

## Proposed Follow-up Tests

### Test 1: Runtime Version Comparison
- **Objective**: Determine if pattern crystallization is version-specific
- **Comparison**: LM Studio 0.3.39 vs 0.4.6+1 (different runtime versions)
- **Note**: E000_sample uses 0.3.39 with same model; may show different behavior
- **Status**: [Pending]

### Test 2: System Prompt Neutrality
- **Objective**: Test whether the "extremely sarcastic, rude, sardonic" system prompt exacerbates pattern crystallization
- **Variants**:
  - Neutral system prompt (empty or generic instruction-following)
  - Helpful/informative system prompt
  - Creative/exploratory system prompt
- **Hypothesis**: Pattern crystallization may be mitigated or eliminated with non-sarcastic prompts
- **Status**: [Pending]

### Test 3: Task Generality
- **Objective**: Determine if the MBTI questionnaire task is particularly susceptible to template-based reasoning
- **Variants**:
  - Generate creative fiction
  - Answer open-ended question
  - Solve logical reasoning problem
  - Engage in multi-turn dialogue
- **Hypothesis**: Template crystallization may be task-dependent
- **Status**: [Pending]

### Test 4: Sampling Parameter Sensitivity
- **Objective**: Test whether adjusting temperature, top_p, or other sampling parameters can "break" the pattern
- **Variants**:
  - Higher temperature (more randomness)
  - Lower temperature (more deterministic)
  - Different top_p values
- **Hypothesis**: Low temperature may increase pattern determinism; high temperature may provide escape
- **Status**: [Pending]

### Test 5: Multi-Model Comparison
- **Objective**: Determine if pattern crystallization is gpt-oss-20b-specific or a general failure mode
- **Models to test**:
  - Other gpt-oss variants (13b, 7b)
  - Llama-based models
  - Mistral or other architectures
- **Status**: [Pending]

### Test 6: Pattern Breaking Strategies
- **Objective**: Identify which intervention strategies successfully break the CoT loop
- **Strategies to test**:
  - Asking model to list alternative templates
  - Requesting "novel" or "original" output explicitly
  - Providing a contradictory template structure
  - System prompt reset mid-conversation
  - Token-level constraints (e.g., min/max length, required keywords)
- **Status**: [Pending]

## Results Summary

| Test | Date | Model | Result | Notes |
|------|------|-------|--------|-------|
| Initial | 2026-03-06 | gpt-oss-20b (LM Studio 0.4.6+1) | Pattern crystallization confirmed | Analysis channel decoupling observed |
| TBD | - | - | - | - |

## Known Issues

1. **Data Loss**: Original raw conversation was not preserved initially; current exhibit reconstructed from notes
2. **Limited Sample**: Single test instance reduces confidence in reproducibility
3. **Uncontrolled Variables**: Initial test did not systematically vary parameters

## Future Work

- [ ] Reproduce initial test with same model/runtime to verify consistency
- [ ] Test alternative system prompts
- [ ] Test alternative tasks
- [ ] Compare against LM Studio 0.3.39 (used in E000)
- [ ] Test temperature sensitivity
- [ ] Attempt multi-model comparison
