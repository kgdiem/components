# Text

## What is it?

`Text` is the general-purpose typography primitive for body copy, muted content, captions, and label-like text styles.

## Import

```tsx
import { Text } from "@kgdiem/components";
```

## When to use it

- Use for paragraphs, supporting copy, captions, and inline text fragments.
- Prefer it when you need consistent text variants without introducing custom class strings each time.

## Key props and composition

- `variant` selects styles such as `body`, `muted`, `subtle`, `caption`, or `label`.
- `as` controls the rendered element, such as `p`, `span`, `div`, or `label`.
- `children` provides the text content.

## Common patterns

- Pair with [Header](./Header.md) for title and description groupings.
- Use muted and caption variants for metadata inside [Card](../structures/Card.md) or [StackedList](../structures/StackedList.md).

## Accessibility and behavior notes

- Choose the rendered element to match the surrounding semantic structure.
- Do not use visual variants as a substitute for headings when the content introduces a new section.

## Related components

- [Header](./Header.md)
- [Label](./Label.md)
- [StackedList](../structures/StackedList.md)
