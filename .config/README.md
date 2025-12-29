# Shared Configuration

This directory contains shared configuration files that apply to all packages in the monorepo.

## Configuration Files

### ESLint (`eslint.config.js`)

Shared ESLint configuration for code quality and linting:

- Extends `eslint:recommended` and `@typescript-eslint/recommended`
- Supports TypeScript and modern JavaScript
- Configurable rules for consistent code style

**Usage in packages:**
Add to `package.json`:

```json
{
  "eslintConfig": {
    "extends": "../../.config/eslint.config.js"
  }
}
```

### Prettier (`prettier.config.js`)

Shared Prettier configuration for code formatting:

- Consistent formatting rules across all packages
- Single quotes, semicolons, 2-space indentation

**Usage:**
Prettier automatically discovers this config file. No package-specific configuration needed unless overriding.

### Jest (`jest.config.js`)

Shared Jest configuration for testing:

- TypeScript support via `ts-jest`
- Test file patterns: `**/*.test.ts`, `**/*.spec.ts`
- Coverage collection from `src/**/*.{js,ts}`

**Usage in packages:**
Create `jest.config.js` in package:

```js
module.exports = {
  ...require('../../.config/jest.config.js'),
  // Package-specific overrides here
};
```

### TypeScript (`tsconfig.base.json`)

Base TypeScript compiler options:

- ES2020 target, ESNext modules
- Strict mode enabled
- Source maps and declarations

**Usage in packages:**
Create `tsconfig.json`:

```json
{
  "extends": "../../.config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Vite (`vite.config.base.ts`)

Base Vite build configuration:

- Output directory: `dist`
- Source maps enabled
- ESBuild minification

**Usage in packages:**
Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import baseConfig from '../../.config/vite.config.base';

export default defineConfig({
  ...baseConfig,
  // Package-specific overrides here
});
```

## Overriding Shared Configuration

Packages can override shared configuration by:

1. **Extending and modifying**: Create package-specific config that extends the shared config
2. **Selective override**: Only override specific options, inherit the rest
3. **Documentation**: Document why the override is needed

## Best Practices

- **Prefer inheritance**: Extend shared configs rather than duplicating
- **Document overrides**: Explain why package-specific config is needed
- **Keep consistent**: Only override when absolutely necessary
- **Update shared config**: When multiple packages need the same change, update shared config instead

## Adding New Shared Configuration

1. Create config file in `.config/` directory
2. Document usage in this README
3. Update packages to use the new shared config
4. Add to `.config/README.md` usage examples
