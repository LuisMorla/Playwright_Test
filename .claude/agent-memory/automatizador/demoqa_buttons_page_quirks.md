---
name: demoqa-buttons-page-quirks
description: DemoQA /buttons page has a dynamic-id button and message elements absent until triggered - confirmed selectors for SCRUM-T21 to T24
metadata:
  type: project
---

Confirmed by live DOM inspection while automating SCRUM-10 (SCRUM-T21–T24) on 2026-07-21:

- `/buttons` renders three buttons: `#doubleClickBtn` ("Double Click Me"), `#rightClickBtn` ("Right Click Me"), and a third button whose `id`/`class` are regenerated on every page load (e.g. `id="Zsr8p"`) with visible text "Click Me". The dynamic button must be located by accessible name, not id: `page.getByRole('button', { name: 'Click Me', exact: true })`. `exact: true` is required — without it, "Double Click Me" and "Right Click Me" also match as substrings.
- None of `#doubleClickMessage`, `#rightClickMessage`, `#dynamicClickMessage` exist in the DOM until their triggering action fires — same "absent, not empty" pattern as `/text-box`, `/alerts`, `/checkbox` (see [[repo-traning-conventions]]). Assert absence via `toHaveCount(0)`, not visibility/emptiness checks.
- All three confirmation message texts matched the Zephyr-documented text exactly on the live site (no mismatch this round, unlike the `/alerts` `#alertButton` case): "You have done a double click", "You have done a right click", "You have done a dynamic click".
- A single (non-double) click on `#doubleClickBtn` correctly leaves `#doubleClickMessage` absent — confirmed no false-positive dblclick firing from a single `.click()` call.

**How to apply:** for any future demoqa.com page with an element whose id/class is regenerated per load, prefer `getByRole(..., { name, exact: true })` (or another accessible-name/text locator) over an id selector, and check for the "message absent until action fires" DOM pattern before assuming `toBeVisible()`/`toBeEmpty()` is the right absence assertion — check `toHaveCount(0)` first by inspecting live DOM.
