# AGENTS.md

This file provides guidance to AI coding agents (ChatGPT, Claude Code, Gemini CLI, Codex, OpenCode, Pi, etc.) working in this repository.

## Project Overview

This repository contains my personal web platform.

The goals are:

- Maintain a cohesive design language across projects.
- Prioritize accessibility, performance, and maintainability.
- Keep framework-specific code isolated.
- Maximize code sharing through reusable packages.

This repository uses **Bun Workspaces**.

## Repository Structure

```sh
.
├── apps/
│   ├── public-static/                  # Personal dev portfolio, developed with Astro
│   └── technical-date/                 # Personal blog, developed with Solid.js
│
├── packages/
│   ├── design-system/                  # CSS styles, CSS tokens, icons, and other style-related artefacts
│   └── utils/                          # commonly used utility functions in Typescript
│
├── docs/
│   ├── agents/                         # task-specific guidance for AI coding agents
│   ├── api/                            # API contracts in YAML format
│   ├── decisions/                      # architectural decisions in Markdown ADR format
│   └── domain/                         # domain-specific knowledge
├── scripts/
├── ARCHITECTURE.md
└── AGENTS.md
```

Never duplicate code between apps if it can live in a shared package.

## Tech Stack

- Package manager: Bun
- Languages: TypeScript, CSS
- Libraries and Frameworks: Astro, Solid.js, Solid Start
- Testing: Bun test runner, Vitest, Playwright

## Task-Specific Guidance

Read the relevant file before starting work of that kind:

| When you are...                                  | Read                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| writing CSS, tokens, or any visual styling       | [docs/agents/styling.md](docs/agents/styling.md)             |
| creating or changing a UI component              | [docs/agents/components.md](docs/agents/components.md)       |
| building or changing user-facing UI              | [docs/agents/accessibility.md](docs/agents/accessibility.md) |
| adding client-side JS, hydration, or rendering   | [docs/agents/performance.md](docs/agents/performance.md)     |
| writing TypeScript                               | [docs/agents/typescript.md](docs/agents/typescript.md)       |
| adding or upgrading a dependency                 | [docs/agents/dependencies.md](docs/agents/dependencies.md)   |
| writing tests or adding components / user flows  | [docs/agents/testing.md](docs/agents/testing.md)             |
| committing or opening a pull request             | [docs/agents/commits.md](docs/agents/commits.md)             |

## When Making Changes

Before making a change:

- understand the surrounding code
- preserve existing conventions
- minimize churn

After making a change:

- run formatting
- run linting
- run tests
- ensure TypeScript passes

## If Unsure

Prefer asking for clarification instead of making assumptions about:

- API design
- naming
- architecture
- public interfaces

## Guiding Principles

1. Accessibility first.
2. Simplicity over cleverness.
3. Reuse over duplication.
4. Performance by default.
5. Design system is the source of truth.
6. Modern web standards over legacy patterns.
7. Optimize for long-term maintainability.
