# Horizontal

## What it is

`Horizontal` is a row-oriented layout primitive for arranging children side by side.

## Import

```tsx
import { Horizontal } from "@kgdiem/components";
```

## When to use it

- Use for inline groups of actions, badges, or summary content.
- Prefer it when the intent is a simple horizontal stack rather than a bespoke flex container.

## Key props and composition

- `className` controls spacing, alignment, wrapping, and responsive behavior.
- Children render in document order, making it suitable for action rows and compact groups.

## Common patterns

- Use for button groups, metadata rows, and aligned icon-label content.
- Nest inside [Card](./Card.md), [Sidebar](../navigation/Sidebar.md), or [StackedList](./StackedList.md) items.

## Accessibility and behavior notes

- Preserve a meaningful source order because the layout should not depend on visual rearrangement.

## Related components

- [Vertical](./Vertical.md)
- [Box](./Box.md)
- [StackedList](./StackedList.md)
