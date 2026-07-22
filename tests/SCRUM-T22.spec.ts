import { test } from '../test-options'

test.describe('@SCRUM-10 @SCRUM-T22 Buttons - Clic derecho en botón "Right Click Me" despliega el mensaje de confirmación', async () => {

  test('Clic derecho en #rightClickBtn - se despliega "You have done a right click"', async ({ pageManager }) => {
    const buttons = pageManager.onButtons()
    await buttons.goto()
    await buttons.expectRightClickMessageAbsent()

    await buttons.rightClick()

    await buttons.expectRightClickMessage('You have done a right click')
  })
});
