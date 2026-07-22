import { test } from '../test-options'

test.describe('@SCRUM-10 @SCRUM-T23 Buttons - Clic estándar en botón "Click Me" con ID dinámico despliega el mensaje de confirmación', async () => {

  test('Clic izquierdo estándar en el botón "Click Me" (ID dinámico) - se despliega "You have done a dynamic click"', async ({ pageManager }) => {
    const buttons = pageManager.onButtons()
    await buttons.goto()
    await buttons.expectDynamicClickMessageAbsent()

    await buttons.clickDynamicButton()

    await buttons.expectDynamicClickMessage('You have done a dynamic click')
  })
});
