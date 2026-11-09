import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'pathe'
import { expect, test } from 'vitest'
import { buildTestTree, runInlineTests, runVitest } from '../../test-utils'

const annotatedTest = {
  'hello.txt': 'hello',
  'basic.test.ts': `
import { test } from 'vitest'

test('annotated', async ({ annotate }) => {
  await annotate('notice', { path: './hello.txt' })
})
`,
}

test('writes attachments and reports into outputDir', async () => {
  const { stderr, root, ctx } = await runInlineTests(annotatedTest, {
    outputDir: 'custom-output',
    reporters: ['blob', 'json', 'junit'],
  })

  expect(stderr).toBe('')
  expect(ctx!.config.outputDir).toBe(resolve(root, 'custom-output'))
  expect(ctx!.config.attachmentsDir).toBe(resolve(root, 'custom-output/attachments'))
  expect(readdirSync(resolve(root, 'custom-output')).sort()).toMatchInlineSnapshot(`
    [
      "attachments",
      "blob",
      "json",
      "junit",
    ]
  `)
  expect(existsSync(resolve(root, '.vitest'))).toBe(false)
})

test('createReport() uses outputDir', async () => {
  const { root, ctx } = await runInlineTests(annotatedTest, {
    outputDir: 'custom-output',
    reporters: 'none',
  })

  expect(ctx!.createReport('my-reporter').root).toBe(resolve(root, 'custom-output/my-reporter'))
})

test('explicit attachmentsDir is resolved against root', async () => {
  const { root, ctx } = await runInlineTests(annotatedTest, {
    outputDir: 'custom-output',
    attachmentsDir: 'my-attachments',
    reporters: 'none',
  })

  expect(ctx!.config.attachmentsDir).toBe(resolve(root, 'my-attachments'))
  expect(readdirSync(resolve(root, 'my-attachments'))).toHaveLength(1)
})

test('--merge-reports without a path reads blobs from outputDir', async () => {
  const { root } = await runInlineTests(annotatedTest, {
    outputDir: 'custom-output',
    reporters: ['blob'],
  })

  const { stderr, ctx } = await runVitest({
    root,
    outputDir: 'custom-output',
    reporters: 'none',
    $cliOptions: { mergeReports: '' },
  })

  expect(stderr).toBe('')
  expect(ctx!.config.mergeReports).toBe(resolve(root, 'custom-output/blob'))
  expect(buildTestTree(ctx!.state.getTestModules())).toMatchInlineSnapshot(`
    {
      "basic.test.ts": {
        "annotated": "passed",
      },
    }
  `)
})
