module.exports = {
  env: {
    "es6": true,
    "node": true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "google",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "packages/functions/tsconfig.json",
      "packages/functions/tsconfig.dev.json",
    ],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import", "jest"],
  rules: {
    quotes: ["error", "double"],
  },
};
