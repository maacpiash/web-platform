# Styling

Read this before writing or changing CSS, design tokens, or any visual styling.

## Design Philosophy

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

## CSS Guidelines

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

## Design Tokens

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
