import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPerfPlugin from 'eslint-plugin-react-perf';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    name: 'global ignore',
    // If ignores is used without any other keys in the configuration object,
    // then the patterns act as global ignores.
    ignores: []
  },
  {
    files: [`**/*.{js,jsx,cjs,mjs,ts,tsx}`]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPerfPlugin.configs.flat['recommended'],
  {
    plugins: { 'react-hooks': reactHooksPlugin },
    settings: {
      // version config for eslint-plugin-react
      react: {
        version: 'detect'
      }
    }
  },
  prettierRecommended,
  {
    name: 'src and test rules',
    files: ['packages/*/+(src|test)/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly'
      }
    },
    rules: {
      'no-console': 'error',
      'react/prop-types': 'off',
      'prefer-object-spread': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, args: 'none', caughtErrors: 'none' }
      ]
    }
  },
  {
    name: 'tests',
    files: [`packages/*/test/**`],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.node
      }
    },
    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-array-as-prop': 'off'
    }
  },
  {
    // rules for everybody else
    ignores: [`packages/*/+(src|test)/**`],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]);
