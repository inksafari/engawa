// @credits:
// https://github.com/jamband/blog/blob/main/scripts/clear.js
// https://github.com/r4ai/r4ai.dev/blob/main/scripts/UDEVGothic/cleanup.ts
import * as fs from 'node:fs/promises'

await fs.rmdir('.astro', { recursive: true })
await fs.rmdir('dist', { recursive: true })
// await fs.rmdir('.cache', { recursive: true })
// await fs.rmdir('node_modules/.cache', { recursive: true })
// await fs.rmdir('node_modules', { recursive: true })
// await fs.rm('bun.lockb')

console.info('✅ Done!')
