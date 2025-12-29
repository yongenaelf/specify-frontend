# Monorepo Structure Documentation

This document explains the repository structure and package organization for the Specify Frontend monorepo.

## Repository Structure

```
specify-frontend/
├── packages/          # Shared libraries and components
│   ├── ui/           # UI component library
│   └── utils/        # Utility functions
├── apps/             # Applications that consume packages
├── .config/          # Shared configuration files
│   ├── eslint.config.js
│   ├── prettier.config.js
│   ├── jest.config.js
│   ├── tsconfig.base.json
│   └── vite.config.base.ts
├── tests/            # Infrastructure validation tests
├── package.json       # Root workspace configuration
└── pnpm-workspace.yaml # Workspace patterns
```

## Package Organization

### Packages Directory (`packages/`)

Contains shared libraries that can be used across multiple applications:

- **@company/ui**: Shared UI component library
- **@company/utils**: Shared utility functions

Each package:

- Has its own `package.json` with unique scoped name
- Maintains independent versioning
- Can depend on other packages using workspace protocol
- Inherits shared configuration from `.config/`

### Apps Directory (`apps/`)

Contains applications that consume packages. Applications are full-featured apps that use packages from `packages/`.

## Adding a New Package

1. **Create package directory**:

   ```bash
   mkdir -p packages/new-package/src
   ```

2. **Create package.json**:

   ```json
   {
     "name": "@company/new-package",
     "version": "1.0.0",
     "main": "src/index.ts",
     "types": "src/index.ts"
   }
   ```

3. **Register in workspace**:
   - Packages in `packages/*` are automatically recognized by pnpm workspace
   - Run `pnpm install` from root to register

4. **Add initial files**:
   - `src/index.ts` - Entry point
   - `README.md` - Package documentation

5. **Extend shared configuration**:
   - Add `eslintConfig` to package.json pointing to `.config/eslint.config.js`
   - Create `tsconfig.json` extending `.config/tsconfig.base.json`

## Workspace Protocol

Internal package dependencies use the `workspace:` protocol:

```json
{
  "dependencies": {
    "@company/utils": "workspace:*"
  }
}
```

This ensures packages reference each other correctly within the monorepo.

### How Workspace Protocol Works

- `workspace:*` - Always resolves to the current workspace version
- `workspace:^1.0.0` - Resolves to workspace version matching ^1.0.0
- `workspace:~1.0.0` - Resolves to workspace version matching ~1.0.0

The workspace protocol allows packages to reference each other without needing to know exact versions. When you import from an internal package:

```typescript
import { utilityFunction } from "@company/utils";
```

TypeScript and the build system resolve this using the workspace protocol, ensuring you always get the current workspace version regardless of version numbers in package.json.

### Internal Dependency Patterns

**Example: packages/ui depends on packages/utils**

1. Add dependency in `packages/ui/package.json`:

   ```json
   {
     "dependencies": {
       "@company/utils": "workspace:*"
     }
   }
   ```

2. Import in code:

   ```typescript
   import { utilityFunction } from "@company/utils";
   ```

3. Run `pnpm install` to link packages

4. The import resolves correctly, and TypeScript can type-check it

## Versioning Strategy

Each package maintains **independent versioning**:

- Packages can evolve at different rates
- Version updates don't affect other packages
- Follow semantic versioning (MAJOR.MINOR.PATCH)

Example:

- `@company/ui`: v1.2.3
- `@company/utils`: v2.0.1

## Shared Configuration

All packages inherit shared configuration from `.config/`:

- **ESLint**: Code quality and linting rules
- **Prettier**: Code formatting
- **Jest**: Testing configuration
- **TypeScript**: Compiler options
- **Vite**: Build configuration

Packages can override shared configs when needed by adding package-specific configuration files.

## Commands

Run commands from the repository root:

```bash
# Install all dependencies
pnpm install

# Run linting across all packages
pnpm lint

# Run tests across all packages
pnpm test

# Build all packages
pnpm build

# Run command on specific package
pnpm --filter "@company/ui" test
```

## Workspace Recognition

The workspace recognizes packages through:

- `pnpm-workspace.yaml` - Defines workspace patterns (`packages/*`, `apps/*`)
- `package.json` workspaces field - Alternative workspace configuration

Both packages and apps are automatically discovered and managed by pnpm.
