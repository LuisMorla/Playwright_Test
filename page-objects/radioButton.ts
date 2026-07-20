import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

export class RadioButton extends HelperBase{
    private readonly page : Page
    private readonly yesRadioLabel : Locator
    private readonly impressiveRadioLabel : Locator
    private readonly noRadioLabel : Locator
    private readonly yesRadioInput : Locator
    private readonly impressiveRadioInput : Locator
    private readonly noRadioInput : Locator
    private readonly confirmationMessage : Locator

    constructor(page : Page){
        super(page)
        this.page = page
        this.yesRadioLabel = page.locator('label[for="yesRadio"]')
        this.impressiveRadioLabel = page.locator('label[for="impressiveRadio"]')
        this.noRadioLabel = page.locator('label[for="noRadio"]')
        this.yesRadioInput = page.locator('#yesRadio')
        this.impressiveRadioInput = page.locator('#impressiveRadio')
        this.noRadioInput = page.locator('#noRadio')
        this.confirmationMessage = page.locator('p.mt-3 span.text-success')
    }

    async goto(){
        await this.page.goto('https://demoqa.com/radio-button')
    }

    async selectYes(){
        await this.yesRadioLabel.click()
    }

    async selectImpressive(){
        await this.impressiveRadioLabel.click()
    }

    // The "No" option is rendered disabled. A regular click times out because
    // the label/input never becomes actionable, so we use a forced click to
    // simulate a user attempt and confirm the browser/HTML disabled state
    // blocks the interaction (no check, no confirmation message).
    async attemptSelectDisabledNo(){
        await this.noRadioInput.click({ force: true })
    }

    async expectYesSelected(){
        await expect(this.yesRadioInput).toBeChecked()
        await expect(this.confirmationMessage).toHaveText('Yes')
    }

    async expectImpressiveSelected(){
        await expect(this.impressiveRadioInput).toBeChecked()
        await expect(this.confirmationMessage).toHaveText('Impressive')
    }

    async expectYesNotSelected(){
        await expect(this.yesRadioInput).not.toBeChecked()
    }

    async expectNoIsDisabled(){
        await expect(this.noRadioInput).toBeDisabled()
    }

    async expectNoNotSelectedAndNoConfirmation(){
        await expect(this.noRadioInput).not.toBeChecked()
        await expect(this.confirmationMessage).toHaveCount(0)
    }
}
