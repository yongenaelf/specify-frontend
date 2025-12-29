<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Modified principles: N/A (initial creation)
Added sections: Core Principles (5 principles), Additional Constraints, Development Workflow, Governance
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - No changes needed (already aligned)
  ✅ tasks-template.md - Task organization aligns with test-first principle
  ✅ All command files - No agent-specific references found
Follow-up TODOs: None
-->

# Specify Frontend Constitution

## Core Principles

### I. Component-First Architecture
Every feature starts as a reusable, self-contained component. Components MUST be independently testable, documented, and composable. Clear purpose required - no organizational-only components. Components must follow single responsibility principle and expose clear props/API contracts.

### II. Test-First Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced. All components, utilities, and user flows MUST have tests before implementation. Test coverage requirements: unit tests for utilities/logic, component tests for UI components, integration tests for user flows.

### III. Integration Testing
Focus areas requiring integration tests: New component contract tests, Component API changes, Cross-component communication, Shared state management, User journey flows. Integration tests MUST verify end-to-end user scenarios independently testable.

### IV. Observability & Performance
All user interactions MUST be instrumented for analytics and debugging. Performance budgets enforced: initial load < 3s, time to interactive < 5s, 60fps animations. Structured logging required for errors and critical user actions. Core Web Vitals MUST meet Google thresholds (LCP < 2.5s, FID < 100ms, CLS < 0.1).

### V. Accessibility & User Experience
WCAG 2.1 AA compliance minimum for all components. Mobile-first responsive design required. Touch targets minimum 44x44px. Keyboard navigation support mandatory. Screen reader compatibility required. All interactive elements MUST have proper ARIA labels and semantic HTML.

## Additional Constraints

**Technology Stack**: Modern JavaScript/TypeScript with component-based framework (React, Vue, Angular, or equivalent). CSS-in-JS or CSS Modules for styling isolation. Build tooling must support code splitting and tree shaking.

**Mobile-First Design**: All designs start with mobile viewport (320px+), then scale up to tablet and desktop. Responsive breakpoints: mobile (0-767px), tablet (768-1023px), desktop (1024px+).

**Browser Support**: Support latest 2 versions of Chrome, Firefox, Safari, Edge. Progressive enhancement for older browsers. Graceful degradation required.

**Performance Standards**: Bundle size limits enforced per route. Image optimization mandatory (WebP with fallbacks, lazy loading). Code splitting required for routes and heavy components.

**Security**: XSS prevention mandatory. CSRF protection for forms. Content Security Policy headers required. No sensitive data in client-side code or localStorage.

## Development Workflow

**Code Review**: All PRs MUST pass constitution compliance check before merge. At least one approval required. Automated tests MUST pass. No force-push to main branch.

**Quality Gates**: Pre-commit hooks enforce linting and formatting. CI/CD pipeline runs full test suite. Performance budgets validated in CI. Accessibility audits automated.

**Documentation**: Component documentation required (props, examples, usage). README for each major feature/module. Architecture decisions documented in ADRs.

**Versioning**: Semantic versioning (MAJOR.MINOR.PATCH) for releases. Breaking changes require MAJOR bump and migration guide. Feature flags for gradual rollouts.

## Governance

This constitution supersedes all other development practices. Amendments require documentation, team approval, and migration plan. All PRs/reviews must verify compliance with these principles. Complexity must be justified - simpler solutions preferred (YAGNI principle). Violations require explicit justification in Complexity Tracking section of implementation plans.

**Version**: 1.0.0 | **Ratified**: 2025-12-29 | **Last Amended**: 2025-12-29
