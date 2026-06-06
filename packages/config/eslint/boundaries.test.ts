import { describe, expect, it } from "vitest";
import { ESLint, type Linter } from "eslint";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import baseConfig, { boundariesConfig } from "./index.js";

// typescript-eslint and @repo configs produce flat-config objects whose types
// don't structurally match ESLint's own Config type; treat them as opaque here.
const overrideConfig = [
  ...baseConfig,
  {
    settings: {
      ...boundariesConfig.settings,
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: resolve(
            fileURLToPath(import.meta.url),
            "../__fixtures__/tsconfig.json",
          ),
        },
      },
      "boundaries/root-path": resolve(
        fileURLToPath(import.meta.url),
        "../__fixtures__",
      ),
    },
  },
] as unknown as Linter.Config[];

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = resolve(here, "__fixtures__");

/**
 * Lint a real fixture file inside __fixtures__ (a miniature monorepo) and
 * return its boundary violations. Files are on disk so eslint-plugin-boundaries
 * can resolve the @repo/* aliases to real elements and apply the matrix.
 */
async function boundaryViolations(relPath: string) {
  const eslint = new ESLint({
    cwd: fixtures,
    overrideConfigFile: true,
    overrideConfig,
  });
  const results = await eslint.lintFiles([resolve(fixtures, relPath)]);
  return (results[0]?.messages ?? []).filter(
    (m) => m.ruleId === "boundaries/element-types",
  );
}

describe("import boundaries (ADR-0001)", () => {
  it("flags api importing db", async () => {
    const violations = await boundaryViolations("packages/api/src/index.ts");
    expect(violations).toHaveLength(1);
  });

  it("allows core importing db", async () => {
    const violations = await boundaryViolations("packages/core/src/index.ts");
    expect(violations).toHaveLength(0);
  });

  it("flags validators importing db (leaf package, no internal deps)", async () => {
    const violations = await boundaryViolations(
      "packages/validators/src/index.ts",
    );
    expect(violations).toHaveLength(1);
  });
});
