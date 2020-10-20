/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint @typescript-eslint/no-var-requires: "off" */

const { join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  rootDir: join(__dirname, '..'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  displayName: 'app',
};
