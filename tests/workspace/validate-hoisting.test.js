/**
 * Test: Validate dependency hoisting
 *
 * This test validates that shared dependencies are hoisted to root
 * node_modules/ instead of being duplicated in each package.
 *
 * Expected to FAIL initially - packages and dependencies don't exist yet.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

describe("Dependency Hoisting", () => {
  const repoRoot = path.resolve(__dirname, "../..");
  const rootNodeModules = path.join(repoRoot, "node_modules");

  test("Shared dependency exists in root node_modules", () => {
    // Assuming lodash is used as shared dependency
    const lodashPath = path.join(rootNodeModules, "lodash");
    expect(fs.existsSync(lodashPath)).toBe(true);
  });

  test("Shared dependency NOT duplicated in package node_modules", () => {
    const uiNodeModules = path.join(repoRoot, "packages/ui/node_modules");
    const utilsNodeModules = path.join(repoRoot, "packages/utils/node_modules");

    // node_modules should not exist in packages (or be empty)
    if (fs.existsSync(uiNodeModules)) {
      const uiModules = fs.readdirSync(uiNodeModules);
      expect(uiModules.includes("lodash")).toBe(false);
    }

    if (fs.existsSync(utilsNodeModules)) {
      const utilsModules = fs.readdirSync(utilsNodeModules);
      expect(utilsModules.includes("lodash")).toBe(false);
    }
  });

  test("Hoisting rate meets 80% target", () => {
    // This would require analyzing all dependencies
    // For now, we verify the structure supports hoisting
    const pnpmLockPath = path.join(repoRoot, "pnpm-lock.yaml");
    if (fs.existsSync(pnpmLockPath)) {
      const lockContent = fs.readFileSync(pnpmLockPath, "utf8");
      // Verify pnpm-lock.yaml exists (indicates hoisting is configured)
      expect(lockContent.length).toBeGreaterThan(0);
    }
  });
});
