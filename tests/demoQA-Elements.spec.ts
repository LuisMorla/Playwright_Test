import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';    
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.describe('Elements', async () => {
    test.beforeEach(async({page}) =>{
    await page.goto('https://demoqa.com/');
    await argosScreenshot(page, "homepage");
  })

  test('Validate Elements', async({page})=>{
    const randomFullName = faker.person.fullName()
    const nameClean = faker.person.firstName().replace(/\s/g, '')
    const randomNumber = faker.number.int(100)
    const randomEmail = `${nameClean}${randomNumber}@test.com`
    const randomCity = faker.location.city()
    const randomAddress = faker.location.streetAddress()
    const randomZipCode = faker.location.zipCode()
    const randomCurrentAddress = `${randomAddress}${randomCity}${randomZipCode}`
    const randomPermanentAddress = `${randomAddress}${randomCity}${randomZipCode}`
    const pm = new PageManager(page)
    await pm.onElements().elementsButton()
    await pm.onElements().textBoxes(randomFullName, randomEmail, randomCurrentAddress, randomPermanentAddress)
  })
});
