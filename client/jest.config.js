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
  "setupFiles": [
    "<rootDir>/test/setupTests.ts"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "testRegex": "\\.(spec|test)\\.tsx?$",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
