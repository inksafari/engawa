// ref: https://github.com/ricora/alg.tus-ricora.com/blob/main/src/lib/astro-integrations/pagefind.ts
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import * as path from 'node:path'
import sirv from 'sirv'
import { createIndex } from 'pagefind'

export const pagefind = () => {
  let outDir
  let pagefindDir

  return {
    name: 'pagefind',
    hooks: {
      'astro:config:setup'({ config }) {
        outDir = fileURLToPath(config.outDir)
        pagefindDir = path.join(outDir, 'pagefind')
      },
      async 'astro:server:setup'({ server, logger }) {
        if (!existsSync(pagefindDir)) {
          logger.warn(
            `pagefind output directory '${pagefindDir}' does not exist. Please run 'astro build' before running 'astro dev'. Otherwise, Pagefind will not work.`,
          )
        }

        const pagefindMiddleware = sirv(pagefindDir, { dev: true, etag: true })

        server.middlewares.use((request, res, next) => {
          if (request.url?.startsWith('/pagefind')) {
            return pagefindMiddleware(request, res, next)
          }

          return next()
        })
      },
      async 'astro:build:done'({ logger }) {
        // Create a Pagefind search index to work with
        const { index } = await createIndex({})
        if (!index) {
          throw new Error('Failed to create Pagefind index')
        }

        // Index all HTML files in a directory
        await index.addDirectory({
          path: outDir,
        })

        // Write the index to disk
        await index.writeFiles({
          outputPath: pagefindDir,
        })

        logger.info(`Pagefind index written to ${pagefindDir}`)
      },
    },
  }
}
