import { expect, test } from 'vitest'
import { runBrowserTests } from './utils'

test('vite error overlay does not capture the page', async () => {
  const result = await runBrowserTests({
    root: './fixtures/vite-error-overlay',
  })
  expect(result.errorTree()).toMatchInlineSnapshot(`
    {
      "basic.test.ts": {
        "vite error overlay is not rendered": "passed",
      },
    }
  `)
})
