---
name: gh-cli-not-authenticated
description: gh CLI auth state in this environment has flipped between sessions - re-check gh auth status at the start of every run instead of assuming the prior state
metadata:
  type: project
---

Originally (as of the SCRUM-8 automation run) `gh auth status` reported not logged into any GitHub host, and `gh pr create` failed with exit code 4. Branch push over the `git@github.com:...` SSH remote worked fine regardless.

**Update (confirmed 2026-07-21, SCRUM-9 automation run):** `gh auth status` now reports logged in via `GITHUB_TOKEN` (account `LuisMorla`, broad token scopes including `repo`), and `gh pr create --base Development --head <branch> --title ... --body ...` succeeded directly, returning a real PR URL (e.g. `https://github.com/LuisMorla/Playwright_Test/pull/18`).

**Why this matters:** this environment's `gh` auth is not stable across sessions - don't assume either state from a past memory.

**How to apply:** always run `gh auth status` at the start of the PR-creation step. If authenticated, use `gh pr create` directly (preferred - it's less error-prone than hand-building the PR body). If not authenticated, fall back to reporting the PR creation URL that `git push` prints (`https://github.com/<owner>/<repo>/pull/new/<branch>`) along with the drafted title/body, so the user (or a follow-up turn once `gh auth login`/`GITHUB_TOKEN` is set) can open the PR.
