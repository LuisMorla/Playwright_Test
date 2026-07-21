import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T14 Alerts - Prompt Box ingresando texto y aceptando', async () => {

  test('Ingresar texto en Prompt Box y aceptar - #promptResult muestra "You entered Carlos"', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerPromptAndAcceptWithText('Please enter your name', 'Carlos')
    await pageManager.onAlerts().expectPromptResult('You entered Carlos')
  })
});
