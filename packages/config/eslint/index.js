import js from "@eslint/js";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

/**
 * Shared flat ESLint config for the monorepo.
 *
 * The `boundaries` plugin makes the package dependency graph from ADR-0001
 * and ADR-0003 executable: each workspace package is an "element" whose
 * allowed imports are declared once, here, instead of restated per package.
 *
 * Element types (by path):
 *   db         -> data layer (Prisma). Importable ONLY by core (ADR-0001).
 *   core       -> Services + Domain Errors. Only place that touches Prisma.
 *   api        -> tRPC routers. Imports core + validators, NEVER db (ADR-0001).
 *   validators -> shared Zod schemas. No internal deps.
 *   web        -> Next.js app. Imports api, core (RSC direct, ADR-0003), validators.
 *   config     -> this package. Imported by all, imports no internal package.
 */
export const boundariesConfig = {
  plugins: { boundaries },
  settings: {
    // Resolve workspace aliases (@repo/db -> packages/db) so inter-package
    // imports classify as internal elements instead of external node_modules.
    "import/resolver": {
      typescript: { alwaysTryTypes: true },
    },
    "boundaries/flag-as-external": {
      unresolvableAlias: true,
      inNodeModules: true,
      outsideRootPath: false,
    },
    "boundaries/elements": [
      { type: "config", pattern: "packages/config", mode: "folder" },
      { type: "db", pattern: "packages/db", mode: "folder" },
      { type: "core", pattern: "packages/core", mode: "folder" },
      { type: "api", pattern: "packages/api", mode: "folder" },
      { type: "validators", pattern: "packages/validators", mode: "folder" },
      { type: "web", pattern: "apps/web", mode: "folder" },
    ],
  },
  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          { from: "core", allow: ["db", "validators", "config"] },
          { from: "api", allow: ["core", "validators", "config"] },
          { from: "web", allow: ["api", "core", "validators", "config"] },
          { from: "validators", allow: ["config"] },
          { from: "db", allow: ["config"] },
          { from: "config", allow: [] },
        ],
      },
    ],
  },
};

/** Base config array consumed by each package's eslint.config.js. */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  boundariesConfig,
);
