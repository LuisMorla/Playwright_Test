import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';    

test.describe('Elements', async () => {
    test.beforeEach(async({page}) =>{
    await page.goto('https://playwright.dev/');
  })

  test('Validate Elements', async({page})=>{
    const pm = new PageManager(page)
  })
});
