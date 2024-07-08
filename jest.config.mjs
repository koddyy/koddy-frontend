import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

const jestConfig = async () => {
  const jestConfig = await createJestConfig(config)();

  return {
    ...jestConfig,
    moduleNameMapper: {
      "\\.svg": "<rootDir>/__mocks__/svg.js",
      ...jestConfig.moduleNameMapper,
    },
  };
};

export default jestConfig;
