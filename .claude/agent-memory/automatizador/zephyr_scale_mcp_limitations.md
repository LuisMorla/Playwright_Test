---
name: zephyr-scale-mcp-limitations
description: The Zephyr Scale MCP updateTestCase tool cannot set/change a test case's status field
metadata:
  type: project
---

The `mcp__zephyr-scale__updateTestCase` tool's schema does not include a `statusName` (or any status) parameter — only `name`, `objective`, `precondition`, `estimatedTime`, `labels`, `customFields`. There is no other MCP tool exposed that updates an existing test case's status.

**Why this matters:** the automatizador workflow's last step ("actualiza el estado de cada caso de prueba a 'Automatizado'") cannot currently be completed end-to-end through the MCP tools. `createStatus` can create a new status option (e.g. "Automatizado", TEST_CASE type) in the project, but nothing in this toolset applies it to a specific test case.

**How to apply:** when finishing an automation run, create the "Automatizado" status once per project if it doesn't exist yet (via `createStatus`), then explicitly flag in the final report to the user that the status must be applied manually in the Zephyr Scale UI (or ask if a newer tool version adds this capability) — don't silently skip it or claim it was done. Re-check this limitation against the current tool schema before relying on this memory, since Zephyr Scale MCP tools may be updated.
