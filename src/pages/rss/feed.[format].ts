export const prerender = true;
import generateRssFeed from "~/utilities/generateRSSFeed";
import { SITE_TITLE, SITE_DESCRIPTION } from "~/consts";

export const get = async ({ params, site }) => {
  if (!site) {
    return { body: "" };
  }
  const format = params.format as "xml" | "json";
  return {
    body: await generateRssFeed({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      site: site.href,
      format: format,
    }),
  };
};

export const getStaticPaths = () => {
  return [{ params: { format: "xml" } }, { params: { format: "json" } }];
};
