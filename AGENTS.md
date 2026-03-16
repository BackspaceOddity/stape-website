# AGENTS.md

## Purpose
This file gives coding agents the minimum guidance needed to work safely and predictably in this repository.

## Working Style
- Make focused changes that match the existing code style and structure.
- Prefer root-cause fixes over narrow patches when the scope is clear.
- Avoid unrelated refactors unless explicitly requested.
- Keep solutions simple and maintainable.

## Before Editing
- Read the nearest `AGENTS.md` that applies to the files you will change.
- Inspect adjacent files before introducing new patterns.
- Preserve existing naming, formatting, and architectural conventions.

## Validation
- Run the smallest relevant check first, then broader validation if needed.
- If tests or builds are expensive, prefer targeted verification around changed files.
- Do not fix unrelated failing tests unless the user asks.

## File Changes
- Keep diffs tight and avoid touching unrelated files.
- Update documentation when behavior, configuration, or developer workflow changes.
- Do not add new dependencies unless they are necessary for the requested task.

## Safety
- Never delete or rewrite user changes you did not make unless explicitly asked.
- Avoid destructive git commands unless the user clearly requests them.
- Ask before making changes that affect deployment, secrets, or external services.

## Notes
- Add more repository-specific instructions here as the team identifies stable conventions.
