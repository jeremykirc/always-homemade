module.exports = {
  setupFiles: [
    'jest-canvas-mock',
    'raf/polyfill',
    '<rootDir>/app/webpack/tests/setup.js'
  ],
  restoreMocks: true,
  testPathIgnorePatterns: ["<rootDir>/config/webpack"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|svg)$": "<rootDir>/app/webpack/tests/__mocks__/fileMock.js",
  }
};
