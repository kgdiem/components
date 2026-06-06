# Card

## What is it?

`Card` is a contained surface for grouping related content, with optional header and footer regions.

## Import

```tsx
import { Card } from "@kgdiem/components";
```

## When to use it

- Use for summaries, settings panels, and compact content blocks.
- Prefer it when a section needs a bounded surface that stands apart from the page background.

## Key props and composition

- `header` and `footer` add optional top and bottom regions.
- `children` fills the main content area.
- `className` controls width and any context-specific styling.

## Common patterns

- Combine with [Header](../typography/Header.md) and [Text](../typography/Text.md) for dashboard-style summaries.
- Use a footer for secondary metadata or lightweight follow-up actions.

## Accessibility and behavior notes

- Use semantic headings inside the card when the content introduces a new section.
- Keep header and footer content concise so the main body remains the focus.

## Related components

- [Page](./Page.md)
- [Box](./Box.md)
- [Header](../typography/Header.md)
