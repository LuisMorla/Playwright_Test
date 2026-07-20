---
name: demoqa-radio-button-quirks
description: DemoQA /radio-button page structure and the disabled-option click quirk
metadata:
  type: project
---

Structure of `https://demoqa.com/radio-button` (confirmed by inspecting live DOM):
- Enabled options: `label[for="yesRadio"]` / `#yesRadio`, `label[for="impressiveRadio"]` / `#impressiveRadio`. The `<input>` itself is visually hidden/not directly interactable in the normal actionability sense in all cases — clicking the associated `<label>` is the reliable way to select it and works fine with a normal `.click()`.
- Disabled option: `#noRadio` (`disabled` attribute present, label has class `disabled`). A plain `.click()` on the label or the input **times out** (30s default) because Playwright's actionability check never resolves (element never becomes a stable click target while disabled).
  - Correct approach: assert `expect(locator).toBeDisabled()` first, then use `locator.click({ force: true })` to simulate the user's attempt without waiting on actionability. The forced click resolves quickly and correctly results in no state change (input stays unchecked, no confirmation text appears) — this matches real disabled-input browser behavior.
- Confirmation message after a successful selection renders as `<p class="mt-3">You have selected <span class="text-success">Yes</span></p>` — assert on `p.mt-3 span.text-success` text, not by locating the whole `<p>`.

**How to apply:** for any future Zephyr test case involving disabled DemoQA form elements (checkboxes, radios, etc.), try `{ force: true }` clicks + explicit `toBeDisabled()` assertions instead of a plain `.click()`, to avoid the same 30s timeout failure mode.
