# Husky Git Hooks

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Setup

To enable pre-commit hooks:

```bash
# Install husky (if not already installed)
pnpm add -D husky

# Initialize husky
npx husky install

# Add pre-commit hook (already configured)
# The pre-commit hook runs formatting and linting checks
```

## Hooks

### pre-commit

Runs before each commit:

- Checks code formatting with Prettier
- Runs ESLint linting (if available)

To skip hooks (not recommended):

```bash
git commit --no-verify
```

## Manual Setup

If Husky is not installed, you can manually set up hooks:

```bash
# Create hooks directory
mkdir -p .git/hooks

# Copy pre-commit hook
cp .husky/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```
