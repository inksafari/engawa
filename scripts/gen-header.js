/* https://github.com/Non-J/personal-site/blob/main/gen_header.ts */
// https://observatory.mozilla.org/
import {
  inlineScriptHashes,
  inlineStyleHashes,
} from '../.astro/generated_hashes.mjs'

const header_template = `
Accept-CH: DPR, Viewport-Width, Width
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-DNS-Prefetch-Control: on
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-Powered-By: Zend Server 8.5.2,ASP.NET
X-Robots-Tag: noindex
X-XSS-Protection: 1; mode=block
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Referrer-Policy: no-referrer
Permissions-Policy: accelerometer=(), ambient-light-sensor=*, autoplay=(), battery=(), bluetooth(), browsing-topics=(), camera=(), clipboard-read=(self), clipboard-write=(self), geolocation=(), gyroscope=(), interest-cohort=(), join-ad-interest-group=(), magnetometer=(), microphone=(), payment=(), publickey-credentials-get=(), run-ad-auction=(), screen-wake-lock=(), serial=(), speaker-selection=(), usb=(), web-share=(), xr-spatial-tracking=()
Content-Security-Policy: !!!INJECTCSP!!!
`.trimStart()

let csp_script_hashes = inlineScriptHashes.map((x) => `'${x}'`).join(' ')
let csp_style_hashes = inlineStyleHashes.map((x) => `'${x}'`).join(' ')

const csp = `default-src 'self'; script-src 'self' static.cloudflareinsights.com ${csp_script_hashes}; style-src 'self' ${csp_style_hashes}; object-src 'none'; connect-src 'self' cloudflareinsights.com; frame-ancestors 'none'; upgrade-insecure-requests;`

const headers = header_template.replace('!!!INJECTCSP!!!', csp)

await Bun.write('dist/_headers', headers)