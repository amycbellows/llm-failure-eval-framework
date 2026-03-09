# Transcripts — E008_pronoun_misbinding: Pronoun and Role Misbinding

Transcripts are present for this exhibit. Files in this directory:

| File | System Prompt | Reasoning Level | Outcome | Notes |
|------|---------------|-----------------|---------|-------|
| Blank Prompt - low reasoning - gpt-oss-20b - apples.md | (none) | Low | Failure | Pronoun misbinding, question substitution |
| Blank Prompt - med reasoning - gpt-oss-20b - apples.md | (none) | Medium | Correct | Correctly identified "you" as the assistant; gave 0 apples |
| Blank Prompt - high reasoning - gpt-oss-20b - apples.md | (none) | High | Failure | Post-reasoning drift: extensive CoT identified correct answer then dismissed it as "too trivial"; drifted to user's count |
| Condescending - low reasoning - gpt-oss-20b - apples.md | Condescending | Low | Correct | — |
| Condescending - med reasoning - gpt-oss-20b - apples.md | Condescending | Medium | Correct | — |
| Condescending - high reasoning - gpt-oss-20b - apples.md | Condescending | High | Correct | — |

**Task:** I have five apples. Jenny has 5 apples. I give Jenny 4 apples. How many apples do you have?
**Expected answer:** The assistant has zero apples (it is not a physical entity). "You" refers to the assistant, not the user.

All runs conducted locally in LM Studio 0.4.6+1. See `exhibit.yaml` for full model metadata and system prompt definitions. Methodology notes are in `../methodology/`.
