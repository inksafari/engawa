const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');
const { format } = require('date-fns');

const slug = process.argv[2];
if (!slug) {
  console.log('Usage: npm run new [slug]');
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
const filename = `${format(date, 'yyyy-MM-dd')}_${slug}.mdx`;
const dest = path.join(process.cwd(), 'src/content/then', filename);
fs.writeFileSync(dest, yaml);
exec(`open ${dest}`);
// Or
// https://github.com/bdevos/appjeniksaan-site/blob/main/create.ts
// https://github.com/KraHsu/HsuBlog/blob/main/hsublog-cli.ts
// https://github.com/naiyerasif/site/blob/main/etc/bin/post.js
