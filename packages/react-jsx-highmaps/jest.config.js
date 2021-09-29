/* eslint-env node */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/test-helper.js'],
  testMatch: ['**/test/**/*.spec.js?(x)']
};

module.exports = config;
