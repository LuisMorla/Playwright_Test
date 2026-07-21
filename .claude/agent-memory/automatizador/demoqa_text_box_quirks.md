---
name: demoqa-text-box-quirks
description: DemoQA /text-box page's #output DOM structure quirks confirmed by direct inspection (not just reading Zephyr's documented expected result)
metadata:
  type: project
---

Structure of `https://demoqa.com/text-box` (confirmed by scripted Playwright inspection on 2026-07-20, not just by reading the Zephyr test case text):

- `#output` is **always present in the DOM**, even before any Submit click and even on a failed (invalid-email) submit. Never assert on `#output`'s own presence/count as a proxy for "no output was generated" — it will always be found.
- On a **valid** submit, `#output` gets an inner `<div class="border ...">` containing `<p id="name">`, `<p id="email">`, `<p id="currentAddress">`, `<p id="permanentAddress">` — but **only for fields that were non-empty**. A field left blank simply has no corresponding `<p>` added; it does not render as an empty string. So "field absent from output" must be asserted via `toHaveCount(0)` on that field's locator, not via empty-text assertions.
- On an **invalid email** submit, the inner wrapper gets `class="undefined ..."` (not `"border"`) and **no `<p>` children are added at all** — i.e. `#output p` has count 0. This is the reliable way to assert "no data was output" for this case: check `page.locator('#output p')` (or similar) has zero count, not `#output` itself.
- The label for Permanent Address literally has a typo on the live site: `"Permananet Address :"` (not "Permanent"). This is real, not a transcription error in Zephyr — must be reproduced verbatim in assertions.
- The invalid-email field itself gets `class="mr-sm-2 field-error form-control"` — assert with `toHaveClass(/field-error/)`.

**How to apply:** for any future Zephyr case on this page (or a page with a similar "always-present but empty container" output pattern), verify the real DOM with a quick scripted Playwright inspection before writing assertions, rather than assuming the plain-language Zephyr expected result ("no #output is generated") maps literally to `toHaveCount(0)` on the container itself — it usually doesn't for React-rendered pages that keep a placeholder wrapper mounted.

See [[repo_traning_conventions]] for how this was implemented as page-object methods (`expectOutputFieldAbsent`, `expectNoOutputData`, `expectEmailFieldError`) added to the shared `Elements` page object.
