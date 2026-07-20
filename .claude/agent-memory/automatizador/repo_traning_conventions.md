---
name: repo-traning-conventions
description: Page Object Model conventions confirmed in the Traning Playwright repo (LuisMorla/Playwright_Test)
metadata:
  type: project
---

Confirmed conventions for the `Traning` repo (Playwright + TypeScript), validated while automating SCRUM-6:

- Page objects live in `page-objects/`, one class per screen, extending `HelperBase` (in `page-objects/helperBase.ts`). Constructor takes `page: Page`, calls `super(page)`, declares all `Locator`s as `private readonly` fields.
- `page-objects/pageManager.ts` aggregates all page objects; each is exposed via an `onXxx()` getter method (e.g. `onElements()`, `onRadioButton()`). When adding a new screen, instantiate it in the `PageManager` constructor and add a getter — do not create a separate fixture per page object.
- Custom test fixture lives in `test-options.ts` (not `playwright.config.ts` test object) and exports `test` (extends base). It provides:
  - `pageManager` fixture — instantiates `PageManager(page)`.
  - An `auto: true` fixture that navigates to the base URL (`https://demoqa.com/`) before every test. Individual page objects/tests still need their own `goto()` if the target screen isn't reached via UI navigation from home.
  - `fakerData` fixture for generating fake user data (only needed for form-heavy tests like Elements/Text Box).
  - Import this custom `test` from `'../test-options'` in spec files, not the default `@playwright/test` one, to get `pageManager` etc.
- Test files: one file per Zephyr test case, named with the Zephyr key, e.g. `tests/SCRUM-T2.spec.ts`. Tag `test.describe` with both Jira and Zephyr keys: `test.describe('@SCRUM-6 @SCRUM-T2 <description>', ...)`.
- `argosScreenshot` (from `@argos-ci/playwright`) is used in some describe blocks' `beforeEach` for visual regression, but it's optional/per-file — not required for purely functional test cases (skip it when the Zephyr case doesn't call for visual comparison, to avoid missing-baseline flakiness).
- Run tests with `npx playwright test <file>` before committing; the repo runs chromium/firefox/webkit projects (see `playwright.config.ts`).

See [[zephyr-scale-mcp-limitations]] for a related gap in the Zephyr Scale MCP tools used with this repo's automation flow.
