import eslint from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPerfPlugin from 'eslint-plugin-react-perf';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  includeIgnoreFile(gitignorePath),
  {
    name: 'global ignore',
    // If ignores is used without any other keys in the configuration object,
    // then the patterns act as global ignores.
    ignores: []
  },
  eslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.errors,
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
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
      'no-console': 'error',
      'react/prop-types': 'off',
      'prefer-object-spread': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-no-constructed-context-values': 'error'
    }
  },
  {
    name: 'jest tests',
    files: [`packages/*/test/**`],
    languageOptions: {
      globals: {
        ...globals.jest,
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
];
