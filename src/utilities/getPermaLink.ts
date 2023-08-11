import type { CollectionEntry } from "astro:content";
// import urlJoin from "url-join";
const isProd = import.meta.env.MODE === "production";

function getBaseSiteURL() {
  return isProd
    ? import.meta.env.PUBLIC_SITE_URL
    : import.meta.env.LOCALHOST_URL;
}

function postUrl(slug) {
  const baseUrl = getBaseSiteURL();
  // return urlJoin(baseUrl, slug);
  return `${baseUrl}/${slug}`;
}

// WARNING: 尚未測試
function getURLFromEntry(
  item: CollectionEntry<"page"> | CollectionEntry<"then">
): string {
  const baseUrl = getBaseSiteURL();
  switch (item.data.type) {
    case "page":
      return `${baseUrl}/${item.slug}`;
    case "then":
      return `${baseUrl}/${item.slug}`;
    default:
      return "ERROR!";
  }
}

export { getBaseSiteURL, postUrl, getURLFromEntry };
