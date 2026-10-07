import { expect, test } from 'vitest'

test('vite error overlay is not rendered', async () => {
  // @ts-expect-error the module does not exist
  await expect(import('virtual:broken')).rejects.toThrow()

  // the error is sent to the Vite client asynchronously
  await new Promise((resolve) => setTimeout(resolve, 500))

  expect(document.querySelector('vite-error-overlay')).toBeNull()
  expect(window.parent.document.querySelector('vite-error-overlay')).toBeNull()
})
