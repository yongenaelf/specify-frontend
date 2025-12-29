# Research: Monorepo Setup Decisions

**Feature**: Monorepo Structure  
**Date**: 2025-12-29  
**Purpose**: Resolve technical decisions for monorepo implementation

## Research Task 1: Package Manager Selection

**Question**: Which package manager should be used for workspace management?

**Decision**: **pnpm** with workspace support

**Rationale**:

- Superior dependency hoisting: pnpm uses a content-addressable store, achieving better hoisting rates than npm/yarn
- Faster installation: Symlink-based approach reduces disk usage and speeds up installs
- Strict dependency resolution: Prevents phantom dependencies and ensures correct dependency trees
- Workspace protocol: Native support for workspace: protocol for internal package references
- Independent versioning: Excellent support for independent package versioning
- Industry adoption: Widely used in modern frontend monorepos (Vue, Vite, etc.)

**Alternatives Considered**:

- **npm workspaces**: Native support but less efficient hoisting, slower installs
- **yarn workspaces**: Good hoisting but yarn 2+ (Berry) has compatibility concerns
- **Turborepo/Nx**: Build system tools, not package managers - can be used alongside pnpm

**Implementation**: Use `pnpm-workspace.yaml` for workspace definition, `package.json` workspaces field as fallback.

---

## Research Task 2: Build Tooling Selection

**Question**: Which build tool should be used for shared build configuration?

**Decision**: **Vite** for build tooling

**Rationale**:

- Fast development experience: HMR (Hot Module Replacement) with instant updates
- Modern tooling: Built on esbuild and Rollup, optimized for modern JavaScript
- TypeScript support: Native TypeScript support without additional configuration
- Plugin ecosystem: Rich plugin ecosystem for common frontend needs
- Code splitting: Excellent tree-shaking and code splitting capabilities
- Monorepo friendly: Works well with workspace protocols and internal package references

**Alternatives Considered**:

- **Webpack**: More complex configuration, slower builds, but more mature ecosystem
- **Rollup**: Good for libraries but less ideal for applications, no built-in dev server
- **Turborepo**: Build orchestration tool, can coordinate Vite builds across packages

**Implementation**: Shared Vite config in `.config/vite.config.base.ts`, packages extend as needed.

---

## Research Task 3: Scale and Scope Assumptions

**Question**: What are reasonable assumptions for package count and size?

**Decision**: Plan for **5-15 packages** initially, with **small to medium package size** (1-50 files per package)

**Rationale**:

- Initial scope: Start with 2-3 packages (UI components, utilities) and grow organically
- Typical frontend monorepo: Most frontend monorepos contain 5-20 packages
- Package size: Frontend packages typically smaller than backend services (components, utilities, apps)
- Scalability: Structure should support growth to 20+ packages without major refactoring
- Performance: Success criteria (30% install time reduction, <2min linting) achievable at this scale

**Assumptions**:

- Initial packages: 2-3 (UI library, utilities, maybe one app)
- Growth trajectory: Add 1-2 packages per quarter
- Package complexity: Mix of simple utilities and more complex component libraries
- Build time: Individual package builds <30s, full repo build <5min

**Implementation**: Structure supports this scale. Monitoring and optimization can be added as package count grows.

---

## Summary of Decisions

| Decision Area   | Choice        | Key Benefit                         |
| --------------- | ------------- | ----------------------------------- |
| Package Manager | pnpm          | Superior hoisting and performance   |
| Build Tooling   | Vite          | Fast development and modern tooling |
| Initial Scale   | 5-15 packages | Realistic growth trajectory         |

All NEEDS CLARIFICATION items resolved. Ready for Phase 1 design.
