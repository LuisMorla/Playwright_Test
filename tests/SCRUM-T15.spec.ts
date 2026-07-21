import { test } from '../test-options'

test.describe('@SCRUM-8 @SCRUM-T15 Alerts - Cancelar Prompt Box sin ingresar datos', async () => {

  test('Cancelar Prompt Box sin ingresar datos - No se genera texto en #promptResult', async ({ pageManager }) => {
    await pageManager.onAlerts().goto()
    await pageManager.onAlerts().triggerPromptAndDismiss('Please enter your name')
    await pageManager.onAlerts().expectPromptResultAbsent()
  })
});
