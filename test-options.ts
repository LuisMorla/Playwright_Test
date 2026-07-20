import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'
import {faker} from '@faker-js/faker'

export type TestOptions = {
    globalsUrl: string
    elementsPage: string
    pageManager: PageManager
    fakerData: {
        user: string,
        email: string,
        cAddress: string,
        pAddress: string
    }
}


export const test = base.extend<TestOptions>({
    globalsUrl: ['', {option:true}],

    elementsPage: [async({page}, use) =>{
            await page.goto('https://demoqa.com/');
            await use('')
    },
{
    auto: true
}],

    pageManager: async({page},use) =>{
        const pm = new PageManager(page)
        await use(pm)
    },

    fakerData: async({}, use) => {
    const nameClean = faker.internet.username()
    const randomEmail = faker.internet.email()
    const randomCity = faker.location.city()
    const randomAddress = faker.location.streetAddress()
    const randomZipCode = faker.location.zipCode()
    const randomCurrentAddress = `${randomAddress}${randomCity}${randomZipCode}`
    const randomPermanentAddress = `${randomAddress}${randomCity}${randomZipCode}`

    const generatedUser = {
        user: nameClean,
        email: randomEmail,
        cAddress: randomCurrentAddress,
        pAddress: randomPermanentAddress
    }

    await use(generatedUser)
    }
})
