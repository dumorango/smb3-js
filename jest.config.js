module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  testMatch: ["**/?(*.)+(spec|test).[t]s?(x)"],
};
