module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'brace-style': 'off',
    'no-dupe-else-if': 'off',
    '@typescript-eslint/brace-style': ['error'],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/default-param-last': ['error'],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],
    'semi': [2, 'always'],
    '@typescript-eslint/semi': ['error'],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'space-before-function-paren': 'off',
    "no-unused-vars": ["warn", { "vars": "all", "ignoreRestSiblings": false }],
    '@typescript-eslint/space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }]
  }
}
