import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    dts: {
      entry: ['src/index.ts'],
    },
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    format: ['esm'],
    external: ['react'],
    minify: !options.watch,
  }
})
