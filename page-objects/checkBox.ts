import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

// https://demoqa.com/checkbox renders its tree with the `rc-tree` library
// (antd Tree), NOT the `react-checkbox-tree` library that the Zephyr case
// SCRUM-T20 selectors (`.rct-option-expand-all` / `.rct-option-collapse-all`)
// were written against. Confirmed by direct DOM inspection on 2026-07-21:
// there is no "Expand all"/"Collapse all" toolbar anywhere on the live page -
// only a per-node switcher (`.rc-tree-switcher`) that expands/collapses one
// node (and its subtree) at a time. SCRUM-T20 was left out of this
// automation round for that reason (see PR description / repo memory).
//
// Node checkboxes use `.rc-tree-checkbox` with `aria-checked` =
// "false" | "true" | "mixed" (mixed = indeterminate/partial selection).
// Tree nodes are addressed via role=treeitem with an accessible name equal
// to the node's visible label (e.g. `getByRole('treeitem', { name: 'Home' })`)
// - do NOT select nodes via `.rc-tree-treenode` + index/first(): the very
// first `.rc-tree-treenode` in the DOM is a hidden phantom node rc-tree uses
// internally for measurement (aria-hidden="true", no checkbox/switcher
// child), and a `.first()`-based lookup will hang waiting for a
// `.rc-tree-switcher`/`.rc-tree-checkbox` child that phantom node never has.
//
// rc-tree unmounts collapsed children entirely (it does not just hide them
// with CSS) - a descendant node must be expanded into the DOM before it can
// be located/asserted on.
export class CheckBox extends HelperBase{
    private readonly page : Page
    private readonly result : Locator

    constructor(page : Page){
        super(page)
        this.page = page
        this.result = page.locator('#result')
    }

    async goto(){
        await this.page.goto('https://demoqa.com/checkbox')
        await this.page.waitForSelector('.rc-tree')
    }

    // NOTE: the accessible name of a rc-tree treeitem is the concatenation
    // of its hidden checkbox aria-label ("Select <name>") and its visible
    // title ("<name>"), e.g. "Select Home Home" - NOT just "Home". Using
    // `exact: true` against the plain node label therefore never matches
    // and hangs waiting for the element. Use a case-insensitive substring
    // match instead (the default for `getByRole(..., { name })` without
    // `exact`), which correctly narrows to the single node whose full
    // accessible name contains the given label. Confirmed by inspecting the
    // Playwright accessibility snapshot on 2026-07-21.
    treeItem(name : string) : Locator {
        return this.page.getByRole('treeitem', { name })
    }

    async expandNode(name : string){
        await this.treeItem(name).locator('.rc-tree-switcher').click()
    }

    async toggleCheckbox(name : string){
        await this.treeItem(name).locator('.rc-tree-checkbox').click()
    }

    // Expands the whole "Home" subtree, level by level, so every descendant
    // node becomes addressable/assertable in the DOM.
    async expandFullTree(){
        await this.expandNode('Home')
        await this.expandNode('Desktop')
        await this.expandNode('Documents')
        await this.expandNode('WorkSpace')
        await this.expandNode('Office')
        await this.expandNode('Downloads')
    }

    async expectNodeChecked(name : string){
        await expect(this.treeItem(name).locator('.rc-tree-checkbox')).toHaveAttribute('aria-checked', 'true')
    }

    async expectNodeUnchecked(name : string){
        await expect(this.treeItem(name).locator('.rc-tree-checkbox')).toHaveAttribute('aria-checked', 'false')
    }

    async expectNodeIndeterminate(name : string){
        await expect(this.treeItem(name).locator('.rc-tree-checkbox')).toHaveAttribute('aria-checked', 'mixed')
    }

    async expectNodeVisible(name : string){
        await expect(this.treeItem(name)).toBeVisible()
    }

    // #result renders a `<span>You have selected :</span>` prefix followed
    // by one `<span class="text-success">` per selected node id, with NO
    // whitespace between the spans in the DOM (visually stacked via CSS,
    // not via literal newline/space characters) - so `textContent`-based
    // assertions like `toHaveText()` on the whole container concatenate the
    // items with no separator (e.g. "documentsdownloadscommands..."),
    // confirmed by a real assertion failure while automating SCRUM-T16/17/18
    // on 2026-07-21. Assert the ordered list of items via the multi-element
    // locator form of `toHaveText()` instead, which compares one expected
    // string per matched element rather than concatenating them.
    async expectResultItems(items : string[]){
        await expect(this.result.locator('.text-success')).toHaveText(items)
    }

    // On a fully-unchecked tree, demoqa.com never adds #result to the DOM at
    // all (confirmed by live inspection) - assert via toHaveCount(0), same
    // "absent, not empty" pattern documented for /text-box and /alerts.
    async expectResultAbsent(){
        await expect(this.result).toHaveCount(0)
    }
}
