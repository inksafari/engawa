import rehypeKatex from 'rehype-katex';
import rehypeStarryNight from '@microflash/rehype-starry-night';
import rehypeStarryNightHeaderCaptionExtension from '@microflash/rehype-starry-night/header-caption-extension';
import rehypeStarryNightHeaderLanguageExtension from '@microflash/rehype-starry-night/header-language-extension';

export const rehypePlugins = [
  [rehypeKatex, { output: 'mathml' }],
  [
    rehypeStarryNight,
    {
      aliases: {
        env: 'ini',
        json: 'jsonc',
        log: 'sh',
      },
      headerExtensions: [
        rehypeStarryNightHeaderLanguageExtension,
        rehypeStarryNightHeaderCaptionExtension,
        (headerOptions, children) => {
          children.push({
            type: 'element',
            tagName: 'clipboard-copy',
            properties: {
              className: ['highlight-copy'],
              for: headerOptions.id,
            },
            children: [
              {
                type: 'text',
                value: 'Copy',
              },
            ],
          });
        },
      ],
    },
  ],
];
