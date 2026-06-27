# Avatar

## What is it?

`Avatar` is a circular initials badge for representing people when no profile image is available.

## Import

```tsx
import { Avatar } from "@kgdiem/components";
```

## When to use it

- Show one or two uppercase initials beside a person's name in lists, sidebars, or compact chips.
- Pair with app-specific logic that derives initials from a display name.
- Use semantic subtle background and text tokens so avatars stay on-brand.

## Key props and composition

- `initials` is required and should already be formatted (typically one or two uppercase letters).
- `size` controls footprint: `xs`, `sm`, `md` (default), or `lg`.
- `backgroundClassName` and `textClassName` accept Tailwind utility classes for palette tokens.
- `className` merges additional layout or ring styles.

## Common patterns

- Derive initials from the first letter of the first and last name words in the host app.
- Pass a stable seed to your color-selection helper and map the result onto `backgroundClassName` and `textClassName`.
- Use `xs` in inline chips, `sm` in sidebars, and `md` or `lg` in profile lists.

## Accessibility and behavior notes

- The badge is decorative (`aria-hidden="true"`); expose the person's name in adjacent visible text.
- Do not rely on initials alone to identify a user when multiple people could share the same initials.

## Related components

- [Text](../typography/Text.md)
- [StackedList](../../structures/StackedList.tsx)
