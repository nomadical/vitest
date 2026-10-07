import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { instances, provider } from '../../settings'

export default defineConfig({
  cacheDir: path.join(path.dirname(fileURLToPath(import.meta.url)), 'node_modules/.vite'),
  plugins: [
    {
      name: 'broken-module',
      resolveId(id) {
        if (id === 'virtual:broken') {
          return id
        }
      },
      load(id) {
        if (id === 'virtual:broken') {
          throw new Error('cannot load the broken module')
        }
      },
    },
  ],
  test: {
    browser: {
      enabled: true,
      provider,
      instances: [instances[0]],
    },
  },
})
