module.exports = {
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
  "setupTestFrameworkScriptFile": "./test/setup.ts",
  "testRegex": "\\.(spec|test)\\.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  }
}
