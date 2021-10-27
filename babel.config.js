/* eslint-env node */
const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const pkg = require('./package.json');
const runtimeVersion = pkg.devDependencies['@babel/runtime'];

let config = {
  plugins: [
    [
      '@babel/transform-runtime',
      { version: runtimeVersion, useESModules: ENV === 'test' ? false : true }
    ]
  ],
  presets: [
    ['@babel/env', { modules: ENV === 'test' ? 'commonjs' : false }],
    '@babel/react'
  ]
};
if (ENV !== 'test') {
  config.plugins.push('transform-react-remove-prop-types');
}

module.exports = config;
