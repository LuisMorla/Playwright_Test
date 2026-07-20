import { test } from '../test-options'

test.describe('@SCRUM-7 @SCRUM-T8 Text Box - Completar solo Full Name y Email', async () => {

  test('Enviar formulario Text Box completando solo Full Name y Email - Output muestra únicamente los campos diligenciados', async ({ pageManager }) => {
    await pageManager.onElements().goto()
    await pageManager.onElements().fillFullName('Juan Pérez')
    await pageManager.onElements().fillEmail('juan.perez@example.com')
    await pageManager.onElements().submit()

    await pageManager.onElements().expectOutputName('Juan Pérez')
    await pageManager.onElements().expectOutputEmail('juan.perez@example.com')
    await pageManager.onElements().expectOutputFieldAbsent('currentAddress')
    await pageManager.onElements().expectOutputFieldAbsent('permanentAddress')
  })
});
