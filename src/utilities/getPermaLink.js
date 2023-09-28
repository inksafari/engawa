import { SITE_URL } from '~/consts';

// or `url-join`
function getURLFromEntry(slug, collection) {
  switch (collection) {
    case 'page':
      return new URL(slug, SITE_URL); //`${SITE_URL}/${slug}`;
    case 'then':
      return new URL(slug, SITE_URL); //`${SITE_URL}/${slug}`;
    default:
      return 'ERROR!';
  }
}

export { getURLFromEntry };
// @source:
// https://github.com/hendriknielaender/double-trouble/blob/main/src/utils/permalinks.js
