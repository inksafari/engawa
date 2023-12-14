import { SITE_URL } from '~/consts';

// Or `url-join`
function getURLFromEntry(slug, collection) {
  switch (collection) {
    case 'page': {
      return new URL(slug, SITE_URL);
    } // `${SITE_URL}/${slug}`;

    case 'then': {
      return new URL(slug, SITE_URL);
    } // `${SITE_URL}/${slug}`;

    default: {
      return 'ERROR!';
    }
  }
}

function removeTrailingSlash(pathname) {
  const matchTrailingSlash = /\w+\/$/;
  if (matchTrailingSlash.test(pathname)) return pathname.slice(0, -1);
  return pathname;
}

export { getURLFromEntry, removeTrailingSlash };
// @source:
// https://github.com/hendriknielaender/double-trouble/blob/main/src/utils/permalinks.js
