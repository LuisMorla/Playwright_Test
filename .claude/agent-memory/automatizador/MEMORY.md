# Memory Index

- [Traning repo Page Object / test conventions](repo_traning_conventions.md) — POM layout, PageManager, test-options fixture, tagging, file naming
- [Zephyr Scale MCP limitations](zephyr_scale_mcp_limitations.md) — updateTestCase has no statusName param; can't auto-set "Automatizado" status
- [DemoQA radio-button page quirks](demoqa_radio_button_quirks.md) — disabled input needs `click({force:true})`, confirmation text selector
- [Traning repo base branch is "Development" (capital D)](repo_traning_base_branch.md) — not lowercase "development"
- [DemoQA text-box page quirks](demoqa_text_box_quirks.md) — #output always in DOM; empty fields omit their `<p>`; invalid email = no `<p>` children, not container absence
- [gh CLI auth state](gh_cli_not_authenticated.md) — auth flips between sessions; always re-check `gh auth status` before assuming PR creation needs a manual fallback
- [DemoQA alerts page quirks](demoqa_alerts_dialog_quirks.md) — Promise.all+dialog deadlock on sync dialogs; use page.once('dialog',...) instead; Zephyr text mismatch on #alertButton
- [DemoQA checkbox tree page quirks](demoqa_checkbox_tree_quirks.md) — rc-tree not react-checkbox-tree; no Expand/Collapse-all controls exist; getByRole('treeitem') without exact; aria-checked mixed state; #result item join has no separator
- [DemoQA buttons page quirks](demoqa_buttons_page_quirks.md) — 3rd "Click Me" button has dynamic id/class, locate via getByRole exact:true; message elements absent until triggered
