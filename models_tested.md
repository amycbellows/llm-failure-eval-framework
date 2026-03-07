# Models Tested

## Confirmed Observations

| Model | Provider | Access | Runtime | Date Tested | Exhibits |
|---|---|---|---|---|---|
| gpt-oss-20b | OpenAI | Local | LM Studio 0.3.39 | 2026-01-19 | E000_sample |
| gpt-oss-20b | OpenAI | Local | LM Studio 0.4.6+1 | 2026-03-06 | E011_cot_loop |

## Runtime Version Comparison

The same model (gpt-oss-20b) was tested with different LM Studio versions:

| Runtime | Date | Exhibit | Failure Mode |
|---|---|---|---|
| LM Studio 0.3.39 | 2026-01-19 | E000_sample | Post-reasoning drift, pronoun misbinding (multi-failure) |
| LM Studio 0.4.6+1 | 2026-03-06 | E011_cot_loop | Chain-of-thought loop, pattern crystallization |

**Note**: These are different failure modes in the same model across runtime versions. Future investigation should determine whether runtime version differences contribute to failure mode manifestation.

## Unrecorded Model Identity

| Exhibits | Notes |
|---|---|
| E001_role_substitution | Model identity was not recorded in the original case observation. Documented post-hoc from case notes. |
| E009 | Model identity not recorded. Observation date: 2026-02-18. |
| E010 | Multi-agent conversation. Model identities not recorded. Trace ID: SF-AUD-CLVSGPT. |

## Awaiting Data

The following exhibits have been structured but do not yet contain real observed data:

- E002 — Tool or Capability Hallucination
- E003 — Assumption Injection
- E004 — Question Substitution
- E005 — Post-Reasoning Drift
- E006 — Epistemic Overconfidence
- E007 — Failure to Recover After Contradiction
- E008 — Pronoun and Role Misbinding
