/**
 * Test: Validate shared configuration inheritance
 * 
 * This test validates that packages inherit shared configuration
 * from .config/ directory and can override when needed.
 * 
 * Expected to FAIL initially - shared configs and packages don't exist yet.
 */

const fs = require('fs');
const path = require('path');

describe('Shared Configuration Inheritance', () => {
  const repoRoot = path.resolve(__dirname, '../..');
  const configDir = path.join(repoRoot, '.config');
  const uiPackageJsonPath = path.join(repoRoot, 'packages/ui/package.json');
  const utilsPackageJsonPath = path.join(repoRoot, 'packages/utils/package.json');

  test('.config directory exists with shared configs', () => {
    expect(fs.existsSync(configDir)).toBe(true);
    expect(fs.existsSync(path.join(configDir, 'eslint.config.js'))).toBe(true);
    expect(fs.existsSync(path.join(configDir, 'prettier.config.js'))).toBe(true);
    expect(fs.existsSync(path.join(configDir, 'jest.config.js'))).toBe(true);
    expect(fs.existsSync(path.join(configDir, 'tsconfig.base.json'))).toBe(true);
  });

  test('packages/ui extends shared ESLint config', () => {
    expect(fs.existsSync(uiPackageJsonPath)).toBe(true);
    const uiPackageJson = JSON.parse(fs.readFileSync(uiPackageJsonPath, 'utf8'));
    
    // Check for eslintConfig or extends in package.json
    const hasEslintConfig = uiPackageJson.eslintConfig || 
                           (uiPackageJson.eslint && uiPackageJson.eslint.extends);
    expect(hasEslintConfig).toBeDefined();
  });

  test('packages/ui extends shared TypeScript config', () => {
    expect(fs.existsSync(uiPackageJsonPath)).toBe(true);
    const uiTsConfigPath = path.join(repoRoot, 'packages/ui/tsconfig.json');
    
    if (fs.existsSync(uiTsConfigPath)) {
      const tsConfig = JSON.parse(fs.readFileSync(uiTsConfigPath, 'utf8'));
      expect(tsConfig.extends).toBeDefined();
      expect(tsConfig.extends).toMatch(/\.config\/tsconfig\.base\.json/);
    }
  });

  test('packages/utils extends shared ESLint config', () => {
    expect(fs.existsSync(utilsPackageJsonPath)).toBe(true);
    const utilsPackageJson = JSON.parse(fs.readFileSync(utilsPackageJsonPath, 'utf8'));
    
    const hasEslintConfig = utilsPackageJson.eslintConfig || 
                           (utilsPackageJson.eslint && utilsPackageJson.eslint.extends);
    expect(hasEslintConfig).toBeDefined();
  });

  test('Root package.json has lint script that runs across all packages', () => {
    const rootPackageJsonPath = path.join(repoRoot, 'package.json');
    expect(fs.existsSync(rootPackageJsonPath)).toBe(true);
    const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
    
    expect(rootPackageJson.scripts).toBeDefined();
    expect(rootPackageJson.scripts.lint).toBeDefined();
    expect(rootPackageJson.scripts.lint).toMatch(/pnpm.*filter/);
  });
});
