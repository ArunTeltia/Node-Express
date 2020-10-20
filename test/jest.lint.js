/* eslint-disable @typescript-eslint/unbound-method */
/* eslint @typescript-eslint/no-var-requires: "off" */

const { join } = require('path');

module.exports = {
  rootDir: join(__dirname, '..'),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.ts'],
};
