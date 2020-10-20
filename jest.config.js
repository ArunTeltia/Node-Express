module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts'],
  coverageThreshold: {
    // Change the threshold as the coverage grows
    global: { statements: 38, branches: 22, functions: 40, lines: 38 },
    // Add per glob coverage threshold here
  },
  projects: ['./test/jest.app.js', './test/jest.lint.js'],
  watchPlugins: ['jest-watch-select-projects'],
};
