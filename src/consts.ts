// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
// ---------------------------------------------------------------------
export let siteOwner = {
  name: '',
  twitterHandle: '',
};
// ---------------------------------------------------------------------
export let webFinger = {
  user: 'username',
  instance: 'instance.tld',
  uri: 'username@instance.tld',
};
// ---------------------------------------------------------------------
export let SCRIPT = process.env.npm_lifecycle_script || '';
export let isBuild = SCRIPT.includes('astro build');
export let isProd = import.meta.env.MODE === 'production';
export let SERVER_PORT = import.meta.env.VITE_SITE_PORT;
export let LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
export let LIVE_URL = import.meta.env.VITE_SITE_URL;
// ---------------------------------------------------------------------
export let SITE_DOMAIN = import.meta.env.VITE_SITE_DOMAIN;
export let SITE_URL = isProd ? LIVE_URL : LOCALHOST_URL;
export let SITE_TITLE = 'Slow Sour';
export let SITE_DESCRIPTION = 'Where everyday is gameday.';
export let copyrightYear = '2023';
// ---------------------------------------------------------------------
export let HTM_LANG = 'zh-Hant-TW';
export let RSS_LANG = 'zh-TW';
export let OGP_LANG = 'zh_TW';
export let SITE_TZ = 'Asia/Taipei';
// ---------------------------------------------------------------------
export let feedUrls = {
  atom: `${SITE_URL}/rss/feed.xml`,
  json: `${SITE_URL}/rss/feed.json`,
};
// ---------------------------------------------------------------------
// Date.prototype.toLocaleDateString() parameters,
// found in src/components/FormattedDate.astro.
export let dateOpts = {
  locale: RSS_LANG,
  options: {
    weekday: 'short',
    //era: 'short',
    //dayPeriod: 'long',
    year: 'numeric',
    month: 'narrow',
    day: '2-digit',
    hour: 'numeric',
    //minute: '2-digit',
    //second: 'numeric',
    hourCycle: 'h11',
    timeZone: SITE_TZ,
  },
};
// ---------------------------------------------------------------------
