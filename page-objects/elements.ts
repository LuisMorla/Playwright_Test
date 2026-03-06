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


    constructor(page : Page){
        super(page)
        this.elementsPage = page.locator('.card-body h5', {hasText: 'Elements'})
        this.textboxSection = page.locator('span', {hasText: 'Text Box'})
        this.inputName = page.locator('#userName')
        this.inputEmail = page.locator('#userEmail')
        this.currentAddress = page.locator('#currentAddress')
        this.permanentAddress = page.locator('#permanentAddress')
        this.submitBtn = page.locator('#submit')

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
    }
}