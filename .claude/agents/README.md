# Agentes de QA para Claude Code — Setup

Este primer borrador ya está en el formato real que Claude Code espera
(archivos Markdown con frontmatter YAML en `.claude/agents/`), no un
pseudo-prompt genérico. Instálalo así:

```
tu-repo/
├── .claude/
│   └── agents/
│       ├── tester.md
│       ├── automatizador.md
│       └── orquestador.md
├── .mcp.json
└── scripts/
    └── validate-git-guardrails.sh
```

## 1. Conectar Jira y Zephyr Scale (MCP)

**Jira** tiene MCP oficial de Atlassian (Remote MCP Server). Se agrega así:

```bash
claude mcp add atlassian --transport http https://mcp.atlassian.com/v1/mcp/authv2 --scope project
```

Esto crea/actualiza `.mcp.json` en la raíz del repo, que puedes commitear para
que el equipo comparta la misma configuración. La autenticación es OAuth (se
abre el navegador la primera vez) o API token, según prefieras.

**Zephyr Scale NO tiene MCP oficial** (es un producto de SmartBear, no de
Atlassian). Existen varios servidores MCP comunitarios que envuelven la REST
API v2 de Zephyr Scale (ej. `mcp-zephyr-scale`, `zephyr-scale-mcp`). Antes de
usar cualquiera de estos en producción:
- Revisa el código fuente (son proyectos de terceros, no mantenidos por
  Atlassian/SmartBear ni por Anthropic).
- Verifica que tu token de Zephyr Scale se maneje solo por variables de entorno,
  nunca hardcodeado.

Ejemplo de `.mcp.json` combinando ambos (ajusta el nombre del paquete de Zephyr
al que decidas auditar y usar):

```json
{
  "mcpServers": {
    "atlassian": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v1/mcp/authv2"
    },
    "zephyr-scale": {
      "command": "npx",
      "args": ["-y", "<paquete-mcp-zephyr-que-elijas>"],
      "env": {
        "ZEPHYR_BASE_URL": "https://tu-empresa.atlassian.net",
        "ZEPHYR_API_TOKEN": "${ZEPHYR_API_TOKEN}",
        "JIRA_USERNAME": "${JIRA_USERNAME}",
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}"
      }
    }
  }
}
```

Usa variables de entorno del shell (`${VAR}`), nunca el valor literal del
token, y no commitees `.env` con credenciales reales.

Los nombres exactos de las herramientas (`mcp__atlassian__...`,
`mcp__zephyr-scale__...`) los verás corriendo `/mcp` dentro de una sesión de
Claude Code una vez conectado — ajusta las referencias en `tester.md` y
`automatizador.md` si tu servidor de Zephyr expone nombres distintos.

## 2. Jenkins

No hace falta MCP para Jenkins: el agente `orquestador` dispara el job y
consulta su estado con `curl` contra la API REST de Jenkins (vía la
herramienta `Bash`), usando un token de API guardado en una variable de
entorno (nunca en el prompt ni en el historial de comandos).

## 3. Guardrails (hook de git)

`automatizador.md` referencia `./scripts/validate-git-guardrails.sh` en su
frontmatter (`hooks.PreToolUse`). Ese script bloquea a nivel de comando —no
solo por instrucción en el prompt— los intentos de push directo a
`development`, `--force push`, y merges/aprobaciones de PR. Dale permisos de
ejecución:

```bash
chmod +x scripts/validate-git-guardrails.sh
```

## 4. Memoria persistente (aprendizaje de errores)

Cada agente tiene `memory: project` en su frontmatter. Claude Code crea
automáticamente `.claude/agent-memory/<nombre-agente>/MEMORY.md` y le da al
agente instrucciones para leerlo antes de trabajar y actualizarlo al terminar
— esto es lo que reemplaza a un "log de errores" hecho a mano: es una feature
nativa de Claude Code pensada exactamente para esto. Como el scope es
`project`, esos archivos se pueden commitear al repo para que el conocimiento
se comparta con el equipo.

## 5. Cómo correrlo

- **Flujo completo automático:** `claude --agent orquestador` (toma el hilo
  principal de la sesión y coordina todo).
- **Paso a paso, con control manual:** dentro de una sesión normal de Claude
  Code, pide explícitamente por nombre: *"usa el agente tester para
  PROJ-1234"*, revisa el resultado, y luego *"usa el agente automatizador para
  los casos que creó el tester"*.

## 6. Qué falta afinar (siguiente iteración)

- Confirmar el paquete MCP de Zephyr Scale a usar (o decidir construir uno
  propio, más controlado, si ninguno comunitario convence).
- Definir el nombre exacto del job de Jenkins y sus parámetros.
- Decidir el criterio numérico para "fallo flaky conocido" en el orquestador
  (hoy queda a criterio del agente vía su memoria).
- Cuando se sume Karate/WebdriverIO/Maestro: crear un subagente hermano por
  framework (ver nota en `automatizador.md`), no modificar este archivo.
