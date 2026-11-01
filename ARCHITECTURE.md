# Architecture

## 1. System Overview

The repository is composed of two architectural layers:

```text
┌──────────────────────────────────────────────┐
│                    Apps                      │
│                                              │
│   Public Static          Technical Date      │
│   Astro                  Solid.js            │
│                                              │
└──────────────────────┬───────────────────────┘
                       │
                       │ consumes
                       ▼
┌──────────────────────────────────────────────┐
│              Shared Packages                 │
│                                              │
│   Design System        Utilities             │
│                                              │
└──────────────────────────────────────────────┘
                       │
                       ▼
              Shared Tooling / Config
```

Applications are the composition and deployment layer.

Shared packages provide reusable capabilities consumed by applications.

The architecture deliberately separates application-specific concerns from reusable concerns.

## 2. Application Boundaries

Each application owns its application-specific behaviour and implementation.

An application may contain:

* Framework-specific rendering code
* Application state
* Application-specific domain logic
* Application-specific data access
* Authentication and authorization flows
* Application-specific integrations
* Deployment configuration

An application must not become a dependency of another application.

Applications may consume shared packages but shared packages must not depend on applications.

### Public Static (Portfolio)

The portfolio is a primarily static application.

Its architecture is centred around:

```text
Content
   ↓
Astro
   ↓
HTML + CSS
   ↓
Browser
```

Interactive behaviour is introduced only where required.

### Technical Date (Blog)

The blog is an interactive application built with Solid.js and TanStack Start.

Its architecture includes both server-side and client-side concerns:

```text
Browser
   │
   ├── HTML / CSS
   │
   └── Client-side UI
           │
           ▼
      Application
           │
           ├── Authentication
           ├── Domain logic
           ├── Data access
           └── External services
```

The blog may therefore have substantially more application state and server-side infrastructure than the portfolio.

## 3. Shared Package Boundaries

Shared packages live under `packages/`.

They are architectural dependencies of applications rather than applications themselves.

The current shared packages are:

```text
packages/
├── design-system/
├── utils/
└── tooling/
```

### Design System

The design system provides the common visual language consumed by applications.

It contains only CSS design tokens, CSS styles, and the minimal theme bootstrapping required to apply them. It contains no framework components.

Its structure is:

```text
packages/design-system/
├── tokens/        Canonical design values as CSS custom properties
├── base.css       Base element styles
├── styles/        Reusable CSS patterns (button, card, badge, ...)
└── theme/         Framework-agnostic theme bootstrapping (no-flash script)
```

Its conceptual structure is:

```text
Design Tokens
      ↓
Theme
      ↓
CSS Styles
      ↓
Application UI
```

Tokens represent the vocabulary of the visual system rather than complete UI implementations.

Examples include:

* Colors
* Typography
* Spacing
* Sizing
* Border radii
* Shadows
* Layering
* Motion

Tokens live inside the design system but remain its lowest layer: styles consume tokens, never the reverse, and tokens contain no component-specific styling.

Applications consume the design system through the stylesheet entry points declared in its `package.json` `exports`. Framework-specific components are built inside each application from these styles.

The design system does not own application-specific behaviour.

For example, a blog-specific comment component belongs to the blog even if it uses styles supplied by the design system.

### Utils

The utils package provides small, general-purpose TypeScript functions, grouped by concern:

```text
packages/utils/
├── array.ts
├── date.ts
├── function.ts
├── number.ts
└── string.ts
```

Utilities are framework-agnostic and free of side effects at import time.

The package is consumed as TypeScript source. It has no build step; each application's bundler compiles it alongside application code. A build step should only be introduced if the package is consumed outside a bundler or published.

Utilities do not contain application domain logic, data access, or authentication concerns.

### Tooling

The tooling package contains shared development and build configuration.

Examples include:

* TypeScript configuration
* Other repository-wide tooling configuration

Configuration packages exist to provide a common configuration interface to consuming projects.

They are not runtime application dependencies.

## 4. Dependency Architecture

The intended dependency direction is:

```text
                    ┌───────────────┐
                    │     Apps      │
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
          design-system               utils

                    tooling
                      ▲
                      │
                development
```

The important architectural constraints are:

```text
apps            → shared packages
design-system   → no other runtime package
utils           → no other runtime package
```

Shared packages must not depend on applications.

Lower-level shared packages should not depend on higher-level application concerns.

Framework-specific dependencies must not leak into packages whose purpose is framework independence. In particular, neither `design-system` nor `utils` may depend on Solid.js, Astro, or any other rendering framework.

## 5. Framework Boundary

The rendering framework is an application-level implementation detail.

The shared design system does not depend on the rendering framework.

Consequently, the following are conceptually separate:

```text
Application rendering
        │
        ▼
Framework
        │
        ▼
HTML / DOM
        │
        ▼
Design System CSS
```

The design system communicates with applications primarily through framework-independent web primitives:

* HTML
* CSS
* SVG
* CSS custom properties
* Browser APIs where necessary

This allows an application to change its rendering framework without requiring the visual system to be rewritten.

For example, replacing Solid.js with another rendering framework should not require rewriting the design tokens or core CSS.

## 6. UI Architecture

UI is divided into three conceptual layers:

```text
┌──────────────────────────────┐
│ Application UI               │
│                              │
│ Pages, flows, domain UI      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Design System                │
│                              │
│ CSS patterns and primitives  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Design Tokens                │
│                              │
│ Visual values and semantics  │
└──────────────────────────────┘
```

The design system provides reusable visual primitives.

Applications compose those primitives into application-specific interfaces.

The design system does not attempt to model the application's domain.

For example:

```text
Design System:
    Button
    Card
    Badge
    Input
    Dialog

Blog:
    ArticleCard
    Comment
    ReactionBar
    UserMenu
    Feed

Portfolio:
    ProjectCard
    ExperienceTimeline
    ProjectGallery
```

The first group belongs to the shared visual system; the second and third groups belong to their respective applications.

## 7. Content Architecture

Content is conceptually separate from its presentation.

The preferred relationship is:

```text
Content
   ↓
Content Model
   ↓
Application
   ↓
Rendering
```

Content should not require knowledge of the UI framework that renders it.

This is particularly important for the blog and knowledge-oriented applications, where the same underlying content may eventually be presented through different interfaces.

Content-specific schemas, transformations, and loaders belong to the appropriate application or shared content package when they are genuinely reusable.

## 8. Domain and Application Logic

Application-specific domain logic belongs to the application that owns the domain.

For example, the blog owns concepts such as:

```text
User
Article
Comment
Reaction
Feed
Session
```

These concepts should not be placed in the general-purpose design system or utility packages merely because they are reusable in multiple files within the blog.

A shared domain abstraction should only exist when the domain itself is genuinely shared between applications.

## 9. Authentication and Authorization Boundary

Authentication and authorization belong to applications and their associated server-side infrastructure.

The architectural boundary is:

```text
UI
 │
 ▼
Application
 │
 ├── Authentication
 │
 ├── Authorization
 │
 └── Domain / Data
```

The design system and general-purpose utilities remain independent of authentication.

Authentication state may influence application UI, but authentication and authorization are not responsibilities of the visual system.

Authorization is enforced at the server/application boundary rather than relying on client-side presentation state.

## 10. Data and Persistence Boundary

Data persistence belongs to the application/infrastructure layer.

The conceptual relationship is:

```text
Application
    │
    ▼
Data Access
    │
    ▼
Persistence / External Service
```

The design system and general-purpose utilities do not access application databases or persistence services.

Application-specific schemas, queries, repositories, and persistence implementations remain within the application or its infrastructure layer.

Infrastructure-specific abstractions may be extracted into shared packages when they are genuinely reusable across applications.

## 11. Infrastructure Architecture

Infrastructure is independent of the visual and presentation layers.

The architecture permits applications to consume infrastructure services such as:

```text
Application
    │
    ▼
Infrastructure Layer
    │
    ├── Cloudflare Workers
    ├── Cloudflare D1
    ├── Cloudflare R2
    ├── Cloudflare KV
    └── External Services
```

Infrastructure-specific implementations should remain isolated from framework-agnostic presentation packages.

If infrastructure code becomes reusable across applications, it may be introduced as a dedicated shared package rather than being placed in `utils` or `design-system`.

## 12. Runtime and Deployment Boundaries

Each application is independently deployable.

```text
┌──────────────┐
│   Portfolio  │ ──────► Deployment A
└──────────────┘

┌──────────────┐
│     Blog     │ ──────► Deployment B
└──────────────┘
```

A deployment of one application must not require another application to be deployed.

Shared packages are build-time dependencies of the applications that consume them.

An application may therefore be deployed independently while still consuming the common design system and other shared packages.

## 13. Architectural Stability

The following boundaries are considered stable architectural boundaries:

1. Applications are independently deployable.
2. Applications may use different rendering frameworks.
3. Shared packages do not depend on applications.
4. The design system and utilities are independent of rendering frameworks.
5. Tokens are the lowest layer of the design system; styles depend on tokens, never the reverse.
6. Application-specific domain logic remains in applications.
7. Authentication and persistence remain outside the design system.
8. Infrastructure remains separate from presentation concerns.

Changes that violate these boundaries constitute architectural changes and should be documented through an Architectural Decision Record when appropriate.

## 14. Architectural Decision Records

Significant architectural decisions are documented under:

```text
docs/decisions/
```

`ARCHITECTURE.md` describes the current architectural structure.

Architectural Decision Records document the reasoning behind significant decisions.

An ADR should be used when a decision materially changes:

* Dependency direction
* Package boundaries
* Application boundaries
* Rendering architecture
* Infrastructure architecture
* Data architecture
* Authentication architecture
* Deployment architecture

When an architectural decision changes the current architecture, update this document to reflect the new state.
