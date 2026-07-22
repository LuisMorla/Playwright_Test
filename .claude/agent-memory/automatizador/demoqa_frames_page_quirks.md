---
name: demoqa-frames-page-quirks
description: DemoQA /frames page structure and how to model Selenium-style "switch to frame / defaultContent" semantics in Playwright
metadata:
  type: project
---

Confirmed by live inspection 2026-07-22 while automating SCRUM-11 (SCRUM-T25..T28):

- `https://demoqa.com/frames` has two iframes with fixed different sizes: `#frame1` (~500x350)
  and `#frame2` (~100x100). Both contain an internal `<h1>` with the exact text
  "This is a sample page". The main document keeps its title (`h1.text-center` = "Frames") and
  left sidebar nav (e.g. `a[href="/text-box"]`, revealed after clicking the "Elements" group
  header text) outside both iframes.
- Frame2's inner content overflows its visible area (`contentDocument.body.scrollHeight` ~148 >
  `iframe.clientHeight` ~100), so it requires native iframe scrolling.
- **Playwright has no persistent "switch context" API like Selenium's
  `switchTo().frame()` / `switchTo().defaultContent()`.** `page.frameLocator('#id')` only scopes
  a *single* locator query to inside that frame — it never changes what subsequent page-level
  locators resolve against. So a Zephyr case worded as "return to defaultContent and interact
  with the sidebar" is satisfied simply by continuing to use page-level locators after having
  queried inside a frame — no explicit "switch back" call exists or is needed.
- To read/assert text inside a frame (auto-waiting), use `page.frameLocator('#id').locator(...)`.
- To scroll *inside* a frame (or otherwise need a real `Frame` object, e.g. for
  `frame.evaluate(() => window.scrollBy(...))`), `frameLocator` is insufficient because the
  scroll position lives on the frame's own `window`, not on a queryable element. Instead get the
  iframe element handle and call `.contentFrame()`:
  ```ts
  const handle = await page.locator('#frame2').elementHandle()
  const frame = await handle?.contentFrame()   // real Frame object
  await frame.evaluate(() => window.scrollBy(0, 50))
  ```
- Overflow detection: `page.locator('#frame2').evaluate((iframe: HTMLIFrameElement) => ({
  scrollHeight: iframe.contentDocument.body.scrollHeight, clientHeight: iframe.clientHeight }))`.

See [[repo-traning-conventions]] for the POM pattern this was implemented against
(`page-objects/frames.ts`, exposed via `PageManager.onFrames()`).
