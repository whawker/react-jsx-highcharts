/* eslint-env node */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/test-helper.js'],
  testMatch: ['**/test/**/*.spec.js?(x)'],
  moduleNameMapper: {
    // This forces Jest/jest-environment-jsdom to use a Node+CommonJS version of uuid, not a Browser+ESM one
    // See https://github.com/uuidjs/uuid/pull/616
    '^uuid$': require.resolve('uuid')
  }
};

module.exports = config;
