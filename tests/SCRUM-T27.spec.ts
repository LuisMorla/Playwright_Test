import { test } from '../test-options'

test.describe('@SCRUM-11 @SCRUM-T27 Frames - Cambiar contexto a Frame2 y verificar contenido con scroll interno', async () => {

  test('Cambiar contexto a frame2 - encabezado visible y desplazamiento (scroll) interno funcional', async ({ pageManager }) => {
    const frames = pageManager.onFrames()

    await frames.goto()

    await frames.expectFrame2Heading('This is a sample page')
    await frames.expectFrame2ContentOverflows()

    await frames.scrollFrame2Down(50)

    await frames.expectFrame2ScrolledDown()
    await frames.expectMainDocumentScrollUnaffected()
  })
});
