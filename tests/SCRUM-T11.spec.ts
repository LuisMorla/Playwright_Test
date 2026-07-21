import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T11 Alerts - Activar alerta con retraso de 5 segundos', async () => {

  test('Activar alerta con retraso de 5 segundos - Alerta aparece con el mensaje correcto tras la espera', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerTimerAlertAndAccept('This alert appeared after 5 seconds')
    await pageManager.onAlerts().expectOnAlertsPage()
  })
});
