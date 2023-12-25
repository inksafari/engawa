// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
// ---------------------------------------------------------------------
export const siteOwner = {
  // name: '',
  twitterHandle: 'inksafari',
}
// ---------------------------------------------------------------------
export const webFinger = {
  user: 'username',
  instance: 'instance.tld',
  uri: 'username@instance.tld',
}
// ---------------------------------------------------------------------
export const SCRIPT = process.env.npm_lifecycle_script || ''
export const isBuild = SCRIPT.includes('astro build')
export const isProd = import.meta.env.MODE === 'production'
export const SERVER_PORT = import.meta.env.VITE_SITE_PORT
export const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`
export const LIVE_URL = import.meta.env.VITE_SITE_URL
// ---------------------------------------------------------------------
export const SITE_DOMAIN = import.meta.env.VITE_SITE_DOMAIN
export const SITE_URL = isProd ? LIVE_URL : LOCALHOST_URL
export const SITE_TITLE = 'Slow Sour'
export const SITE_DESCRIPTION = 'Where everyday is gameday.'
export const copyrightYear = '2023'
export const WEBMENTIONS_URL = import.meta.env.VITE_WEBMENTION_URL
// ---------------------------------------------------------------------
export const HTM_LANG = 'zh-Hant-TW'
export const RSS_LANG = 'zh-TW'
export const OGP_LANG = 'zh_TW'
export const SITE_TZ = 'Asia/Taipei'
// ---------------------------------------------------------------------
export const feedUrls = {
  atom: `${SITE_URL}/rss/feed.xml`,
  json: `${SITE_URL}/rss/feed.json`,
}
// ---------------------------------------------------------------------
// Date.prototype.toLocaleDateString() parameters,
// found in src/components/FormattedDate.astro.
export const dateOpts = {
  locale: 'en-US',
  options: {
    // weekday: 'short',
    // era: 'short',
    // dayPeriod: 'long',
    year: 'numeric',
    month: 'short', // 'narrow',
    day: '2-digit',
    // hour: 'numeric',
    // minute: '2-digit',
    // second: 'numeric',
    hourCycle: 'h11',
    timeZone: SITE_TZ,
  },
}
// ---------------------------------------------------------------------
