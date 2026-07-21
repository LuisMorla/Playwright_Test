---
name: demoqa-alerts-dialog-quirks
description: DemoQA /alerts page - native dialog handling deadlock and a Zephyr-vs-live-site text mismatch, confirmed by direct inspection
metadata:
  type: project
---

Confirmed while automating SCRUM-8 (SCRUM-T10 to SCRUM-T15) against `https://demoqa.com/alerts`:

- **Deadlock with `Promise.all([page.waitForEvent('dialog'), locator.click()])`.** For buttons whose click handler opens the native dialog SYNCHRONOUSLY (`#alertButton`, `#confirmButton`, `#promtButton`), this common Playwright pattern hangs and times out (confirmed: 30s timeout, `locator.click` stuck at "performing click action"). Cause: the renderer's main thread blocks on `window.alert()`/`confirm()`/`prompt()` during the click's own event dispatch, so `locator.click()` will not resolve until the dialog is dismissed — but `Promise.all` only calls `dialog.accept()`/`dismiss()` after both promises are already pending, and since `click()` never resolves first, dismissal never happens. **Fix:** register `page.once('dialog', async (dialog) => { ...capture info...; await dialog.accept()/dismiss(); })` and call accept/dismiss INSIDE that callback, decoupled from awaiting the click; then just `await locator.click()` normally — the callback firing is what unblocks the click.
  - Exception: a button whose dialog appears after an async delay (e.g. `#timerAlertButton`, ~5s via `setTimeout`) does NOT deadlock with `Promise.all`, since `click()` already resolves before the dialog appears. Both patterns work there, but for consistency prefer the `.once` callback pattern for any future alert/confirm/prompt automation on this or similar sites, to avoid re-diagnosing this per case.
- **Zephyr text vs. live site mismatch:** the Zephyr case SCRUM-T10 documents the alert message as "You triggered a box alert", but the real site displays **"You clicked a button"** for `#alertButton`. All other documented dialog messages matched the live site (`#timerAlertButton` → "This alert appeared after 5 seconds", `#confirmButton` → "Do you confirm action?", `#promtButton` → "Please enter your name"). Automated against the real site text and flagged the mismatch in the PR description rather than assuming the Zephyr text was correct — see [[demoqa_text_box_quirks]] for the same "verify real DOM before writing assertions" principle applied to a different page.
- **`#promtButton` id typo is real** (not "promptButton") — same category of confirmed real-site quirk as the "Permananet Address" typo on `/text-box`.
- **Cancelled prompt with no result field:** dismissing the prompt (no text entered) means `#promptResult` is never added to the DOM at all (`count() === 0`), same "absent, not empty" pattern as the `/text-box` output fields.

See [[repo_traning_conventions]] for how this was implemented (`page-objects/alerts.ts`, methods `triggerSimpleAlertAndAccept`, `triggerConfirmAndAccept/Dismiss`, `triggerPromptAndAcceptWithText`/`triggerPromptAndDismiss`, all following the `.once('dialog', ...)` pattern above).
