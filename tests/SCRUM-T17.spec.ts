import { test } from '../test-options'

test.describe('@SCRUM-9 @SCRUM-T17 Check Box - Seleccionar únicamente "Notes" tras expandir Home > Desktop deja Home y Desktop en selección parcial', async () => {

  test('Expandir Home > Desktop y marcar solo "Notes" - Home y Desktop quedan indeterminados y #result = "notes"', async ({ pageManager }) => {
    const checkBox = pageManager.onCheckBox()
    await checkBox.goto()

    await checkBox.expandNode('Home')
    await checkBox.expectNodeVisible('Desktop')
    await checkBox.expectNodeVisible('Documents')
    await checkBox.expectNodeVisible('Downloads')

    await checkBox.expandNode('Desktop')
    await checkBox.expectNodeVisible('Notes')
    await checkBox.expectNodeVisible('Commands')

    await checkBox.toggleCheckbox('Notes')

    await checkBox.expectNodeChecked('Notes')
    await checkBox.expectNodeIndeterminate('Desktop')
    await checkBox.expectNodeIndeterminate('Home')

    await checkBox.expectResultItems(['notes'])
  })
});
