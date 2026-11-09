---
title: outputDir | Config
outline: deep
---

# outputDir <CRoot /> {#outputdir}

- **Type:** `string`
- **Default:** `'.vitest'`
- **CLI:** `--outputDir=<dir>`

Directory where Vitest writes its output: [attachments](/config/attachmentsdir), [blob](/guide/reporters#blob-reporter), [json](/guide/reporters#json-reporter), [junit](/guide/reporters#junit-reporter) and [html](/guide/reporters#html-reporter) reports, and reports created by custom reporters with [`vitest.createReport`](/api/advanced/vitest#createreport).

This option is resolved relative to the root Vitest config. When using [`projects`](/guide/projects), all projects share the same `outputDir`; it cannot be configured per project.

Paths configured explicitly, such as [`attachmentsDir`](/config/attachmentsdir), [`outputFile`](/config/outputfile) or the html reporter's `outputDir` option, take precedence.
