import { test } from '../test-options'

test.describe('@SCRUM-9 @SCRUM-T18 Check Box - Desmarcar un elemento entre varios seleccionados remueve el ítem del listado en #result', async () => {

  test('Con "Home" seleccionado, desmarcar "notes" - se remueve del listado en #result sin afectar el resto de los elementos', async ({ pageManager }) => {
    const checkBox = pageManager.onCheckBox()
    await checkBox.goto()

    await checkBox.toggleCheckbox('Home')
    await checkBox.expandNode('Home')
    await checkBox.expandNode('Desktop')

    await checkBox.toggleCheckbox('Notes')

    await checkBox.expectNodeUnchecked('Notes')
    await checkBox.expectNodeIndeterminate('Desktop')
    await checkBox.expectNodeIndeterminate('Home')

    await checkBox.expectResultItems([
      'documents', 'downloads', 'commands', 'workspace', 'office',
      'wordFile', 'excelFile', 'react', 'angular', 'veu', 'public',
      'private', 'classified', 'general',
    ])
  })
});
