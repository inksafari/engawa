import rehypeKatex from 'rehype-katex';
import rehypeStarryNight from '@microflash/rehype-starry-night';

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
    },
  ],
];
