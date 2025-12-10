import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  ...compat.config({
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['react', 'react-hooks'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
  
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
 
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],

      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: ['state', 'draft'],
      }],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
];
