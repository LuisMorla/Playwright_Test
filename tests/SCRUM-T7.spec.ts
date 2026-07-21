import { test } from '../test-options'

test.describe('@SCRUM-7 @SCRUM-T7 Text Box - Formato de email inválido bloquea el envío', async () => {

  test('Enviar formulario Text Box con formato de email inválido - Sistema bloquea el envío y marca error en el campo Email', async ({ pageManager }) => {
    await pageManager.onElements().goto()

    // Variante 1: email sin arroba ("juan.perez.com"), resto de campos válidos
    await pageManager.onElements().fillFullName('Juan Pérez')
    await pageManager.onElements().fillCurrentAddress('Calle 123, Ciudad')
    await pageManager.onElements().fillPermanentAddress('Avenida Principal 456')
    await pageManager.onElements().fillEmail('juan.perez.com')
    await pageManager.onElements().submit()

    await pageManager.onElements().expectNoOutputData()
    await pageManager.onElements().expectEmailFieldError()

    // Variante 2: email sin dominio completo ("juan@domain")
    await pageManager.onElements().fillEmail('juan@domain')
    await pageManager.onElements().submit()

    await pageManager.onElements().expectNoOutputData()
    await pageManager.onElements().expectEmailFieldError()
  })
});
