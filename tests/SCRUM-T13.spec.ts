import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T13 Alerts - Confirm Box seleccionando Cancelar', async () => {

  test('Cancelar acción en Confirm Box seleccionando Cancelar - #confirmResult muestra "You selected Cancel"', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerConfirmAndDismiss('Do you confirm action?')
    await pageManager.onAlerts().expectConfirmResult('You selected Cancel')
  })
});
