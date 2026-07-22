import { test } from '../test-options'

test.describe('@SCRUM-11 @SCRUM-T28 Frames - Retornar al documento principal (defaultContent) desde un iframe', async () => {

  test('Retornar al defaultContent desde frame1 - interacción restaurada fuera de los iframes', async ({ pageManager }) => {
    const frames = pageManager.onFrames()

    await frames.goto()

    // Foco de ejecución "dentro" de frame1 (frameLocator solo escopea esta consulta)
    await frames.expectFrame1Heading('This is a sample page')

    // Retorno implícito al contexto raíz: las siguientes acciones usan
    // locators de nivel página, fuera de cualquier iframe
    await frames.expandSidebarElementsGroup()
    await frames.expectSidebarTextBoxLinkVisible()

    await frames.expectPageLoaded()
  })
});
