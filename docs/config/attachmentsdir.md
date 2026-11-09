---
title: attachmentsDir | Config
outline: deep
---

# attachmentsDir <CRoot />

- **Type:** `string`
- **Default:** `'<outputDir>/attachments'`

Directory path for storing file attachments created by [`context.annotate`](/guide/test-context#annotate). Defaults to the `attachments` folder inside [`outputDir`](/config/outputdir).

This option is resolved relative to the root Vitest config. When using [`projects`](/guide/projects), all projects share the same `attachmentsDir`; it cannot be configured per project.
