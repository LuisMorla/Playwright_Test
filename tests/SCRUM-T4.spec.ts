import { test } from '../test-options'

test.describe('@SCRUM-6 @SCRUM-T4 Radio Button - Intentar seleccionar "No" deshabilitado', async () => {

  test('Intentar seleccionar radio button "No" deshabilitado - selección restringida', async ({ pageManager }) => {
    await pageManager.onRadioButton().goto()
    await pageManager.onRadioButton().expectNoIsDisabled()
    await pageManager.onRadioButton().attemptSelectDisabledNo()
    await pageManager.onRadioButton().expectNoNotSelectedAndNoConfirmation()
  })
});
