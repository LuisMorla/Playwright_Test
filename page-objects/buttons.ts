import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

// https://demoqa.com/buttons renders three buttons: #doubleClickBtn and
// #rightClickBtn have stable ids, but the third ("Click Me") button's id/class
// is generated dynamically on every page load (e.g. id="Zsr8p") - confirmed by
// live inspection on 2026-07-21, matching what SCRUM-T23 documents. It must be
// located by its accessible name instead of an id. `exact: true` is required
// because "Double Click Me" and "Right Click Me" both contain the substring
// "Click Me" and would otherwise also match.
//
// None of the three confirmation message elements (#doubleClickMessage,
// #rightClickMessage, #dynamicClickMessage) exist in the DOM until their
// corresponding action fires - confirmed by live inspection - so absence is
// asserted via toHaveCount(0), the same "absent, not empty" pattern used on
// /text-box, /alerts and /checkbox (see repo memory).
export class Buttons extends HelperBase{
    private readonly page : Page
    private readonly doubleClickBtn : Locator
    private readonly rightClickBtn : Locator
    private readonly dynamicClickBtn : Locator
    private readonly doubleClickMessage : Locator
    private readonly rightClickMessage : Locator
    private readonly dynamicClickMessage : Locator

    constructor(page : Page){
        super(page)
        this.page = page
        this.doubleClickBtn = page.locator('#doubleClickBtn')
        this.rightClickBtn = page.locator('#rightClickBtn')
        this.dynamicClickBtn = page.getByRole('button', { name: 'Click Me', exact: true })
        this.doubleClickMessage = page.locator('#doubleClickMessage')
        this.rightClickMessage = page.locator('#rightClickMessage')
        this.dynamicClickMessage = page.locator('#dynamicClickMessage')
    }

    async goto(){
        await this.page.goto('https://demoqa.com/buttons')
    }

    async doubleClick(){
        await this.doubleClickBtn.dblclick()
    }

    async singleClickDoubleClickBtn(){
        await this.doubleClickBtn.click()
    }

    async rightClick(){
        await this.rightClickBtn.click({ button: 'right' })
    }

    async clickDynamicButton(){
        await this.dynamicClickBtn.click()
    }

    async expectDoubleClickMessage(text : string){
        await expect(this.doubleClickMessage).toHaveText(text)
    }

    async expectDoubleClickMessageAbsent(){
        await expect(this.doubleClickMessage).toHaveCount(0)
    }

    async expectRightClickMessage(text : string){
        await expect(this.rightClickMessage).toHaveText(text)
    }

    async expectRightClickMessageAbsent(){
        await expect(this.rightClickMessage).toHaveCount(0)
    }

    async expectDynamicClickMessage(text : string){
        await expect(this.dynamicClickMessage).toHaveText(text)
    }

    async expectDynamicClickMessageAbsent(){
        await expect(this.dynamicClickMessage).toHaveCount(0)
    }
}
