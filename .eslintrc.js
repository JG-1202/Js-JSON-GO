module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    complexity: ['error', 5],
    'max-lines-per-function': ['error', { max: 25 }],
  },
};
