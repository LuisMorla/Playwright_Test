---
name: feedback-test-case-workflow
description: Flujo confirmado que funcionó sin errores para crear/vincular casos en Zephyr Scale desde una historia de Jira
metadata:
  type: feedback
---

El flujo createTestCase → createTestCaseTestSteps (mode OVERWRITE) → createTestCaseIssueLink
funcionó sin errores en el primer intento para el proyecto SCRUM (ver [[project_scrum_zephyr]]).

**Por qué funciona:** usar OVERWRITE en el primer llamado a createTestCaseTestSteps evita pasos
placeholder vacíos que el modo APPEND podría dejar. Pasar `issueId` numérico (no la clave) a
createTestCaseIssueLink es obligatorio — el campo se llama `issueId` y espera el ID interno de
Jira (ej. 10005 para SCRUM-6), obtenible desde `getJiraIssue` (campo `id` en la respuesta, no
`key`).

**Cómo aplicar:** en próximas ejecuciones, seguir este mismo orden de llamadas por cada caso de
prueba: crear caso con folderId+priorityName+statusName ya conocidos del proyecto → cargar steps
en un solo llamado OVERWRITE con la lista completa de pasos → vincular con issueId numérico. No
hace falta tantear con APPEND primero.
