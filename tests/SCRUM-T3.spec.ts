import { test } from '../test-options'

test.describe('@SCRUM-6 @SCRUM-T3 Radio Button - Seleccionar "Impressive" habilitado', async () => {

  test('Seleccionar radio button "Impressive" habilitado - selección procesada correctamente', async ({ pageManager }) => {
    await pageManager.onRadioButton().goto()
    await pageManager.onRadioButton().selectImpressive()
    await pageManager.onRadioButton().expectImpressiveSelected()
  })
});
