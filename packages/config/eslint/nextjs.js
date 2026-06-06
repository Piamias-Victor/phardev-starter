import nextPlugin from "@next/eslint-plugin-next";
import baseConfig from "./base.js";

export default [
  ...baseConfig,
  nextPlugin.configs.recommended,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "error"
    }
  }
];