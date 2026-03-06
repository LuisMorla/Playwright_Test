import { test, expect, Page, Locator } from '@playwright/test'
import { HelperBase } from './helperBase';

export class Elements extends HelperBase{
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


    constructor(page : Page){
        super(page)
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
        await expect(this.inputEmailValidation).toHaveText(fName)
        await expect(this.inputEmailValidation).toHaveText(email)
        await expect(this.currentAddressValidation).toHaveText(cAddress)
        await expect(this.permanentAddressValidation).toHaveText(pAddress)
    }
}