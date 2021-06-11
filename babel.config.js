/* eslint-env node */
const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

let config = {
  plugins: [],
  presets: [
    ['@babel/env', { modules: ENV === 'test' ? 'commonjs' : false }],
    '@babel/react'
  ]
};
if (ENV !== 'test') {
  config.plugins.push('transform-react-remove-prop-types');
}

module.exports = config;
