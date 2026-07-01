# AGENTS.md

This file provides guidance to AI coding agents (ChatGPT, Claude Code, Gemini
CLI, Codex, OpenCode, etc.) working in this repository.

## Project Overview

This repository contains my personal web platform.

The goals are:

- Maintain a cohesive design language across projects.
- Prioritize accessibility, performance, and maintainability.
- Keep framework-specific code isolated.
- Maximize code sharing through reusable packages.

This repository uses **Bun Workspaces**.

# Repository Structure

```
.
├── apps/
│   ├── portfolio/          # Astro
│   └── blog/               # TanStack Start + Solid.js
│
├── packages/
│   ├── design-system/
│   ├── icons/
│   ├── tokens/
│   └── config/
│
├── docs/
├── scripts/
└── AGENTS.md
```

Never duplicate code between apps if it can live in a shared package.

# Tech Stack

Package manager:

- Bun

Languages:

- TypeScript
- CSS

Frameworks:

- Astro
- Solid.js
- TanStack Start

Testing:

- Vitest
- Playwright

Linting:

- ESLint
- Prettier

# Design Philosophy

The design system is the source of truth.

Apps consume the design system.

Apps should not redefine:

- colors
- typography
- spacing
- border radius
- shadows
- animations

If a missing primitive is needed, add it to the design system rather than
implementing it locally.

# CSS Guidelines

Prefer:

- CSS custom properties
- CSS Layers
- Modern CSS
- Container Queries
- Logical Properties

Avoid:

- !important
- ID selectors
- Deep selector nesting
- Global resets inside apps

Use:

```
@layer reset;
@layer tokens;
@layer base;
@layer utilities;
@layer components;
```

# Design Tokens

All visual values originate from design tokens.

Examples:

- color
- spacing
- typography
- radius
- shadow
- z-index
- motion

Never hardcode values if a token exists.

Prefer:

```
var(--color-primary)
```

instead of

```
#3b82f6
```

# Components

Components should be:

- composable
- accessible
- framework-agnostic where possible
- minimally opinionated

Favor composition over configuration.

Avoid components with more than four props.

# Accessibility

Accessibility is required.

Every new component should consider:

- keyboard navigation
- screen readers
- visible focus states
- sufficient contrast
- semantic HTML

Never remove focus outlines without providing an accessible replacement.

# Performance

Priorities:

1. minimal JavaScript
2. static rendering where appropriate
3. progressive enhancement
4. CSS over JS when possible

Avoid unnecessary client-side hydration.

# TypeScript

Prefer:

- readonly
- discriminated unions
- explicit exported types
- strict mode compatibility

Avoid:

- any
- unnecessary type assertions
- non-null assertions unless unavoidable

# Code Style

Prefer:

- early returns
- small functions
- descriptive names
- immutable data

Avoid:

- deeply nested conditionals
- long functions
- duplicated logic

# Dependencies

Before adding a dependency:

Ask:

1. Can existing code solve this?
2. Is the package actively maintained?
3. Is it tree-shakeable?
4. Does it improve developer experience enough to justify another dependency?

Favor fewer dependencies.

# File Organization

Keep related files together.

Example:

```
Button/
    Button.tsx
    Button.css
    Button.test.ts
    Button.stories.ts
    index.ts
```

# Testing

Every reusable component should have:

- unit tests
- accessibility tests when practical

Critical user flows should have Playwright tests.

# Documentation

Every exported component should include:

- purpose
- usage example
- supported props
- accessibility notes

# Commit Philosophy

Prefer small focused changes.

Avoid unrelated refactors in feature PRs.

# When Making Changes

Before making a change:

- understand the surrounding code
- preserve existing conventions
- minimize churn

After making a change:

- run formatting
- run linting
- run tests
- ensure TypeScript passes

# If Unsure

Prefer asking for clarification instead of making assumptions about:

- API design
- naming
- architecture
- public interfaces

# Guiding Principles

1. Accessibility first.
2. Simplicity over cleverness.
3. Reuse over duplication.
4. Performance by default.
5. Design system is the source of truth.
6. Modern web standards over legacy patterns.
7. Optimize for long-term maintainability.
