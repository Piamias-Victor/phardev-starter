import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "max-lines": ["error", { "max": 100, "skipComments": true, "skipBlankLines": true }],
      "no-restricted-imports": ["error", { "patterns": ["../../../*"] }],
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    },
    "ignores": ["node_modules/**", "dist/**", ".next/**", "coverage/**"]
  }
);