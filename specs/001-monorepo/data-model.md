# Data Model: Monorepo Structure

**Feature**: Monorepo Structure  
**Date**: 2025-12-29

## Entities

### Package

A discrete unit of code (library, application, or tool) within the monorepo.

**Attributes**:
- `name`: String (required) - Package name, typically scoped (e.g., `@company/ui`)
- `version`: String (required) - Semantic version (MAJOR.MINOR.PATCH) - independent per package
- `directory`: String (required) - Path relative to repository root (e.g., `packages/ui`)
- `type`: Enum (required) - Package type: `library`, `application`, `tool`
- `dependencies`: Object (optional) - External dependencies (npm packages)
- `devDependencies`: Object (optional) - Development dependencies
- `peerDependencies`: Object (optional) - Peer dependencies
- `workspaceDependencies`: Array<String> (optional) - Internal package dependencies using workspace protocol
- `scripts`: Object (optional) - Package-specific npm scripts
- `exports`: Object (optional) - Package exports configuration (ESM/CJS)

**Relationships**:
- **depends on**: Other Packages (many-to-many via workspaceDependencies)
- **belongs to**: Workspace (many-to-one)

**Validation Rules**:
- Package name MUST be unique within the workspace
- Version MUST follow semantic versioning (MAJOR.MINOR.PATCH)
- Directory path MUST exist and contain a valid `package.json`
- Workspace dependencies MUST reference valid package names within the workspace
- No circular dependencies allowed between packages

**State Transitions**:
- Package creation: New package added → registered in workspace → dependencies resolved
- Package update: Version incremented → dependent packages may need updates
- Package removal: Dependencies checked → removed from workspace → cleanup

---

### Workspace

The configuration that defines which directories are considered packages in the monorepo.

**Attributes**:
- `workspacePatterns`: Array<String> (required) - Glob patterns matching package directories (e.g., `["packages/*", "apps/*"]`)
- `packageManager`: String (required) - Package manager identifier (e.g., `pnpm`, `npm`, `yarn`)
- `hoistPattern`: Array<String> (optional) - Dependency hoisting patterns
- `publicHoistPattern`: Array<String> (optional) - Public hoisting patterns
- `shamefullyHoist`: Boolean (optional) - Fallback hoisting behavior

**Relationships**:
- **contains**: Packages (one-to-many)

**Validation Rules**:
- Workspace patterns MUST match at least one directory
- All matched directories MUST contain valid `package.json` files
- Package manager MUST be installed and compatible

**State Transitions**:
- Workspace initialization: Configuration created → packages discovered → workspace ready
- Pattern update: Patterns modified → packages re-scanned → workspace updated

---

### Shared Configuration

Centralized tooling and build configuration that applies to all packages unless overridden.

**Attributes**:
- `eslintConfig`: Object (required) - Shared ESLint configuration
- `prettierConfig`: Object (required) - Shared Prettier configuration
- `jestConfig`: Object (required) - Shared Jest configuration
- `typescriptConfig`: Object (required) - Shared TypeScript base configuration
- `viteConfig`: Object (optional) - Shared Vite build configuration
- `extends`: Array<String> (optional) - Configuration files to extend

**Relationships**:
- **applies to**: Packages (one-to-many via inheritance)

**Validation Rules**:
- Configuration files MUST be valid JSON/JavaScript
- Package-specific overrides MUST extend base configuration
- Configuration inheritance MUST be clear and documented

**State Transitions**:
- Config update: Configuration modified → packages inherit changes → validation run
- Package override: Package adds override → extends base config → merged config applied

---

## Relationships Summary

```
Workspace (1) ──contains──> (many) Package
Package (many) ──depends on──> (many) Package
Shared Configuration (1) ──applies to──> (many) Package
```

## Constraints

1. **No Circular Dependencies**: Package dependency graph MUST be acyclic
2. **Unique Names**: Package names MUST be unique within workspace
3. **Valid Paths**: Package directories MUST exist and be valid
4. **Version Format**: All package versions MUST follow semantic versioning
5. **Workspace Protocol**: Internal dependencies MUST use workspace protocol (`workspace:*`)

## Edge Cases Handled

- **Conflicting Dependency Versions**: Package manager handles version resolution, packages can specify ranges
- **Circular Dependencies**: Detected during dependency resolution, must be resolved by refactoring
- **Packages Outside Workspace**: Not recognized by workspace tooling, must be moved or pattern updated
- **Different Node.js Versions**: Handled via `.nvmrc` or `engines` field in package.json
- **Configuration Conflicts**: Package-specific configs extend base config, conflicts resolved via merge strategy
