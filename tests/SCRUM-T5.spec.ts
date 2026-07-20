import { test } from '../test-options'

test.describe('@SCRUM-6 @SCRUM-T5 Radio Button - Cambiar selección entre "Yes" e "Impressive"', async () => {

  test('Cambiar selección entre "Yes" e "Impressive" - solo una opción activa a la vez', async ({ pageManager }) => {
    await pageManager.onRadioButton().goto()
    await pageManager.onRadioButton().selectYes()
    await pageManager.onRadioButton().expectYesSelected()

    await pageManager.onRadioButton().selectImpressive()
    await pageManager.onRadioButton().expectImpressiveSelected()
    await pageManager.onRadioButton().expectYesNotSelected()
  })
});
