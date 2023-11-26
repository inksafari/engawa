# ❒ @inksafari/engawa

[![framework][framework-badge]][framework-url]
[![hosting][hosting-badge]][hosting-url]
[![GitHub commit activity][activity-badge]][activity-url]
[![Mozilla HTTP Observatory Grade][observatory-badge]][observatory-url]

@inksafari's personal, rarely-updated blog.

## backlogs

- cjk
  - webfont
- description
- anchor links
- chat bubbles
- page transitions
- categories
- unit/e2e tests
- fonts optimization at build time (subfont).
- image manipulation ( w/ [Picture component](https://astro.build/blog/astro-330/#picture-component) )
  - resizing
  - lazy loading with blurred placeholders
  - zoom
- post series
- eslint
- style guide ( [參考](https://chrisburnell.com/styleguide/) / [程式碼](https://github.com/chrisburnell/chrisburnell.com/blob/main/src/pages/styleguide.njk) )
- embeds
- shelf
- callouts

<p align="right">(<a href="#top">back to top</a>)</p>

## Features

- Built with [Astro][framework-url] and JavaScript.
  - Component Framework: [Svelte](https://svelte.dev/)
- Uses [Content Collections](https://docs.astro.build/guides/content-collections/) with [Zod schemas](/src/content/config.ts).
- Markdown & MDX support.
- ATOM/JSON Feed support.
- [Pagefind](https://pagefind.app/) static search library integration.
- Uses [starry-night](https://github.com/wooorm/starry-night) via [@Microflash/rehype-starry-night](https://github.com/Microflash/rehype-starry-night) (with [light](https://github.com/wooorm/starry-night/blob/main/style/light.css) theme) for syntax highlighting.

<p align="right">(<a href="#top">back to top</a>)</p>

## Commands

All commands are run from the root of the project, from a terminal:

| Command                        | Action                                       |
| :----------------------------- | :------------------------------------------- |
| `pnpx astro telemetry disable` | Disable data collection                      |
| `pnpm install`                 | Installs dependencies                        |
| `pnpm dev`                     | Starts local dev server at `localhost:8081`  |
| `pnpm build`                   | Build your production site to `./dist/`      |
| `pnpm preview`                 | Preview your build locally, before deploying |
| `pnpm fmt`                     | Format your code with Prettier               |

<p align="right">(<a href="#top">back to top</a>)</p>

## Configuration

- .env
- [consts.ts](src/consts.ts)
- [Footer.astro](src/components/Footer.astro)
  - [Year.svelte](src/components/Year.svelte)
- [Favicon.astro](src/components/Favicon.astro)
- [generateRSSFeed.js](src/utilities/generateRSSFeed.js)

### Setup `.env`

```ini
VITE_SITE_DOMAIN="example.net"
VITE_SITE_URL="https://example.net"
VITE_SITE_PORT=8081
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Frontmatter

In `src/content/then/yyyy-MM-dd_slug.mdx`:

<!-- prettier-ignore-start -->
```yaml
---
title: "Title of the Post"
excerpt: "This blog post is not yet ready to be seen by the world"
slug: "hello_world"
publishDate: 2021-09-07T06:59:48+09:00
updatedDate: 2022-05-10T11:01:01+08:00
isIndex: false
isDraft: true
---
```
<!-- prettier-ignore-end -->

`title`, `slug` and `publishDate` are required for all posts.

<p align="right">(<a href="#top">back to top</a>)</p>

## Credits

- This theme was inspired by
  - [boucheron.org](https://github.com/beardicus/boucheron.org)
  - [tonydang.blog](https://github.com/tonydangblog/blog/tree/main/apps/frontend/src/content/pages/now)(layouts & now page)
  - [Silvia Maggi](https://silviamaggidesign.com/colophon/)(colophon page)
  - [naiyerasif/site](https://github.com/naiyerasif/site)(syntax highlighting)
- SVG Favicon by [SVG Repo](https://www.svgrepo.com/svg/126349/bird-with-bow-tie?edit=true).
- Watercolor texture by [Freepik](https://www.freepik.com/free-vector/pastel-watercolor-painted-background_13962241.htm).

<p align="right">(<a href="#top">back to top</a>)</p>

## Licenses

All images and media are copyright to their respective owners.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- #fff6d5 -- #ffe589 #fffdcc
astro: #ff5D01

https://img.shields.io/badge/framework-Astro-f230d5.svg?style=for-the-badge&labelColor=fff6d5&logo=astro&logoColor=f230d5

https://img.shields.io/badge/framework-Astro-edf5ff.svg?style=for-the-badge&labelColor=edf5ff&logo=astro&logoColor=f230d5
 -->

[framework-badge]: https://img.shields.io/badge/framework-Astro-ff7f00.svg?style=for-the-badge&labelColor=fffdd0&logo=astro&logoColor=ff7f00
[hosting-badge]: https://img.shields.io/badge/Hosting-Deno_Deploy-informational?style=for-the-badge&labelColor=fffdd0&logo=deno&logoColor=00a300&color=00a300
[observatory-badge]: https://img.shields.io/mozilla-observatory/grade/example.com?publish&style=for-the-badge&labelColor=fffdd0&logo=mozilla&logoColor=f92f0b&color=f92f0b
[activity-badge]: https://img.shields.io/github/commit-activity/m/inksafari/engawa.svg?style=for-the-badge&labelColor=fffdd0&logo=github&logoColor=00a8ff&color=00a8ff
[framework-url]: https://astro.build
[hosting-url]: https://deno.com/deploy
[observatory-url]: https://observatory.mozilla.org
[activity-url]: https://github.com/inksafari/engawa/graphs/commit-activity
[repo-url]: https://github.com/inksafari/engawa
[repo-issues]: https://github.com/inksafari/engawa/issues
[repo-owner]: https://twitter.com/inksafari
