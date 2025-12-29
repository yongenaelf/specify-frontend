# Contributing to Specify Frontend Monorepo

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd specify-frontend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Verify setup**:
   ```bash
   pnpm list --depth=0  # Should show all workspace packages
   ```

## Adding a New Package

### Step-by-Step Guide

1. **Create package directory**:
   ```bash
   mkdir -p packages/new-package/src
   ```

2. **Create `package.json`**:
   ```json
   {
     "name": "@company/new-package",
     "version": "1.0.0",
     "description": "Description of your package",
     "main": "src/index.ts",
     "types": "src/index.ts",
     "scripts": {
       "build": "vite build",
       "test": "jest",
       "lint": "eslint src --ext .ts,.tsx"
     },
     "dependencies": {},
     "devDependencies": {},
     "eslintConfig": {
       "extends": "../../.config/eslint.config.js"
     }
   }
   ```

3. **Create entry point** (`src/index.ts`):
   ```typescript
   export const version = '1.0.0';
   // Your exports here
   ```

4. **Create TypeScript config** (`tsconfig.json`):
   ```json
   {
     "extends": "../../.config/tsconfig.base.json",
     "compilerOptions": {
       "outDir": "./dist",
       "rootDir": "./src"
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "**/*.test.ts"]
   }
   ```

5. **Create README.md**:
   - Document package purpose
   - Include usage examples
   - Link to related documentation

6. **Register package**:
   ```bash
   pnpm install  # Registers new package in workspace
   ```

7. **Verify package is recognized**:
   ```bash
   pnpm list --depth=0  # Should include your new package
   ```

## Adding a New Application

Applications go in the `apps/` directory and follow similar structure to packages:

1. Create directory: `apps/new-app/`
2. Create `package.json` with app-specific configuration
3. Extend shared configs as needed
4. Run `pnpm install` to register

## Development Workflow

### Running Commands

**From root (all packages)**:
```bash
pnpm lint      # Lint all packages
pnpm test      # Test all packages
pnpm build     # Build all packages
pnpm format    # Format all code
```

**For specific package**:
```bash
pnpm --filter "@company/ui" test
pnpm --filter "@company/utils" lint
```

**Using convenience scripts**:
```bash
pnpm filter:ui test    # Run test on @company/ui
pnpm filter:utils lint # Run lint on @company/utils
```

### Code Quality

- **Linting**: All code must pass ESLint checks
- **Formatting**: Code is auto-formatted with Prettier
- **Testing**: Write tests for new features
- **TypeScript**: All code should be properly typed

### Adding Dependencies

**External dependencies**:
```bash
# Add to specific package
pnpm --filter "@company/ui" add lodash

# Add dev dependency
pnpm --filter "@company/ui" add -D @types/lodash
```

**Internal dependencies** (workspace protocol):
```json
{
  "dependencies": {
    "@company/utils": "workspace:*"
  }
}
```

## Versioning

- Each package maintains **independent versioning**
- Follow [Semantic Versioning](https://semver.org/)
- See [VERSIONING.md](./VERSIONING.md) for details

### Updating Package Version

1. Make your changes
2. Determine version bump (PATCH/MINOR/MAJOR)
3. Update `version` in `package.json`
4. Update CHANGELOG if maintained
5. Commit version change

## Pull Request Process

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**:
   - Write code following project standards
   - Add tests for new features
   - Update documentation

3. **Run checks**:
   ```bash
   pnpm lint
   pnpm test
   pnpm format:check
   ```

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

5. **Push and create PR**:
   - Push your branch
   - Create pull request
   - Wait for review

## Code Style

- **TypeScript**: Use TypeScript for all new code
- **Imports**: Use ES modules (`import`/`export`)
- **Naming**: Use camelCase for variables, PascalCase for types/classes
- **Comments**: Document complex logic and public APIs

## Testing

- Write tests for new features
- Tests should be in `*.test.ts` or `*.spec.ts` files
- Run tests: `pnpm test` or `pnpm --filter "@company/package" test`

## Documentation

- Update README.md when adding features
- Document public APIs
- Include usage examples
- Update MONOREPO.md if structure changes

## Questions?

- Check [MONOREPO.md](./MONOREPO.md) for structure details
- Check [VERSIONING.md](./VERSIONING.md) for versioning strategy
- Check `.config/README.md` for configuration details
