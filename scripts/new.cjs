const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");
const { exec } = require("child_process");

const slug = process.argv[2];
if (!slug) {
  console.log("Usage: npm run new [slug]");
  process.exit(1);
}

const date = new Date();
const yaml = `---
categories:
  - 雑記
publishDate: "${format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx")}"
slug: ${slug}
title: ""
isDraft: true
isIndex: false
---
`;
const filename = `${format(date, "yyyy-MM-dd")}_${slug}.md`;
const dest = path.join(process.cwd(), "src/content/then", filename);
fs.writeFileSync(dest, yaml);
exec(`open ${dest}`);
// or
// https://github.com/bdevos/appjeniksaan-site/blob/main/create.ts
// https://github.com/KraHsu/HsuBlog/blob/main/hsublog-cli.ts
