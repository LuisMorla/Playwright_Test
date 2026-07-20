import { test } from '../test-options'

test.describe('@SCRUM-6 @SCRUM-T2 Radio Button - Seleccionar "Yes" habilitado', async () => {

  test('Seleccionar radio button "Yes" habilitado - selección procesada correctamente', async ({ pageManager }) => {
    await pageManager.onRadioButton().goto()
    await pageManager.onRadioButton().selectYes()
    await pageManager.onRadioButton().expectYesSelected()
  })
});
