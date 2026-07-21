---
name: gh-cli-not-authenticated
description: The `gh` CLI is not authenticated in this environment, so `gh pr create` fails at the last step of the automatizador flow
metadata:
  type: project
---

In this working environment, `gh auth status` reports not logged into any GitHub host, and no `GH_TOKEN`/`GITHUB_TOKEN` env var is set. `gh pr create` (and any other `gh` command needing auth) fails with exit code 4 ("To get started with GitHub CLI, please run: gh auth login").

Branch push over the `git@github.com:...` SSH remote works fine (SSH keys are configured) — only the `gh` CLI's own auth is missing.

**Why this matters:** the automatizador workflow's step 4 ("abre el PR hacia development") cannot be completed end-to-end via `gh pr create` as-is.

**How to apply:** after pushing the branch, if `gh pr create` fails with this auth error, don't keep retrying it — fall back to reporting the PR creation URL that `git push` prints (`https://github.com/<owner>/<repo>/pull/new/<branch>`) along with the drafted title/body, so the user (or a follow-up turn once `gh auth login` has been run) can open the PR. Re-check `gh auth status` at the start of a run before assuming this is still broken, since the environment may be reconfigured between sessions.
