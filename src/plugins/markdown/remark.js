import gfm from "remark-gfm";
import { visit } from "unist-util-visit";

export const remarkPlugins = [
  gfm, // tables
  shortcodePlugin,
  descriptionPlugin,
];

export function shortcodePlugin() {
  return function (tree, file) {
    visit(tree, ["html"], (node) => {
      // img
      node.value = node.value.replace(
        /<img alt="(.*?)" src="(.+?)" width="(\d*?)" height="(\d*?)">/g,
        '<p><img alt="$1" src="$2" width="$3" height="$4" loading="lazy"></p>'
      );
      node.value = node.value.replace(
        /<img alt="(.*?)" src="(.+?)">/g,
        '<p><img alt="$1" src="$2" loading="lazy"></p>'
      );

      // youtube
      node.value = node.value.replace(
        /<youtube (.+?)>/g,
        '<div class="iframe-wrapper"><iframe width="640" height="360" src="https://www.youtube.com/embed/$1" allowfullscreen frameborder="0"></iframe></div>'
      );
    });
  };
}

export function descriptionPlugin() {
  return function (tree, file) {
    var description = "";
    const types = ["text", "link", "inlineCode", "listItem"];
    for (let i = 0; i < tree.children.length; i++) {
      if (!tree.children[i].children) {
        continue;
      }
      let type = tree.children[i].children[0].type;
      if (types.includes(type)) {
        visit(tree.children[i], types, (node) => {
          if (node.value) {
            description += node.value;
          }
        });
        break;
      }
    }
    file.data.astro.frontmatter.description = description;
  };
}
