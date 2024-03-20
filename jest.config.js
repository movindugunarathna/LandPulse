const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
    coverageProvider: "v8",
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    roots: ["<rootDir>/src"],
    moduleNameMapper: {
        "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
        "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
        "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
        "assets/(.*)": [
            "<rootDir>/images/$1",
            "<rootDir>/photos/$1",
            "<rootDir>/recipes/$1",
        ],
        "@/(.*)$": "<rootDir>/src/$1",
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
