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
  "testRegex": "\\.(spec|test)\\.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}
