import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import sanitizeHtml from 'sanitize-html';
import { getURLFromEntry } from '~/utilities/getPermaLink';
import {
  SITE_URL,
  // siteOwner,
} from '~/consts';

function pubDate(dateString) {
  const date = new Date(dateString);
  date.setUTCHours(0);
  return date;
}

// TODO: 1.remark/rehype plugins 2.html-entities
// https://www.w3.org/TR/xhtml1/dtds.html#a_dtd_Latin-1_characters
// https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
function articlePipeline(input) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .freeze();

  const output = processor.processSync(String(input));
  const result = sanitizeHtml(output.value);
  // const content = result.replace(/\n/g, '');

  return result;
}

function compileHTMLForRSS(post) {
  const postUrl = getURLFromEntry(post.slug, 'then');
  const primaryHTML = articlePipeline(post.body);

  // <p>
  //   Thanks for reading this post in your RSS reader! <br />
  //   If you want to respond you can <a href="${SITE_URL}/contact">write me an Email</a>
  //   or reach out on <a href="https://twitter.com/{siteOwner.twitterHandle}">Twitter</a>.
  //  </p>
  const additionalHTML = `
    <hr /> 
    <p>
      <a href="${postUrl}">
        Read the full post on the site
      </a>
    </p>
  `;
  return sanitizeHtml(primaryHTML + additionalHTML);
}

export { pubDate, compileHTMLForRSS };
