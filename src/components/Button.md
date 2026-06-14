# Button

## What is it?

`Button` is the primary action control for clicks, submits, and lightweight command surfaces.

## Import

```tsx
import { Button } from "@kgdiem/components";
```

## When to use it

- Use `primary` for the main action in a view.
- Use `secondary` for supporting actions.
- Use `tertiary` for low-emphasis actions inside dense layouts.

## Key props and composition

- `variant` controls visual emphasis: `primary`, `secondary`, or `tertiary`.
- `size` controls the control's footprint: `sm`, `md` (default), or `lg`.
- `loading` shows an inline [Spinner](./Spinner.md) and disables interaction while an action is in flight.
- `disabled` prevents interaction and removes the control from the action flow.
- `children` provides the button label or custom inline content.

## Common patterns

- Pair with [Dialog](./Dialog.md) actions for confirm and cancel flows.
- Use inside [Card](../structures/Card.md) and [Page](../structures/Page.md) layouts for inline actions.

## Accessibility and behavior notes

- Prefer clear action labels over vague text like "Submit" when the result matters.
- Use `disabled` only when the reason is obvious from surrounding context or helper text.
- `loading` sets `aria-busy` and disables the control so the in-flight action cannot be triggered twice; keep the label describing the action (e.g. "Saving…").

## Related components

- [Spinner](./Spinner.md)
- [Dialog](./Dialog.md)
- [Notification](./Notification.md)
- [Input](../controls/Input.md)
