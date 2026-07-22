import { test, expect, Page, Locator, FrameLocator, Frame } from '@playwright/test'
import { HelperBase } from './helperBase';

// https://demoqa.com/frames renders two iframes with different fixed sizes -
// #frame1 (500x350) and #frame2 (100x100), both containing an internal <h1>
// with the exact text "This is a sample page" (confirmed by live inspection
// 2026-07-22). Frame2's inner content (scrollHeight ~148) exceeds its visible
// clientHeight (~100), so it requires native iframe scrolling - the scroll
// position lives on the frame's own `window`, not on a body element inside a
// frameLocator, so it must be driven via the frame's own contentFrame()
// Frame object (window.scrollBy) rather than a locator scoped by
// frameLocator().
//
// Playwright has no persistent "switch context" like Selenium's
// switchTo().frame()/defaultContent(): frameLocator() only scopes a single
// locator query to inside a frame and never affects subsequent page-level
// locators. So "returning to defaultContent" is modeled here simply as
// continuing to use page-level locators (e.g. the left sidebar nav, the page
// heading) after having queried inside a frame - that IS the top-level
// document context, with no extra API call needed.
export class Frames extends HelperBase {
    private readonly page: Page
    private readonly frame1El: Locator
    private readonly frame2El: Locator
    private readonly pageHeading: Locator
    private readonly sidebarElementsGroup: Locator
    private readonly textBoxLink: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.frame1El = page.locator('#frame1')
        this.frame2El = page.locator('#frame2')
        this.pageHeading = page.locator('h1.text-center')
        this.sidebarElementsGroup = page.getByText('Elements', { exact: true }).first()
        this.textBoxLink = page.locator('a[href="/text-box"]')
    }

    async goto() {
        await this.page.goto('https://demoqa.com/frames')
    }

    async expectPageLoaded() {
        await expect(this.pageHeading).toBeVisible()
        await expect(this.pageHeading).toHaveText('Frames')
    }

    async expectFrame1Visible() {
        await expect(this.frame1El).toBeVisible()
    }

    async expectFrame2Visible() {
        await expect(this.frame2El).toBeVisible()
    }

    getFrame1(): FrameLocator {
        return this.page.frameLocator('#frame1')
    }

    getFrame2(): FrameLocator {
        return this.page.frameLocator('#frame2')
    }

    async expectFrame1Heading(text: string) {
        await expect(this.getFrame1().locator('h1')).toHaveText(text)
    }

    async expectFrame2Heading(text: string) {
        await expect(this.getFrame2().locator('h1')).toHaveText(text)
    }

    private async getFrame2ContentFrame(): Promise<Frame> {
        const handle = await this.frame2El.elementHandle()
        const frame = await handle?.contentFrame()
        if (!frame) {
            throw new Error('No se pudo obtener el contentFrame de #frame2')
        }
        return frame
    }

    async expectFrame2ContentOverflows() {
        const overflow = await this.frame2El.evaluate((iframe: HTMLIFrameElement) => {
            const doc = iframe.contentDocument!
            return {
                scrollHeight: doc.body.scrollHeight,
                clientHeight: iframe.clientHeight,
            }
        })
        expect(overflow.scrollHeight).toBeGreaterThan(overflow.clientHeight)
    }

    async scrollFrame2Down(pixels: number) {
        const frame2 = await this.getFrame2ContentFrame()
        await frame2.evaluate((px) => window.scrollBy(0, px), pixels)
    }

    async expectFrame2ScrolledDown() {
        const frame2 = await this.getFrame2ContentFrame()
        const scrollY = await frame2.evaluate(() => window.scrollY)
        expect(scrollY).toBeGreaterThan(0)
    }

    async expectMainDocumentScrollUnaffected() {
        const scrollY = await this.page.evaluate(() => window.scrollY)
        expect(scrollY).toBe(0)
    }

    async expandSidebarElementsGroup() {
        await this.sidebarElementsGroup.click()
    }

    async expectSidebarTextBoxLinkVisible() {
        await expect(this.textBoxLink).toBeVisible()
    }
}
