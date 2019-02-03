module.exports = {
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageReporters": [
    "lcov",
    "text"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "roots": [
    "test"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/test/setup.ts",
  "testEnvironment": "node",
  "testRegex": "\\.(spec|test)\\.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}
