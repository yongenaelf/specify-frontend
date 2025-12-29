# Quickstart: Monorepo Setup Validation

**Feature**: Monorepo Structure  
**Date**: 2025-12-29  
**Purpose**: Test scenarios to validate monorepo implementation

## Prerequisites

- Node.js 18+ installed
- pnpm installed globally: `npm install -g pnpm`
- Git repository initialized

## Test Scenario 1: Workspace Structure Setup

**Goal**: Verify workspace recognizes packages correctly

**Steps**:
1. Create workspace configuration file (`pnpm-workspace.yaml` or `package.json` with workspaces)
2. Create at least two packages in `packages/` directory:
   - `packages/ui/package.json` with name `@company/ui`, version `1.0.0`
   - `packages/utils/package.json` with name `@company/utils`, version `1.0.0`
3. Run `pnpm install` from repository root
4. Run `pnpm list --depth=0` to see recognized packages

**Expected Result**:
- Both packages appear in workspace
- Dependencies installed successfully
- No errors about unrecognized packages

**Validation**:
```bash
# Should show both packages
pnpm list --depth=0
```

---

## Test Scenario 2: Internal Package Dependencies

**Goal**: Verify packages can reference each other using workspace protocol

**Steps**:
1. In `packages/ui/package.json`, add dependency:
   ```json
   {
     "dependencies": {
       "@company/utils": "workspace:*"
     }
   }
   ```
2. Run `pnpm install` from root
3. In `packages/ui/src/index.ts`, import from utils:
   ```typescript
   import { someUtil } from '@company/utils';
   ```
4. Build or type-check the ui package

**Expected Result**:
- Dependency resolves correctly
- No module resolution errors
- TypeScript/types work correctly

**Validation**:
```bash
cd packages/ui
pnpm build  # or pnpm type-check
```

---

## Test Scenario 3: Shared Configuration Inheritance

**Goal**: Verify packages inherit shared tooling configuration

**Steps**:
1. Create shared ESLint config: `.config/eslint.config.js`
2. Create shared Prettier config: `.config/prettier.config.js`
3. In `packages/ui/package.json`, add:
   ```json
   {
     "eslintConfig": {
       "extends": ["../../.config/eslint.config.js"]
     }
   }
   ```
4. Create a file with linting errors in `packages/ui/src/test.ts`
5. Run `pnpm lint` from root

**Expected Result**:
- Linting runs on all packages
- Shared rules apply correctly
- Package-specific overrides work if configured

**Validation**:
```bash
# From root
pnpm lint
# Should lint all packages using shared config
```

---

## Test Scenario 4: Dependency Hoisting

**Goal**: Verify shared dependencies are hoisted to root

**Steps**:
1. Add same dependency (e.g., `lodash`) to multiple packages:
   - `packages/ui/package.json`: `"lodash": "^4.17.21"`
   - `packages/utils/package.json`: `"lodash": "^4.17.21"`
2. Run `pnpm install` from root
3. Check `node_modules/` structure

**Expected Result**:
- `lodash` installed once at root `node_modules/`
- Packages can still import `lodash` correctly
- Disk usage reduced compared to separate installs

**Validation**:
```bash
# Check hoisting
ls -la node_modules/ | grep lodash
# Should see lodash at root, not in packages/*/node_modules/
```

---

## Test Scenario 5: Independent Versioning

**Goal**: Verify packages maintain independent versions

**Steps**:
1. Ensure packages have different versions:
   - `packages/ui`: version `1.0.0`
   - `packages/utils`: version `2.1.0`
2. Update `packages/ui` version to `1.1.0` in its `package.json`
3. Verify `packages/utils` version remains `2.1.0`

**Expected Result**:
- Each package version updates independently
- No cross-package version synchronization
- Version changes don't affect other packages

**Validation**:
```bash
# Check versions
cat packages/ui/package.json | grep version
cat packages/utils/package.json | grep version
# Should show different versions
```

---

## Test Scenario 6: Workspace Commands

**Goal**: Verify commands can run across all packages or target specific packages

**Steps**:
1. Add a script to all packages: `"test": "jest"`
2. Run `pnpm --filter "./packages/*" test` to test all packages
3. Run `pnpm --filter "@company/ui" test` to test specific package

**Expected Result**:
- Commands execute on filtered packages
- Output shows which packages ran
- Exit codes reflect success/failure per package

**Validation**:
```bash
# Test all packages
pnpm --filter "./packages/*" test

# Test specific package
pnpm --filter "@company/ui" test
```

---

## Test Scenario 7: New Package Addition

**Goal**: Verify adding a new package follows documented process

**Steps**:
1. Create new package directory: `packages/new-package/`
2. Create `packages/new-package/package.json` with name and version
3. Run `pnpm install` from root
4. Verify package is recognized

**Expected Result**:
- New package appears in workspace
- Can run commands targeting new package
- Follows same structure as existing packages

**Validation**:
```bash
# Should recognize new package
pnpm list --depth=0 | grep new-package

# Should be able to run commands
pnpm --filter "@company/new-package" test
```

---

## Success Criteria Validation

- **SC-001**: New package addition takes <5 minutes ✅ (Test Scenario 7)
- **SC-002**: Dependency installation time reduced ✅ (Test Scenario 4)
- **SC-003**: Linting completes in <2min ✅ (Test Scenario 3)
- **SC-004**: 80%+ dependencies hoisted ✅ (Test Scenario 4)
- **SC-005**: Internal references resolve correctly ✅ (Test Scenario 2)
- **SC-006**: Repository structure understandable ✅ (All scenarios)

## Troubleshooting

- **Packages not recognized**: Check workspace patterns match package directories
- **Dependency resolution fails**: Verify workspace protocol syntax (`workspace:*`)
- **Config not inherited**: Check extends paths are correct relative to package location
- **Hoisting issues**: Check pnpm version and hoist patterns configuration
