# Box

## What it is

`Box` is the low-level layout primitive for wrapping content, passing through element attributes, and applying structure with classes.

## Import

```tsx
import { Box } from "@kgdiem/components";
```

## When to use it

- Use when you need a lightweight container without introducing a higher-level pattern.
- Use it as a utility wrapper around content, icons, or layout fragments.

## Key props and composition

- `className` is the primary way to shape spacing, borders, and layout behavior.
- Standard element attributes pass through to the rendered element.

## Common patterns

- Use as a structural wrapper inside [Card](./Card.md), [Sidebar](../navigation/Sidebar.md), or custom story layouts.
- Apply roles and ARIA attributes when the container has semantic meaning.

## Accessibility and behavior notes

- Add semantic roles only when the container genuinely represents a landmark or region.
- Prefer higher-level components when the layout pattern already exists elsewhere in the system.

## Related components

- [Horizontal](./Horizontal.md)
- [Vertical](./Vertical.md)
- [Card](./Card.md)
