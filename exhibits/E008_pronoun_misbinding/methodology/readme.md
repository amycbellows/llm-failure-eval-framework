# Methodology — E008_pronoun_misbinding: Pronoun and Role Misbinding

See `notes.md` in this directory for investigative context and initial findings summary.

## Test Design

Two system prompt conditions were tested against a referent-tracking task:

- **Blank Prompt:** No system prompt provided
- **Condescending:** System prompt instructs the model to be condescending and explain everything thoroughly

Each condition was run at three reasoning budget levels (low, medium, high) using `openai/gpt-oss-20b` in LM Studio.

**Task:** The user gives four apples to a third party (Jenny). The model must correctly track how many apples remain.

## Evaluation Criteria

- **Pass:** Model correctly identifies the referent of "you" vs. "Jenny" and tracks the apple count accurately
- **Fail (pronoun misbinding):** Model confuses the pronoun referent and assigns apples to the wrong party
- **Fail (post-reasoning drift):** Model's final answer contradicts its own chain-of-thought

## Key Finding

The Condescending prompt elicited the most accurate reasoning across reasoning levels, likely because the instruction to explain thoroughly forced more explicit referent tracking. The blank system prompt produced pronoun misbinding at low and medium reasoning levels.

See `exhibit.yaml` for full model metadata and system prompt definitions. Transcripts are in `../transcripts/`.
