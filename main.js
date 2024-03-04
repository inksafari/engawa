/**
 * @refs:
 * https://deno.com/blog/deploy-static-files
 * https://gist.github.com/RickCogley/d4246b9f2817a401f0943149c255697d
 */
import { Application } from 'https://deno.land/x/oak@v12.6.0/mod.ts'

const app = new Application()

// Logger
app.use(async (context, next) => {
  await next()
  const rt = context.response.headers.get('X-Response-Time')
  console.log(`${context.request.method} ${context.request.url} - ${rt}`)
})

// Timing
app.use(async (context, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  context.response.headers.set('X-Response-Time', `${ms}ms`)
  // ctx.response.headers.set('X-Custom-Header', 'Hi!');
  context.response.headers.set('X-Powered-By', 'Gunicorn/21.0.1')
  context.response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  )
  context.response.headers.set('X-Content-Type-Options', 'nosniff')
  context.response.headers.set('X-Download-Options', 'noopen')
  context.response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  context.response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  context.response.headers.set('X-XSS-Protection', '1; mode=block')
  context.response.headers.set('Accept-CH', 'DPR, Viewport-Width, Width')
  context.response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
  context.response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), ambient-light-sensor=*, autoplay=(self), battery=(self), camera=(), cross-origin-isolated=*, fullscreen=*, geolocation=(self), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), speaker=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), browsing-topics=(), join-ad-interest-group=(), run-ad-auction=()',
  )
})

app.use(async (context) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/dist`,
      index: 'index.html',
    })
  } catch {
    context.response.status = 404
    context.response.body = '404 | Page not Found'
  }
})

await app.listen({ port: 8081 })
// Or partykit
// https://docs.partykit.io/examples/
// https://github.com/hola-soy-milk/astro-party/
