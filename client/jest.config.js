module.exports = {
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{ts,tsx}"
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
  "rootDir": ".",
  "setupFiles": [
    "<rootDir>/test/setupTests.ts"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/"
  ],
  "testRegex": "\\.(spec|test)\\.tsx?$",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
