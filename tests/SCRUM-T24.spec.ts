import { test } from '../test-options'

test.describe('@SCRUM-10 @SCRUM-T24 Buttons - Clic simple sobre "Double Click Me" no despliega el mensaje de confirmación (edge case)', async () => {

  test('Un único clic izquierdo estándar en #doubleClickBtn - #doubleClickMessage NO aparece en el DOM', async ({ pageManager }) => {
    const buttons = pageManager.onButtons()
    await buttons.goto()
    await buttons.expectDoubleClickMessageAbsent()

    await buttons.singleClickDoubleClickBtn()

    await buttons.expectDoubleClickMessageAbsent()
  })
});
