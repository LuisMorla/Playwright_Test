---
name: repo-traning-base-branch
description: The integration branch in LuisMorla/Playwright_Test (Traning repo) is named "Development" with a capital D, not "development"
metadata:
  type: project
---

The repo's remote integration branch is `origin/Development` (capital D), confirmed via `git branch -a` on 2026-07-20. `main` also exists and is the default branch on GitHub, but PRs for test-automation work in this project target `Development`.

**Why this matters:** the generic automatizador instructions say to branch from and PR into "development" (lowercase) — that's a placeholder for whatever the project's real integration branch is called, not a literal branch name to assume.

**How to apply:** before creating branches/PRs in this repo, verify the exact branch name with `git branch -a` / `git fetch` rather than assuming lowercase `development`. Use `origin/Development` as the base for `git checkout -b` and as `--base` in `gh pr create`.
