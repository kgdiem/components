# Header

## What is it?

`Header` renders styled headings while letting the caller choose the semantic heading level.

## Import

```tsx
import { Header } from "@kgdiem/components";
```

## When to use it

- Use for section, card, and page headings.
- Prefer it over ad hoc heading classes when you want consistent heading styling across the system.

## Key props and composition

- `as` controls the semantic heading element from `h1` through `h6`.
- `children` provides the visible heading content.

## Common patterns

- Use `h1` for page-level titles and lower levels for nested sections.
- Pair with [Text](./Text.md) for supporting copy beneath a heading.

## Accessibility and behavior notes

- Choose the heading level based on document structure, not visual size alone.

## Related components

- [Text](./Text.md)
- [Card](../structures/Card.md)
- [Page](../structures/Page.md)
