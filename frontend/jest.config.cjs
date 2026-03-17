module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.js"],
  testMatch: ["<rootDir>/src/**/*.test.jsx", "<rootDir>/src/**/*.test.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp|avif)$": "<rootDir>/src/test/fileMock.js",
  },
  clearMocks: true,
}
