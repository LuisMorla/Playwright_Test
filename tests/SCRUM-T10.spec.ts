import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T10 Alerts - Activar alerta simple con "Click Button to see alert"', async () => {

  // Nota: el caso Zephyr SCRUM-T10 documenta el mensaje esperado como
  // "You triggered a box alert", pero el sitio real (demoqa.com/alerts)
  // despliega "You clicked a button" para #alertButton (confirmado por
  // inspección directa el 2026-07-20). El test se automatiza contra el
  // comportamiento real del sitio; se reporta la discrepancia para que se
  // actualice el texto esperado en Zephyr.
  test('Activar alerta simple con "Click Button to see alert" - Alerta se despliega y cierra correctamente', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerSimpleAlertAndAccept('You clicked a button')
    await pageManager.onAlerts().expectOnAlertsPage()
  })
});
