import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import gitignore from 'eslint-config-flat-gitignore';

export default [
  gitignore(),
  {
    ignores: ['**/build/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
