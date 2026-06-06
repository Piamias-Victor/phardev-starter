import baseConfig from "./eslint/index.js";

export default [
  // Fixtures contain deliberate boundary violations for tests.
  { ignores: ["eslint/__fixtures__/**"] },
  ...baseConfig,
];
