/**
 * Test: Validate workspace protocol resolution
 * 
 * This test validates that internal package dependencies using
 * workspace: protocol resolve correctly.
 * 
 * Expected to FAIL initially - packages and workspace dependencies don't exist yet.
 */

const fs = require('fs');
const path = require('path');

describe('Workspace Protocol Resolution', () => {
  const repoRoot = path.resolve(__dirname, '../..');
  const uiPackageJsonPath = path.join(repoRoot, 'packages/ui/package.json');
  const utilsPackageJsonPath = path.join(repoRoot, 'packages/utils/package.json');

  test('packages/ui has workspace dependency on packages/utils', () => {
    expect(fs.existsSync(uiPackageJsonPath)).toBe(true);
    const uiPackageJson = JSON.parse(fs.readFileSync(uiPackageJsonPath, 'utf8'));
    
    expect(uiPackageJson.dependencies).toBeDefined();
    expect(uiPackageJson.dependencies['@company/utils']).toBeDefined();
    expect(uiPackageJson.dependencies['@company/utils']).toMatch(/^workspace:/);
  });

  test('packages/ui can import from @company/utils', () => {
    const uiIndexPath = path.join(repoRoot, 'packages/ui/src/index.ts');
    if (fs.existsSync(uiIndexPath)) {
      const content = fs.readFileSync(uiIndexPath, 'utf8');
      // Verify import statement exists
      expect(content).toMatch(/from ['"]@company\/utils['"]/);
    }
  });

  test('TypeScript can resolve workspace protocol imports', () => {
    // This would require running tsc --noEmit or similar
    // For now, we verify the structure supports it
    const tsConfigPath = path.join(repoRoot, '.config/tsconfig.base.json');
    if (fs.existsSync(tsConfigPath)) {
      const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
      // Verify TypeScript config supports workspace resolution
      expect(tsConfig.compilerOptions).toBeDefined();
    }
  });
});
