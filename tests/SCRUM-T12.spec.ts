import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T12 Alerts - Confirm Box seleccionando Aceptar', async () => {

  test('Confirmar acción en Confirm Box seleccionando Aceptar - #confirmResult muestra "You selected Ok"', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerConfirmAndAccept('Do you confirm action?')
    await pageManager.onAlerts().expectConfirmResult('You selected Ok')
  })
});
