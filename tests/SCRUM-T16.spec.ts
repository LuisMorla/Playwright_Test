import { test } from '../test-options'

test.describe('@SCRUM-9 @SCRUM-T16 Check Box - Marcar casilla raíz "Home" selecciona todos los nodos descendientes en #result', async () => {

  // Nota: Zephyr describe el texto de #result como mostrado "en negrita",
  // pero la clase real aplicada a cada item (`text-success`) tiene
  // font-weight: 400 (no bold), confirmado por inspección directa el
  // 2026-07-21. Se automatiza contra el contenido real del listado, que sí
  // coincide con lo documentado.
  test('Marcar "Home" - todos los descendientes quedan marcados y #result muestra el listado completo', async ({ pageManager }) => {
    const checkBox = pageManager.onCheckBox()
    await checkBox.goto()
    await checkBox.expectNodeUnchecked('Home')

    await checkBox.toggleCheckbox('Home')
    await checkBox.expectNodeChecked('Home')

    await checkBox.expandFullTree()
    const descendants = [
      'Desktop', 'Notes', 'Commands', 'Documents', 'WorkSpace', 'React',
      'Angular', 'Veu', 'Office', 'Public', 'Private', 'Classified',
      'General', 'Downloads', 'Word File.doc', 'Excel File.doc',
    ]
    for (const node of descendants) {
      await checkBox.expectNodeChecked(node)
    }

    await checkBox.expectResultItems([
      'home', 'desktop', 'documents', 'downloads', 'notes', 'commands',
      'workspace', 'office', 'wordFile', 'excelFile', 'react', 'angular',
      'veu', 'public', 'private', 'classified', 'general',
    ])
  })
});
