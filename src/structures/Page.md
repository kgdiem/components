# Page

## What is it?

`Page` is a page-width layout wrapper for centering and constraining top-level content.

## Import

```tsx
import { Page } from "@kgdiem/components";
```

## When to use it

- Use at the top of a screen or route to apply consistent page framing.
- Prefer it over repeating custom max-width and horizontal padding wrappers.

## Key props and composition

- `children` contains the page content.
- `className` lets each page adjust spacing while keeping the core layout primitive.

## Common patterns

- Wrap page sections, cards, or stacks inside `Page`.
- Pair with [Header](../typography/Header.md) and [Vertical](./Vertical.md) for structured page layout.

## Accessibility and behavior notes

- Keep landmark structure outside or around the page wrapper as appropriate for the consuming app.

## Related components

- [Card](./Card.md)
- [Vertical](./Vertical.md)
- [Notification](../components/Notification.md)
