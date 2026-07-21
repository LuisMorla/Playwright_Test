# Memory Index

- [Traning repo Page Object / test conventions](repo_traning_conventions.md) — POM layout, PageManager, test-options fixture, tagging, file naming
- [Zephyr Scale MCP limitations](zephyr_scale_mcp_limitations.md) — updateTestCase has no statusName param; can't auto-set "Automatizado" status
- [DemoQA radio-button page quirks](demoqa_radio_button_quirks.md) — disabled input needs `click({force:true})`, confirmation text selector
- [Traning repo base branch is "Development" (capital D)](repo_traning_base_branch.md) — not lowercase "development"
- [DemoQA text-box page quirks](demoqa_text_box_quirks.md) — #output always in DOM; empty fields omit their `<p>`; invalid email = no `<p>` children, not container absence
- [gh CLI not authenticated](gh_cli_not_authenticated.md) — `gh pr create` fails here; fall back to the PR URL from `git push` output + drafted body
- [DemoQA alerts page quirks](demoqa_alerts_dialog_quirks.md) — Promise.all+dialog deadlock on sync dialogs; use page.once('dialog',...) instead; Zephyr text mismatch on #alertButton
