/* eslint-env node */
const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

let config = {
  plugins: [],
  presets: [
    [
      '@babel/env',
      { modules: ENV === 'test' ? 'commonjs' : false, bugfixes: true }
    ],
    ['@babel/react', { runtime: ENV === 'es' ? 'automatic' : 'classic' }]
  ]
};

module.exports = config;
