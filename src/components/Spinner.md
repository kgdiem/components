# Spinner

## What is it?

`Spinner` is a compact inline loading indicator that inherits color from `currentColor`.

## Import

```tsx
import { Spinner } from "@kgdiem/components";
```

## When to use it

- Use inside [Button](./Button.md) via the `loading` prop for in-flight actions.
- Use beside status text in dense layouts where a full-screen [Overlay](./Overlay.md) is too heavy.
- Pair with visible loading copy so the state is clear without relying on the icon alone.

## Key props and composition

- `size` controls the icon footprint: `sm`, `md` (default), or `lg`.
- `className` adjusts color or spacing; stroke color follows `currentColor`.
- The SVG is decorative by default (`aria-hidden="true"`); provide nearby text or an `aria-live` region for standalone loading states.

## Common patterns

- Match spinner `size` to the surrounding control size (`sm` beside compact actions, `lg` in hero loading states).
- Set `className="text-primary"` or another semantic text color when the default inherited color is too subtle.
- Combine with [Text](../typography/Text.md) for inline status messages such as "Saving…".

## Accessibility and behavior notes

- Do not use a spinner as the only loading signal; include descriptive text or an accessible live region.
- When embedding in custom controls, mirror [Button](./Button.md) behavior: disable interaction and set `aria-busy` on the control while loading.
- Keep animation respectful of `prefers-reduced-motion` preferences in host apps when placing spinners outside library components.

## Related components

- [Button](./Button.md)
- [Overlay](./Overlay.md)
- [Text](../typography/Text.md)
