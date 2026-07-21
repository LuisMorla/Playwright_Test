import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

// https://demoqa.com/alerts uses native JS dialogs (window.alert / confirm /
// prompt). These cannot be interacted with via DOM selectors - Playwright
// requires registering a page.on/once('dialog', ...) handler (or racing
// page.waitForEvent('dialog') against the triggering click) instead. Every
// trigger method below follows the Promise.all([waitForEvent, click])
// pattern so the dialog handler is registered before the click fires it.
export class Alerts extends HelperBase{
    private readonly page : Page
    private readonly alertButton : Locator
    private readonly timerAlertButton : Locator
    private readonly confirmButton : Locator
    private readonly promptButton : Locator
    private readonly confirmResult : Locator
    private readonly promptResult : Locator

    constructor(page : Page){
        super(page)
        this.page = page
        this.alertButton = page.locator('#alertButton')
        this.timerAlertButton = page.locator('#timerAlertButton')
        this.confirmButton = page.locator('#confirmButton')
        // Real id on the live site has a typo: "promtButton" (missing the
        // second "p" of "prompt"), not "promptButton". Confirmed against the
        // live DOM; matches what Zephyr's SCRUM-T14/T15 test data documents.
        this.promptButton = page.locator('#promtButton')
        this.confirmResult = page.locator('#confirmResult')
        this.promptResult = page.locator('#promptResult')
    }

    async goto(){
        await this.page.goto('https://demoqa.com/alerts')
    }

    // Triggers the simple alert and asserts its native dialog message before
    // accepting it.
    //
    // IMPORTANT: buttons whose click handler opens the dialog SYNCHRONOUSLY
    // (this one, confirmButton, promtButton) must NOT use the
    // Promise.all([page.waitForEvent('dialog'), locator.click()]) pattern -
    // it deadlocks. The renderer's main thread blocks on window.alert()
    // during the click's own event dispatch, so locator.click() will not
    // resolve until the dialog is dismissed - but with Promise.all, accept()
    // is only called after click() already resolved. Instead, register
    // page.once('dialog', ...) and call dialog.accept()/dismiss() INSIDE
    // that callback (decoupled from awaiting the click), then just
    // `await locator.click()` normally; the callback is what unblocks the
    // click. (Confirmed by a real 30s timeout failure while automating
    // SCRUM-T10/T12/T13/T14/T15 on 2026-07-20.) The timer-delayed alert
    // (triggerTimerAlertAndAccept) does NOT need this - its dialog appears
    // ~5s later via setTimeout, well after the click itself has resolved, so
    // Promise.all works fine there.
    //
    // Note (confirmed by live inspection on 2026-07-20): the real dialog
    // message is "You clicked a button", NOT "You triggered a box alert" as
    // documented in the SCRUM-T10 Zephyr case. Callers should pass the real
    // site text; this is a live-site-vs-Zephyr-documentation mismatch, not a
    // transcription error here (see repo memory for details).
    async triggerSimpleAlertAndAccept(expectedMessage : string){
        let dialogType = ''
        let dialogMessage = ''
        this.page.once('dialog', async (dialog) => {
            dialogType = dialog.type()
            dialogMessage = dialog.message()
            await dialog.accept()
        })
        await this.alertButton.click()
        expect(dialogType).toBe('alert')
        expect(dialogMessage).toBe(expectedMessage)
    }

    // Triggers the 5-second delayed alert. Also asserts that at least ~4s
    // elapsed between the click and the dialog appearing, confirming the
    // alert did not fire immediately.
    async triggerTimerAlertAndAccept(expectedMessage : string){
        const start = Date.now()
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog', { timeout: 10000 }),
            this.timerAlertButton.click(),
        ])
        const elapsedMs = Date.now() - start
        expect(elapsedMs).toBeGreaterThanOrEqual(4000)
        expect(dialog.type()).toBe('alert')
        expect(dialog.message()).toBe(expectedMessage)
        await dialog.accept()
    }

    async triggerConfirmAndAccept(expectedMessage : string){
        let dialogType = ''
        let dialogMessage = ''
        this.page.once('dialog', async (dialog) => {
            dialogType = dialog.type()
            dialogMessage = dialog.message()
            await dialog.accept()
        })
        await this.confirmButton.click()
        expect(dialogType).toBe('confirm')
        expect(dialogMessage).toBe(expectedMessage)
    }

    async triggerConfirmAndDismiss(expectedMessage : string){
        let dialogType = ''
        let dialogMessage = ''
        this.page.once('dialog', async (dialog) => {
            dialogType = dialog.type()
            dialogMessage = dialog.message()
            await dialog.dismiss()
        })
        await this.confirmButton.click()
        expect(dialogType).toBe('confirm')
        expect(dialogMessage).toBe(expectedMessage)
    }

    // dialog.accept(text) types the given text into the native prompt before
    // accepting it - this is the Playwright-native equivalent of "typing
    // into the prompt field", there is no DOM input to fill().
    async triggerPromptAndAcceptWithText(expectedMessage : string, textToEnter : string){
        let dialogType = ''
        let dialogMessage = ''
        this.page.once('dialog', async (dialog) => {
            dialogType = dialog.type()
            dialogMessage = dialog.message()
            await dialog.accept(textToEnter)
        })
        await this.promptButton.click()
        expect(dialogType).toBe('prompt')
        expect(dialogMessage).toBe(expectedMessage)
    }

    async triggerPromptAndDismiss(expectedMessage : string){
        let dialogType = ''
        let dialogMessage = ''
        this.page.once('dialog', async (dialog) => {
            dialogType = dialog.type()
            dialogMessage = dialog.message()
            await dialog.dismiss()
        })
        await this.promptButton.click()
        expect(dialogType).toBe('prompt')
        expect(dialogMessage).toBe(expectedMessage)
    }

    async expectOnAlertsPage(){
        await expect(this.page).toHaveURL(/\/alerts$/)
    }

    async expectConfirmResult(text : string){
        await expect(this.confirmResult).toHaveText(text)
    }

    async expectPromptResult(text : string){
        await expect(this.promptResult).toHaveText(text)
    }

    // On a dismissed/cancelled prompt with no text entered, demoqa.com never
    // adds #promptResult to the DOM at all (confirmed by live inspection) -
    // assert via toHaveCount(0) rather than checking for empty text.
    async expectPromptResultAbsent(){
        await expect(this.promptResult).toHaveCount(0)
    }
}
