const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const jestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  globalSetup: "<rootDir>/jest.setup.js",
  testTimeout: 60000,
};

module.exports = createJestConfig(jestConfig);
