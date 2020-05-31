module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  rules: {
    semi: 'error',
    quotes: ['error', 'single'],
    'no-trailing-spaces': 'warn',
    'prettier/prettier': 'warn',
  },
};
