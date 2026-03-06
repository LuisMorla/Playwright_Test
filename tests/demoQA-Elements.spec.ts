import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';    

test.describe('Elements', async () => {
    test.beforeEach(async({page}) =>{
    await page.goto('https://demoqa.com/');
  })

  test('Validate Elements', async({page})=>{
    const pm = new PageManager(page)
    await pm.onElements().elementsButton()
    await pm.onElements().textBoxes('Luis', 'test@test.com', 'Calle 21 NO 12', 'SD, DN')
  })
});
