# Components

Read this before creating or changing a UI component.

## Principles

Components should be:

- composable
- accessible
- framework-agnostic where possible
- minimally opinionated

Favor composition over configuration.

Avoid components with more than four props.

## File Organization

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

## Documentation

Every exported component should include:

- purpose
- usage example
- supported props
- accessibility notes

See also: [accessibility.md](accessibility.md), [testing.md](testing.md), [styling.md](styling.md).
