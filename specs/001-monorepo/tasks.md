# Tasks: Monorepo Structure

**Input**: Design documents from `/specs/001-monorepo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Infrastructure validation test tasks included per Constitution Principle II (Test-First Development - NON-NEGOTIABLE). Tests must be written and fail before implementation begins.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo structure**: `packages/`, `apps/`, `.config/` at repository root
- Paths follow plan.md structure: packages for libraries, apps for applications, .config for shared configs

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create directory structure: packages/, apps/, .config/ at repository root
- [x] T002 [P] Create .gitignore with monorepo-specific ignores (.gitignore)
- [x] T003 [P] Create README.md with monorepo overview and structure documentation (README.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Install pnpm globally and verify version (Node.js 18+ required)
- [x] T007 Create root package.json with pnpm workspace configuration in package.json
- [x] T008 Create pnpm-workspace.yaml with patterns ["packages/*", "apps/*"] in pnpm-workspace.yaml
- [x] T009 [P] Create .config directory structure for shared configuration files (.config/)
- [x] T010 [P] Create .config/eslint.config.js with base ESLint configuration (.config/eslint.config.js)
- [x] T011 [P] Create .config/prettier.config.js with base Prettier configuration (.config/prettier.config.js)
- [x] T012 [P] Create .config/jest.config.js with base Jest configuration (.config/jest.config.js)
- [x] T013 [P] Create .config/tsconfig.base.json with base TypeScript configuration (.config/tsconfig.base.json)
- [x] T014 [P] Create .config/vite.config.base.ts with base Vite configuration (.config/vite.config.base.ts)
- [x] T015F Add root-level scripts to package.json for workspace commands (lint, test, build) in package.json

**Checkpoint**: Foundation ready - test tasks can now be written

---

## Phase 2.5: Infrastructure Validation Tests (Test-First Requirement)

**Purpose**: Write tests FIRST before implementation (Constitution Principle II - NON-NEGOTIABLE)

**⚠️ CRITICAL**: These tests MUST be written and FAIL before implementation begins

- [x] T015A [P] Create test script to validate workspace recognizes packages in tests/workspace/validate-workspace.test.js
- [x] T015B [P] Create test script to validate dependency hoisting in tests/workspace/validate-hoisting.test.js
- [x] T015C [P] Create test script to validate workspace protocol resolution in tests/workspace/validate-protocol.test.js
- [x] T015D [P] Create test script to validate shared config inheritance in tests/workspace/validate-config.test.js
- [x] T015E Run all validation tests and confirm they FAIL (expected - infrastructure doesn't exist yet)

**Checkpoint**: All validation tests written and failing. Ready to implement infrastructure.

---

## Phase 3: User Story 1 - Basic Monorepo Workspace Structure (Priority: P1) 🎯 MVP

**Goal**: Establish workspace structure that organizes multiple packages/applications within a single repository, enabling code sharing and coordinated development.

**Independent Test**: Verify workspace recognizes packages by running `pnpm list --depth=0` from root and confirming at least two packages appear. Check that workspace configuration file exists and packages are organized in distinct directories.

### Validation for User Story 1

- [x] T021 [US1] Create packages/ui directory structure (packages/ui/)
- [x] T022 [US1] Create packages/ui/package.json with name "@company/ui" and version "1.0.0" in packages/ui/package.json
- [x] T023 [US1] Create packages/ui/src/index.ts as placeholder entry point in packages/ui/src/index.ts
- [x] T024 [US1] Create packages/ui/README.md with package documentation in packages/ui/README.md
- [x] T025 [P] [US1] Create packages/utils directory structure (packages/utils/)
- [x] T026 [P] [US1] Create packages/utils/package.json with name "@company/utils" and version "1.0.0" in packages/utils/package.json
- [x] T027 [P] [US1] Create packages/utils/src/index.ts as placeholder entry point in packages/utils/src/index.ts
- [x] T028 [P] [US1] Create packages/utils/README.md with package documentation in packages/utils/README.md
- [x] T029 [US1] Run pnpm install from repository root to verify workspace recognizes packages
- [x] T030 [US1] Run pnpm list --depth=0 to validate both packages appear in workspace
- [x] T031 [US1] Create MONOREPO.md documentation explaining repository structure and package organization in MONOREPO.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Workspace recognizes packages, developers can navigate structure, and new packages can be added following documented process.

---

## Phase 4: User Story 2 - Shared Tooling and Configuration (Priority: P2)

**Goal**: Establish shared development tooling (linting, formatting, testing, build configuration) across all packages to maintain consistency and reduce configuration duplication.

**Independent Test**: Verify shared tooling by running `pnpm lint` from root and confirming it checks all packages. Verify new packages automatically inherit shared configuration by creating a test package and checking it uses shared ESLint/Prettier configs.

### Implementation for User Story 2

- [x] T032 [US2] Configure ESLint extends in .config/eslint.config.js to support TypeScript and modern JavaScript (.config/eslint.config.js)
- [x] T033 [P] [US2] Configure Prettier rules in .config/prettier.config.js for consistent code formatting (.config/prettier.config.js)
- [x] T034 [P] [US2] Configure Jest preset and test patterns in .config/jest.config.js (.config/jest.config.js)
- [x] T035 [P] [US2] Configure TypeScript compiler options in .config/tsconfig.base.json (.config/tsconfig.base.json)
- [x] T036 [P] [US2] Configure Vite build options in .config/vite.config.base.ts (.config/vite.config.base.ts)
- [x] T037 [US2] Update packages/ui/package.json to extend shared ESLint config in packages/ui/package.json
- [x] T038 [US2] Update packages/ui/package.json to extend shared TypeScript config in packages/ui/package.json
- [x] T039 [P] [US2] Update packages/utils/package.json to extend shared ESLint config in packages/utils/package.json
- [x] T040 [P] [US2] Update packages/utils/package.json to extend shared TypeScript config in packages/utils/package.json
- [x] T041 [US2] Add lint script to root package.json that runs across all packages in package.json
- [x] T042 [US2] Add format script to root package.json that runs Prettier across all packages in package.json
- [x] T043 [US2] Add test script to root package.json that runs Jest across all packages in package.json
- [x] T044 [US2] Test shared configuration by running pnpm lint from root and verifying all packages are checked
- [x] T045 [US2] Create .config/README.md documenting how packages inherit and override shared configs (.config/README.md)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Shared tooling is configured, packages inherit configuration, and root-level commands work across all packages.

---

## Phase 5: User Story 3 - Dependency Management and Versioning (Priority: P3)

**Goal**: Enable efficient dependency management with hoisted shared dependencies, internal package references using workspace protocol, and independent package versioning.

**Independent Test**: Verify dependency hoisting by adding same dependency to multiple packages, running `pnpm install`, and confirming it's installed once at root. Verify workspace protocol by adding internal dependency and confirming import resolves correctly. Verify independent versioning by updating one package version and confirming others remain unchanged.

### Implementation for User Story 3

- [x] T046 [US3] Add shared dependency (e.g., lodash) to packages/ui/package.json dependencies in packages/ui/package.json
- [x] T047 [P] [US3] Add same shared dependency (lodash) to packages/utils/package.json dependencies in packages/utils/package.json
- [x] T048 [US3] Run pnpm install and verify lodash is hoisted to root node_modules/
- [x] T049 [US3] Add workspace dependency from packages/ui to packages/utils using "workspace:*" protocol in packages/ui/package.json
- [x] T050 [US3] Update packages/ui/src/index.ts to import from @company/utils in packages/ui/src/index.ts
- [x] T051 [US3] Verify workspace protocol resolves correctly by running type-check or build on packages/ui
- [x] T052 [US3] Update packages/ui version to "1.1.0" in packages/ui/package.json
- [x] T053 [US3] Verify packages/utils version remains "1.0.0" (independent versioning) in packages/utils/package.json
- [x] T054 [US3] Add pnpm scripts for filtering packages (--filter flag examples) to root package.json in package.json
- [x] T055 [US3] Test package filtering by running command on specific package: pnpm --filter "@company/ui" test
- [x] T056 [US3] Create VERSIONING.md documentation explaining independent versioning strategy in VERSIONING.md
- [x] T057 [US3] Document workspace protocol usage and internal dependency patterns in MONOREPO.md

**Checkpoint**: All user stories should now be independently functional. Dependency hoisting works, internal package references resolve correctly, and independent versioning is established and documented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T058 [P] Update root README.md with complete monorepo documentation including structure, commands, and workflows (README.md)
- [x] T059 [P] Create CONTRIBUTING.md with guidelines for adding new packages and contributing to monorepo (CONTRIBUTING.md)
- [x] T060 [P] Add pre-commit hooks configuration for linting and formatting (.husky/ or similar)
- [x] T061 [P] Create .github/workflows/ci.yml for CI/CD pipeline that runs tests and linting across all packages (.github/workflows/ci.yml)
- [x] T062 [P] Add package.json scripts for common monorepo operations (build all, test changed, etc.) in package.json
- [x] T063 Code cleanup: Remove any placeholder files or temporary test files
- [x] T064 Performance optimization: Verify dependency hoisting achieves 80%+ hoisting rate target
- [x] T065 Run quickstart.md validation scenarios to verify all test scenarios pass
- [x] T066 Create CHANGELOG.md documenting monorepo setup and initial packages (CHANGELOG.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories. Creates initial package structure.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Uses packages created in US1 but can work with placeholder packages. Independently testable.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Requires packages from US1 to test workspace protocol. Can work independently with test packages.

### Within Each User Story

- Configuration files before package updates
- Package creation before dependency configuration
- Dependency setup before validation/testing
- Core implementation before documentation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T003)
- All Foundational config tasks marked [P] can run in parallel (T010-T014)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- Package creation tasks within US1 marked [P] can run in parallel (T020-T023)
- Package config updates in US2 marked [P] can run in parallel (T034-T035)
- Polish tasks marked [P] can run in parallel (T053-T057)

---

## Parallel Example: User Story 1

```bash
# Launch all package creation tasks together:
Task: "Create packages/ui directory structure (packages/ui/)"
Task: "Create packages/utils directory structure (packages/utils/)"

# Launch all package.json creation tasks together:
Task: "Create packages/ui/package.json with name '@company/ui' and version '1.0.0' in packages/ui/package.json"
Task: "Create packages/utils/package.json with name '@company/utils' and version '1.0.0' in packages/utils/package.json"

# Launch all README creation tasks together:
Task: "Create packages/ui/README.md with package documentation in packages/ui/README.md"
Task: "Create packages/utils/README.md with package documentation in packages/utils/README.md"

# Launch all validation test tasks together:
Task: "Create test script to validate workspace recognizes packages in tests/workspace/validate-workspace.test.js"
Task: "Create test script to validate dependency hoisting in tests/workspace/validate-hoisting.test.js"
Task: "Create test script to validate workspace protocol resolution in tests/workspace/validate-protocol.test.js"
Task: "Create test script to validate shared config inheritance in tests/workspace/validate-config.test.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently using quickstart.md Test Scenario 1
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (creates initial packages)
   - Developer B: User Story 2 (can start with placeholder packages)
   - Developer C: User Story 3 (can start after US1 packages exist)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Validation tasks verify infrastructure setup works correctly
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently using quickstart.md scenarios
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths are relative to repository root unless otherwise specified
