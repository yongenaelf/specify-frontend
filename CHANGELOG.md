# Changelog

All notable changes to this monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-29

### Added

#### Infrastructure
- Initial monorepo structure with pnpm workspaces
- Workspace configuration (`pnpm-workspace.yaml`, `package.json` workspaces)
- Shared configuration directory (`.config/`) with:
  - ESLint configuration (TypeScript support)
  - Prettier configuration
  - Jest configuration
  - TypeScript base configuration
  - Vite base configuration

#### Packages
- **@company/ui** (v1.1.0): Shared UI component library
  - Initial package structure
  - TypeScript entry point
  - Workspace dependency on @company/utils
- **@company/utils** (v1.0.0): Shared utility functions
  - Initial package structure
  - TypeScript entry point

#### Documentation
- `README.md`: Main project documentation
- `MONOREPO.md`: Detailed monorepo structure and organization
- `CONTRIBUTING.md`: Contribution guidelines
- `VERSIONING.md`: Package versioning strategy
- `.config/README.md`: Shared configuration documentation

#### Testing
- Infrastructure validation tests:
  - Workspace package recognition tests
  - Dependency hoisting validation tests
  - Workspace protocol resolution tests
  - Shared config inheritance tests

#### CI/CD
- GitHub Actions workflow for linting and testing
- Pre-commit hooks configuration structure

### Features

- **Workspace Management**: pnpm workspace recognizes all packages automatically
- **Dependency Hoisting**: Shared dependencies hoisted to root `node_modules/`
- **Workspace Protocol**: Internal package dependencies using `workspace:*`
- **Independent Versioning**: Each package maintains its own version number
- **Shared Tooling**: ESLint, Prettier, Jest, TypeScript, Vite configurations
- **Package Filtering**: Commands can target specific packages using `--filter`

### Scripts

Root-level scripts:
- `pnpm lint`: Lint all packages
- `pnpm test`: Test all packages
- `pnpm build`: Build all packages
- `pnpm format`: Format all code
- `pnpm format:check`: Check code formatting
- `pnpm filter:ui`: Convenience script for @company/ui
- `pnpm filter:utils`: Convenience script for @company/utils
- `pnpm build:all`: Build all packages and apps
- `pnpm test:changed`: Test only changed packages

[1.0.0]: https://github.com/your-org/specify-frontend/releases/tag/v1.0.0
