# PasswordInput

## What is it?

`PasswordInput` is a single-line password field with a built-in visibility toggle.

## Import

```tsx
import { PasswordInput } from "@kgdiem/components";
```

## When to use it

- Use for password entry in sign-in, sign-up, and account settings flows.
- Prefer the base [Input](./Input.md) for non-sensitive single-line text.

## Key props and composition

- `value` and `onChange` support controlled usage.
- Standard input attributes pass through to the underlying field.
- The visibility toggle switches between masked and plain text entry.

## Common patterns

- Pair with [Label](../typography/Label.md) for visible field context.
- Set `autoComplete="current-password"` or `autoComplete="new-password"` when appropriate.

## Accessibility and behavior notes

- Always provide a visible label or equivalent accessible name.
- The toggle exposes `Show password` and `Hide password` labels for assistive technology.

## Related components

- [Input](./Input.md)
- [FormikPasswordInput](./FormikPasswordInput.md)
