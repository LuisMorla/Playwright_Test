import { test } from '../test-options'

test.describe('@SCRUM-7 @SCRUM-T9 Text Box - Edge case: completar únicamente Full Name', async () => {

  test('Enviar formulario Text Box completando únicamente Full Name (edge case) - Output muestra solo ese campo', async ({ pageManager }) => {
    await pageManager.onElements().goto()
    await pageManager.onElements().fillFullName('Juan Pérez')
    await pageManager.onElements().submit()

    // Comportamiento confirmado contra el sitio real (2026-07-20): con solo
    // Full Name diligenciado, #output despliega únicamente "Name:Juan Pérez"
    // y omite por completo las líneas de Email/Current Address/Permanent
    // Address, coincidiendo con lo documentado en Zephyr (no se observó el
    // comportamiento alterno que motivó el punto abierto en Jira).
    await pageManager.onElements().expectOutputName('Juan Pérez')
    await pageManager.onElements().expectOutputFieldAbsent('email')
    await pageManager.onElements().expectOutputFieldAbsent('currentAddress')
    await pageManager.onElements().expectOutputFieldAbsent('permanentAddress')
  })
});
