// ---------------------------------------------------------------------
// TODO: https://docs.astro.build/en/reference/configuration-reference/#experimentalenv
const isBuild = process.env.npm_lifecycle_script || ''.includes('astro build')
const isProduction = import.meta.env.MODE === 'production'
const isDevelopment = import.meta.env.MODE !== 'production'
const sitePort = import.meta.env.VITE_SITE_PORT
const localhostUrl = `http://localhost:${sitePort}`
const liveUrl = import.meta.env.VITE_SITE_URL
// ---------------------------------------------------------------------
const authorInfo = {
  // name: '',
  networks: {
    twitter: {
      platform: 'Twitter',
      id: '@inksafari',
      link: 'https://twitter.com/inksafari',
    },
    // fediverse
    // mastodon: {
    // platform: 'Mastodon',
    // user: 'username',
    // instance: 'instance.tld',
    // id: 'username@instance.tld',
    // link: 'https://instance.tld/@inksafari'
    // },
  },
}
// ---------------------------------------------------------------------
const siteInfo = {
  title: authorInfo.networks.twitter.id,
  description: 'Where everyday is gameday.',
  author: authorInfo,
  domain: import.meta.env.VITE_SITE_DOMAIN, // example.com
  siteBase: isProduction ? liveUrl : localhostUrl, // https://example.com
  port: sitePort,
  // ogImage: '/images/opengraph/default.png',
  // sitePort: import.meta.env.VITE_SITE_PORT,
  copyrightYear: '2024',
  tz: 'Asia/Taipei',
  langFull: 'zh-Hant-TW', // HTML / XML
  langFeed: 'zh-guoyu', // JSON Feed(RFC 5646)
  langOgp: 'zh_TW', // The Open Graph protocol
}
// ---------------------------------------------------------------------
const feedUrls = {
  page: new URL('rss', siteInfo.siteBase),
  atom: new URL('rss/feed.xml', siteInfo.siteBase),
  json: new URL('rss/feed.json', siteInfo.siteBase),
}
// ---------------------------------------------------------------------
// Date.prototype.toLocaleDateString() parameters,
// found in src/components/FormattedDate.astro.
const dateOptions = {
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
    timeZone: siteInfo.tz,
  },
}
// ---------------------------------------------------------------------
export {
  siteInfo as default,
  isBuild,
  isProduction,
  isDevelopment,
  feedUrls,
  dateOptions as dateOpts,
}
