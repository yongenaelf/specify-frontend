# Package Versioning Strategy

This monorepo uses **independent versioning** for all packages. Each package maintains its own version number and can evolve at different rates.

## Version Format

All packages follow [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR**: Breaking changes that require consumers to update their code
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes that are backward compatible

Example versions:

- `@company/ui`: v1.2.3
- `@company/utils`: v2.0.1

## Independent Versioning

### Why Independent Versioning?

- **Flexible evolution**: Packages can evolve at different rates based on their needs
- **Clear communication**: Version numbers reflect actual changes in each package
- **Selective updates**: Consumers can update specific packages without affecting others
- **Reduced coupling**: Packages aren't forced to version together

### Example Scenario

```
Initial state:
- @company/ui: v1.0.0
- @company/utils: v1.0.0

After changes:
- @company/ui: v1.1.0 (added new component - minor change)
- @company/utils: v2.0.0 (breaking API change - major version)
```

The UI package can remain at v1.x while utils moves to v2.x independently.

## Versioning Workflow

### Updating a Package Version

1. **Make changes** to the package
2. **Determine version bump**:
   - PATCH: Bug fixes, minor improvements
   - MINOR: New features, backward compatible
   - MAJOR: Breaking changes
3. **Update version** in `package.json`:
   ```json
   {
     "version": "1.2.0"
   }
   ```
4. **Update CHANGELOG.md** (if maintained) with version and changes
5. **Commit** the version change

### Workspace Protocol and Versions

When packages depend on each other using `workspace:*`:

```json
{
  "dependencies": {
    "@company/utils": "workspace:*"
  }
}
```

The `workspace:*` protocol always resolves to the workspace version, regardless of the version number in the dependent package's `package.json`. This means:

- Version numbers are for **external consumers** and **release tracking**
- Internal workspace dependencies always use the current workspace version
- No need to update dependency versions when internal packages change

## Versioning Best Practices

1. **Start at 1.0.0**: New packages should start at v1.0.0 (not v0.x.x)
2. **Increment consistently**: Follow SemVer rules strictly
3. **Document breaking changes**: Use CHANGELOG.md to document major version changes
4. **Tag releases**: Use git tags for important versions (e.g., `@company/ui@1.2.0`)
5. **Communicate changes**: Update documentation when versions change significantly

## Version Comparison

To verify independent versioning:

```bash
# Check versions
cat packages/ui/package.json | grep version
cat packages/utils/package.json | grep version

# Should show different versions if packages evolved independently
```

## Publishing Considerations

If packages are published to npm:

- Each package is published independently
- Version numbers in `package.json` are used for npm releases
- Consumers can install specific versions: `npm install @company/ui@1.2.0`
- Workspace protocol (`workspace:*`) is replaced with actual version numbers during publish

## Related Documentation

- [MONOREPO.md](./MONOREPO.md) - Overall monorepo structure
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines including versioning
