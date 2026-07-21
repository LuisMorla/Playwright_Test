import { test } from '../test-options'

test.describe('@SCRUM-10 @SCRUM-T21 Buttons - Doble clic en botón "Double Click Me" despliega el mensaje de confirmación', async () => {

  test('Doble clic en #doubleClickBtn - se despliega "You have done a double click"', async ({ pageManager }) => {
    const buttons = pageManager.onButtons()
    await buttons.goto()
    await buttons.expectDoubleClickMessageAbsent()

    await buttons.doubleClick()

    await buttons.expectDoubleClickMessage('You have done a double click')
  })
});
