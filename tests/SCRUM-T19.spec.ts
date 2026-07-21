import { test } from '../test-options'

test.describe('@SCRUM-9 @SCRUM-T19 Check Box - Desmarcar todos los elementos seleccionados hace desaparecer #result del DOM', async () => {

  test('Con "Home" seleccionado, desmarcar "Home" - la sección #result desaparece por completo del DOM', async ({ pageManager }) => {
    const checkBox = pageManager.onCheckBox()
    await checkBox.goto()

    await checkBox.toggleCheckbox('Home')
    await checkBox.expectNodeChecked('Home')

    // Clicking "Home" a second time while it is fully checked unchecks the
    // whole subtree in one step (clicking it while indeterminate instead
    // re-checks everything - confirmed by live inspection - so this test
    // relies on Home being fully checked, not partially, before the second click).
    await checkBox.toggleCheckbox('Home')

    await checkBox.expectNodeUnchecked('Home')
    await checkBox.expectResultAbsent()
  })
});
