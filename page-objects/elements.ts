import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

export class Elements extends HelperBase{
    private readonly page : Page
    private readonly elementsPage : Locator
    private readonly textboxSection : Locator
    private readonly inputName : Locator
    private readonly inputEmail : Locator
    private readonly currentAddress : Locator
    private readonly permanentAddress : Locator
    private readonly submitBtn : Locator
    private readonly inputNameValidation : Locator
    private readonly inputEmailValidation : Locator
    private readonly currentAddressValidation : Locator
    private readonly permanentAddressValidation : Locator
    private readonly output : Locator
    private readonly outputParagraphs : Locator

    // Map used by expectOutputFieldAbsent() to resolve a field name to its
    // corresponding #output validation locator.
    private readonly fieldAbsentLocators : Record<'fullName' | 'email' | 'currentAddress' | 'permanentAddress', Locator>


    constructor(page : Page){
        super(page)
        this.page = page
        this.elementsPage = page.locator('.card-body h5', {hasText: 'Elements'})
        this.textboxSection = page.locator('span', {hasText: 'Text Box'})
        this.inputName = page.locator('#userName')
        this.inputEmail = page.locator('#userEmail')
        this.currentAddress = page.locator('#currentAddress')
        this.permanentAddress = page.locator('#permanentAddress')
        this.submitBtn = page.locator('#submit')
        this.inputNameValidation = page.locator('.border #name')
        this.inputEmailValidation = page.locator('.border #email')
        this.currentAddressValidation = page.locator('.border #currentAddress')
        this.permanentAddressValidation = page.locator('.border #permanentAddress')
        this.output = page.locator('#output')
        this.outputParagraphs = page.locator('#output p')
        this.fieldAbsentLocators = {
            fullName: this.inputNameValidation,
            email: this.inputEmailValidation,
            currentAddress: this.currentAddressValidation,
            permanentAddress: this.permanentAddressValidation
        }
    }

    // https://demoqa.com/text-box is reached directly here (per Zephyr
    // precondition), as opposed to elementsButton() below which navigates via
    // the Elements card UI flow used by the pre-existing full-flow test.
    async goto(){
        await this.page.goto('https://demoqa.com/text-box')
    }

    async fillFullName(name : string){
        await this.inputName.fill(name)
    }

    async fillEmail(email : string){
        await this.inputEmail.fill(email)
    }

    async fillCurrentAddress(address : string){
        await this.currentAddress.fill(address)
    }

    async fillPermanentAddress(address : string){
        await this.permanentAddress.fill(address)
    }

    async submit(){
        await this.submitBtn.click()
    }

    async expectOutputName(name : string){
        await expect(this.inputNameValidation).toContainText(`Name:${name}`)
    }

    async expectOutputEmail(email : string){
        await expect(this.inputEmailValidation).toContainText(`Email:${email}`)
    }

    async expectOutputCurrentAddress(address : string){
        await expect(this.currentAddressValidation).toContainText(`Current Address :${address}`)
    }

    // Note: demoqa.com/text-box has a real typo in its own label -
    // "Permananet Address" instead of "Permanent Address". This is
    // intentional, matching the live site and the Zephyr test data.
    async expectOutputPermanentAddress(address : string){
        await expect(this.permanentAddressValidation).toContainText(`Permananet Address :${address}`)
    }

    // For fields left empty on submit, demoqa.com/text-box simply omits the
    // corresponding <p> from #output rather than rendering it empty, so we
    // assert absence via count rather than text content.
    async expectOutputFieldAbsent(field : 'fullName' | 'email' | 'currentAddress' | 'permanentAddress'){
        await expect(this.fieldAbsentLocators[field]).toHaveCount(0)
    }

    // On an invalid email format, demoqa.com/text-box still renders the
    // #output container in the DOM, but its inner wrapper never gets the
    // "border" class and no <p> children (Name/Email/etc.) are added - i.e.
    // no data is actually output. We assert on the absence of any <p>
    // inside #output rather than on #output's own presence/count.
    async expectNoOutputData(){
        await expect(this.outputParagraphs).toHaveCount(0)
    }

    async expectEmailFieldError(){
        await expect(this.inputEmail).toHaveClass(/field-error/)
    }

    async elementsButton(){
        await this.elementsPage.click()
        await this.textboxSection.click()
    }

    async textBoxes(fName : string, email : string, cAddress : string, pAddress : string){
        await this.inputName.fill(fName)
        await this.inputEmail.fill(email)
        await this.currentAddress.fill(cAddress)
        await this.permanentAddress.fill(pAddress)
        await this.submitBtn.click()
        await expect(this.inputNameValidation).toContainText(fName)
        await expect(this.inputEmailValidation).toContainText(email)
        await expect(this.currentAddressValidation).toContainText(cAddress)
        await expect(this.permanentAddressValidation).toContainText(pAddress)
    }
}