# Repo Context

## Location
`C:\Users\enig9\WebstormProjects\llm-failure-eval-framework`
Primary IDE: WebStorm

## Tools
| Tool | Used for |
|------|----------|
| LM Studio | Local model inference and transcript export |
| WebStorm | Primary IDE / file management |
| Cowork (Claude) | Exhibit processing, writing, analysis |
| Git | Version control |

## File Naming Conventions
- Exhibit folders: `E000_short_name` (zero-padded ID + snake_case name)
- Transcript files: `[title] - [model-name].md` (exported from LM Studio)
- Memory files: lowercase, hyphens

## Notes
- `claude.md` (lowercase, in repo root) = OLD file, was WordPress plugin spec — replaced by `CLAUDE.md`
- Keep `CLAUDE.md` as the hot cache; `memory/` for everything deep
