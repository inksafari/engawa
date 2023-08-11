# @inksafari/engawa

[![framework][framework-badge]][framework-url]
[![hosting][hosting-badge]][hosting-url]
[![GitHub commit activity][activity-badge]][activity-url]
[![Mozilla HTTP Observatory Grade][observatory-badge]][observatory-url]

@inksafari's personal, rarely-updated blog.

## backlogs

- prettier
- [microformats](https://microformats.org/wiki/)
- date
- description
- anchor links
- chat bubbles
- page transitions
- categories
- unit/e2e tests
- fonts optimization at build time (subfont).
- image manipulation (@astrojs/images).
  - resizing
  - lazy loading with blurred placeholders
  - custom markup
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
- Uses [Content Collections](https://docs.astro.build/guides/content-collections/) with [Zod schemas](/src/content/config.ts).
- Markdown & MDX support.
- RSS Feed support.
- [Pagefind](https://pagefind.app/) static search library integration.
- Uses [Shiki](https://shiki.matsu.io/) via [astro-expressive-code](https://github.com/expressive-code/expressive-code) (with `rose-pine-dawn` theme) for syntax highlighting.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                        | Action                                       |
| :----------------------------- | :------------------------------------------- |
| `pnpm astro telemetry disable` | Disable data collection.                     |
| `pnpm install`                 | Installs dependencies                        |
| `pnpm dev`                     | Starts local dev server at `localhost:8081`  |
| `pnpm build`                   | Build your production site to `./dist/`      |
| `pnpm preview`                 | Preview your build locally, before deploying |
| `pnpm fmt`                     | Format your code with Prettier               |

<p align="right">(<a href="#top">back to top</a>)</p>

## Credits

- SVG Favicon by [SVG Repo](https://www.svgrepo.com/svg/126349/bird-with-bow-tie?edit=true).
- Watercolor texture by [Freepik](https://www.freepik.com/free-vector/pastel-watercolor-painted-background_13962241.htm).
- CSS styles by [rakuishi.com](https://github.com/rakuishi/rakuishi.com).
- layouts & now page by [tonydang.blog](https://github.com/tonydangblog/blog/tree/main/apps/frontend/src/content/pages/now).
- Colophon page by [Silvia Maggi](https://silviamaggidesign.com/colophon/).

<p align="right">(<a href="#top">back to top</a>)</p>

## Licenses

The texts (articles, writings, etc) are licensed under the terms of [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-nc-sa/4.0/).

All images are copyright to their respective owners.

<!-- MARKDOWN LINKS & IMAGES -->

[framework-badge]: https://img.shields.io/badge/framework-Astro-ff7f00.svg?style=for-the-badge&labelColor=fff6d5&logo=astro
[hosting-badge]: https://img.shields.io/badge/Cloud-Deno_Deploy-informational?style=for-the-badge&labelColor=fff6d5&logo=deno&logoColor=00a300&color=00a300
[observatory-badge]: https://img.shields.io/mozilla-observatory/grade/example.com?publish&style=for-the-badge&labelColor=fff6d5&logo=mozilla&logoColor=f92f0b&color=f92f0b
[activity-badge]: https://img.shields.io/github/commit-activity/m/inksafari/engawa.svg?style=for-the-badge&labelColor=fff6d5&logo=github&logoColor=00a8ff&color=00a8ff
[framework-url]: https://astro.build
[hosting-url]: https://deno.com/deploy
[observatory-url]: https://observatory.mozilla.org
[activity-url]: https://github.com/inksafari/engawa/graphs/commit-activity
[repo-url]: https://github.com/inksafari/engawa
[repo-issues]: https://github.com/inksafari/engawa/issues
[repo-owner]: https://twitter.com/inksafari
