# Vertical

## What it is

`Vertical` is a column-oriented layout primitive for stacking content with consistent spacing.

## Import

```tsx
import { Vertical } from "@kgdiem/components";
```

## When to use it

- Use for forms, grouped content, and repeated blocks that should flow top to bottom.
- Prefer it over ad hoc flex column wrappers when you want a named layout primitive.

## Key props and composition

- `className` controls spacing, alignment, and responsive behavior.
- Children render in document order and stack vertically.

## Common patterns

- Use for form sections, settings groups, and card internals.
- Pair with [Horizontal](./Horizontal.md) when a layout mixes rows and columns.

## Accessibility and behavior notes

- Preserve semantic heading and content order because the component is purely structural.

## Related components

- [Horizontal](./Horizontal.md)
- [Box](./Box.md)
- [Page](./Page.md)
