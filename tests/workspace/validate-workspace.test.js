/**
 * Test: Validate workspace recognizes packages
 *
 * This test validates that the pnpm workspace correctly recognizes
 * all packages defined in pnpm-workspace.yaml.
 *
 * Expected to FAIL initially - workspace infrastructure doesn't exist yet.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

describe("Workspace Package Recognition", () => {
  const repoRoot = path.resolve(__dirname, "../..");
  const workspaceConfigPath = path.join(repoRoot, "pnpm-workspace.yaml");
  const packageJsonPath = path.join(repoRoot, "package.json");

  test("pnpm-workspace.yaml exists", () => {
    expect(fs.existsSync(workspaceConfigPath)).toBe(true);
  });

  test("package.json has workspaces configuration", () => {
    expect(fs.existsSync(packageJsonPath)).toBe(true);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    expect(packageJson.workspaces).toBeDefined();
    expect(Array.isArray(packageJson.workspaces)).toBe(true);
    expect(packageJson.workspaces.length).toBeGreaterThan(0);
  });

  test("pnpm list recognizes at least 2 packages", () => {
    const output = execSync("pnpm list --depth=0", {
      cwd: repoRoot,
      encoding: "utf8",
    });

    // Count packages (excluding root)
    const packageMatches = output.match(/@company\/\w+/g);
    expect(packageMatches).toBeDefined();
    expect(packageMatches.length).toBeGreaterThanOrEqual(2);
  });

  test("packages/ui directory exists", () => {
    const uiPackagePath = path.join(repoRoot, "packages/ui");
    expect(fs.existsSync(uiPackagePath)).toBe(true);
    expect(fs.existsSync(path.join(uiPackagePath, "package.json"))).toBe(true);
  });

  test("packages/utils directory exists", () => {
    const utilsPackagePath = path.join(repoRoot, "packages/utils");
    expect(fs.existsSync(utilsPackagePath)).toBe(true);
    expect(fs.existsSync(path.join(utilsPackagePath, "package.json"))).toBe(
      true,
    );
  });
});
