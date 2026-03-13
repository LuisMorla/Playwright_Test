import { expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';    
import { argosScreenshot } from "@argos-ci/playwright";
import { test } from '../test-options'

test.describe('Elements', async () => {
    test.beforeEach(async({page}) =>{
    await argosScreenshot(page, "homepage");
  })

  test('Validate Elements', async({page, pageManager, fakerData, vrt})=>{
    await pageManager.onElements().elementsButton()
    await pageManager.onElements().textBoxes(fakerData.user, fakerData.email, fakerData.cAddress, fakerData.pAddress)
await vrt.trackPage(page, 'Home Page DemoQA')
  })
});
