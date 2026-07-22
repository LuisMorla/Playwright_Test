import { test } from '../test-options'

test.describe('@SCRUM-11 @SCRUM-T25 Frames - Renderizado del DOM principal y ambos iframes visibles', async () => {

  test('Navegar a /frames - título/menú del DOM principal y ambos iframes (frame1/frame2) visibles', async ({ pageManager }) => {
    const frames = pageManager.onFrames()

    await frames.goto()

    await frames.expectPageLoaded()
    await frames.expectFrame1Visible()
    await frames.expectFrame2Visible()
  })
});
