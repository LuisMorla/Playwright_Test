---
name: project-scrum-zephyr
description: Configuración y convenciones del proyecto Jira SCRUM / Zephyr Scale para creación de casos de prueba
metadata:
  type: project
---

Proyecto Jira `SCRUM` ("Prueba IA", cloudId `facd62d4-417d-4233-b832-8ae4038578c2`, sitio
`luis0045.atlassian.net`) usa Zephyr Scale con las siguientes convenciones confirmadas:

- **Prioridades disponibles** en Zephyr para este proyecto: `High`, `Normal` (no "Medium"), `Low`.
  Al mapear "alta/media/baja" del flujo estándar del agente, usar "Normal" para "media".
- **Estados de test case**: existe `Draft` (usado como default al crear casos nuevos).
- **Folder único de test cases**: "CasesIA" (folderId `49270804`). Usarlo salvo que se cree uno
  específico por epic/feature.
- Vincular test case ↔ historia se hace con `createTestCaseIssueLink` pasando el **issueId
  numérico** de Jira (no la clave). Se obtiene leyendo el campo `id` del issue con `getJiraIssue`.
- Las historias de este proyecto (ver SCRUM-6) suelen NO tener una sección explícita de
  "Criterios de Aceptación"; solo tienen descripción en formato Como/Quiero/Para. Cuando el
  título+descripción son específicos y verificables (mencionan elementos UI concretos), es
  razonable derivar criterios de ellos en vez de bloquear todo por falta de AC formales — pero
  siempre dejar explícito en el comentario de Jira qué se derivó y qué quedó como suposición
  (p.ej. copy exacto de mensajes de confirmación en UI).
- Las historias suelen referirse a la app pública de pruebas **demoqa.com** (ya se cubrió
  demoqa.com/radio-button en SCRUM-6/SCRUM-T2..T5). Conocimiento de esa página: 3 radio buttons
  "Yes", "Impressive", "No"; "No" viene deshabilitado por defecto; al seleccionar una opción
  habilitada aparece el texto "You have selected {opción}".

Ver también [[feedback_test_case_workflow]].
