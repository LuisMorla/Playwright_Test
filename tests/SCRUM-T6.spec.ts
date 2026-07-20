import { test } from '../test-options'

test.describe('@SCRUM-7 @SCRUM-T6 Text Box - Enviar formulario con todos los campos válidos', async () => {

  test('Enviar formulario Text Box con todos los campos válidos - Se muestra resumen completo en #output', async ({ pageManager }) => {
    await pageManager.onElements().goto()
    await pageManager.onElements().fillFullName('Juan Pérez')
    await pageManager.onElements().fillEmail('juan.perez@example.com')
    await pageManager.onElements().fillCurrentAddress('Calle 123, Ciudad')
    await pageManager.onElements().fillPermanentAddress('Avenida Principal 456')
    await pageManager.onElements().submit()

    await pageManager.onElements().expectOutputName('Juan Pérez')
    await pageManager.onElements().expectOutputEmail('juan.perez@example.com')
    await pageManager.onElements().expectOutputCurrentAddress('Calle 123, Ciudad')
    await pageManager.onElements().expectOutputPermanentAddress('Avenida Principal 456')
  })
});
