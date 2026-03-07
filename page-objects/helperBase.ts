import { test, expect, Page, Locator } from '@playwright/test'

export class HelperBase{
    private readonly page : Page

    constructor(page : Page){
        this.page = page
    }

    async setTimeoutInSeconds(number : number){
        await this.page.waitForTimeout(number * 100)
    }
}