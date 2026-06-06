# StackedList

## What it is

`StackedList` is a vertically separated list container for structured rows, with `StackedListItem` for each entry.

## Import

```tsx
import { StackedList, StackedListItem } from "@kgdiem/components";
```

## When to use it

- Use for people lists, activity lists, and other row-based summaries.
- Prefer it when each row needs custom markup but the overall framing should stay consistent.

## Key props and composition

- `StackedList` provides the outer container.
- `StackedListItem` wraps each row and keeps item spacing and separators consistent.
- `className` can tune padding or outer framing for the list container.

## Common patterns

- Combine each item with [Text](../typography/Text.md), [Horizontal](./Horizontal.md), and custom metadata.
- Use when rendering a repeated dataset where each row has more structure than a plain list item.

## Accessibility and behavior notes

- Preserve list semantics when the collection represents a real list of records or entities.
- Keep row content scannable and avoid packing too many unrelated actions into a single item.

## Related components

- [Horizontal](./Horizontal.md)
- [Vertical](./Vertical.md)
- [Text](../typography/Text.md)
