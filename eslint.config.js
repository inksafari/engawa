import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import astroParser from 'astro-eslint-parser'
import astroPlugin from 'eslint-plugin-astro'
import svxParser from 'svelte-eslint-parser'
import svxPlugin from 'eslint-plugin-svelte'
import { default as noUnsanitized } from 'eslint-plugin-no-unsanitized'
// import { default as onlyWarn } from 'eslint-plugin-only-warn';
import perfectionist from 'eslint-plugin-perfectionist'
import sonarjs from 'eslint-plugin-sonarjs'
import xss from 'eslint-plugin-xss'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // https://github.com/antfu/eslint-config/blob/main/src/globs.ts
    ignores: [
      '.astro/**',
      '.unlighthouse/**',
      'coverage/**',
      'dist/**',
      'node_modules/**',
      'public/**',
    ],
  },
  {
    plugins: {
      // onlyWarn,
      // https://github.com/azat-io/eslint-plugin-perfectionist
      perfectionist, // prettier: prettierPlugin,
    },
    rules: {
      'capitalized-comments': 'off',
    },
  },
  {
    files: ['**/*.?([cm])[jt]s?(x)'],
    ignores: ['**/*.map.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // https://github.com/sindresorhus/globals/blob/main/globals.json
        // ...globals.commonjs,
        // ...globals.es2022,
        ...globals.browser,
        ...globals.node,
        matchMedia: true,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      // https://github.com/mozilla/eslint-plugin-no-unsanitized
      'no-unsanitized': noUnsanitized,
      // https://github.com/SonarSource/eslint-plugin-sonarjs
      sonarjs,
      // https://github.com/Rantanen/eslint-plugin-xss
      xss,
    },
    rules: {
      ...jsPlugin.configs.recommended.rules, // 取代eslint:recommend
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
      'sonarjs/cognitive-complexity': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'xss/no-location-href-assign': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts', '**/*.map.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
    },
  },
  // https://github.com/ota-meshi/astro-eslint-parser
  // https://ota-meshi.github.io/eslint-plugin-astro/rules/
  {
    files: ['**/*.astro'],
    languageOptions: {
      sourceType: 'module',
      parser: astroParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.astro'],
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
      },
      globals: {
        Astro: 'readonly',
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      // ...astroPlugin.configs.all.rules,
      // 'astro/...': ['error', {...}]
    },
  },
  // https://github.com/sveltejs/svelte-eslint-parser
  // https://sveltejs.github.io/eslint-plugin-svelte/rules/
  {
    files: ['**/*.svelte'],
    languageOptions: {
      sourceType: 'module',
      parser: svxParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.svelte'],
        parser: {
          js: 'espree',
          ts: '@typescript-eslint/parser',
          typescript: '@typescript-eslint/parser',
        },
      },
    },
    plugins: {
      svelte: svxPlugin,
    },
    processor: svxPlugin.processors['.svelte'],
    rules: {
      // ...svxPlugin.configs.all.rules,
      ...svxPlugin.configs.recommended.rules,
      'svelte/html-quotes': ['error', { prefer: 'double' }],
      'svelte/indent': [
        'error',
        {
          indent: 2,
          // 'switchCase': 1,
        },
      ],
    },
  },
]
