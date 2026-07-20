#!/bin/bash
# Bloquea comandos de Bash que violarían los guardrails del agente automatizador:
# push directo a development, --force, y merges/aprobaciones de PR.
# Recibe el input del hook (JSON) por stdin -- ver docs de Claude Code / hooks.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Bloquear push directo a development (sin pasar por PR)
if echo "$COMMAND" | grep -iE 'git[[:space:]]+push[[:space:]].*\bdevelopment\b' > /dev/null; then
  echo "Bloqueado: no se permite push directo a development. Usa una rama nueva + Pull Request." >&2
  exit 2
fi

# Bloquear force push en cualquier rama
if echo "$COMMAND" | grep -iE 'push.*(--force|-f\b)' > /dev/null; then
  echo "Bloqueado: no se permite --force push." >&2
  exit 2
fi

# Bloquear merge o aprobación de PR (eso lo decide una persona)
if echo "$COMMAND" | grep -iE '(gh[[:space:]]+pr[[:space:]]+merge|gh[[:space:]]+pr[[:space:]]+review[[:space:]].*--approve|git[[:space:]]+merge)' > /dev/null; then
  echo "Bloqueado: mergear o aprobar un PR es una acción humana." >&2
  exit 2
fi

exit 0
