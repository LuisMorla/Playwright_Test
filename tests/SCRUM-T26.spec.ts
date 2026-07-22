import { test } from '../test-options'

test.describe('@SCRUM-11 @SCRUM-T26 Frames - Cambiar contexto a Frame1 y leer su contenido', async () => {

  test('Cambiar contexto a frame1 - encabezado "This is a sample page" visible', async ({ pageManager }) => {
    const frames = pageManager.onFrames()

    await frames.goto()

    await frames.expectFrame1Heading('This is a sample page')
  })
});
