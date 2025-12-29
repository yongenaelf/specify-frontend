# Specify Frontend Monorepo

This repository uses a monorepo structure to organize multiple packages and applications within a single codebase, enabling code sharing and coordinated development.

## Structure

```
packages/          # Shared libraries and components
├── ui/           # UI component library (@company/ui)
└── utils/        # Utility functions (@company/utils)
apps/              # Applications that consume packages
.config/           # Shared configuration files
├── eslint.config.js
├── prettier.config.js
├── jest.config.js
├── tsconfig.base.json
└── vite.config.base.ts
tests/             # Infrastructure validation tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Verify Setup

```bash
# Check workspace recognizes packages
pnpm list --depth=0

# Should show:
# - specify-frontend@1.0.0
# - @company/ui@1.1.0
# - @company/utils@1.0.0
```

## Development Commands

### All Packages

```bash
# Run linting across all packages
pnpm lint

# Run tests across all packages
pnpm test

# Build all packages
pnpm build

# Format all code
pnpm format

# Check formatting
pnpm format:check
```

### Specific Package

```bash
# Run command on specific package
pnpm --filter "@company/ui" test
pnpm --filter "@company/utils" lint

# Or use convenience scripts
pnpm filter:ui test
pnpm filter:utils lint
```

## Workspace Configuration

This monorepo uses pnpm workspaces. Workspace configuration is defined in:

- `pnpm-workspace.yaml` - Workspace patterns (`packages/*`, `apps/*`)
- `package.json` - Root workspace configuration with scripts

## Package Management

### Adding Dependencies

**External dependency**:

```bash
pnpm --filter "@company/ui" add lodash
```

**Internal dependency** (workspace protocol):

```json
{
  "dependencies": {
    "@company/utils": "workspace:*"
  }
}
```

### Dependency Hoisting

Shared dependencies are automatically hoisted to root `node_modules/`:

- Reduces disk usage
- Speeds up installation
- Ensures consistent versions

## Adding a New Package

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guide.

Quick steps:

1. Create `packages/new-package/` directory
2. Add `package.json` with scoped name (`@company/new-package`)
3. Create `src/index.ts` entry point
4. Create `tsconfig.json` extending `.config/tsconfig.base.json`
5. Run `pnpm install` to register
6. Extend shared configs (ESLint, etc.)

## Versioning

Each package maintains **independent versioning**:

- `@company/ui`: v1.1.0
- `@company/utils`: v1.0.0

See [VERSIONING.md](./VERSIONING.md) for details.

## Documentation

- **[MONOREPO.md](./MONOREPO.md)** - Detailed monorepo structure, workspace protocol, package organization
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines for contributing, adding packages, development workflow
- **[VERSIONING.md](./VERSIONING.md)** - Package versioning strategy and best practices
- **[.config/README.md](./.config/README.md)** - Shared configuration documentation

## Project Status

✅ **Phase 1**: Setup complete  
✅ **Phase 2**: Foundational infrastructure complete  
✅ **Phase 2.5**: Test infrastructure complete  
✅ **Phase 3**: Workspace structure established  
✅ **Phase 4**: Shared tooling configured  
✅ **Phase 5**: Dependency management implemented

## Support

For questions or issues:

1. Check documentation files listed above
2. Review existing packages for examples
3. Check `.config/README.md` for configuration questions
