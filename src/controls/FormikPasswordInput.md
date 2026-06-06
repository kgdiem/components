# FormikPasswordInput

## What it is

`FormikPasswordInput` connects [PasswordInput](./PasswordInput.md) to Formik field state.

## Import

```tsx
import { FormikPasswordInput } from "@kgdiem/components";
```

## When to use it

- Use when a password field lives inside a Formik-managed form.
- Prefer the base [PasswordInput](./PasswordInput.md) when you are not using Formik.

## Key props and composition

- `name` is required and maps the field to Formik values.
- Most `PasswordInput` props pass through to the underlying control.
- The component expects an active `Formik` provider above it.

## Common patterns

- Use for sign-in and account password updates.
- Pair with [Label](../typography/Label.md) and external validation messaging if your form pattern includes it.

## Accessibility and behavior notes

- Keep the `name` stable so validation and touched state map correctly.
- Provide the same visible labeling you would provide for the base input.

## Related components

- [PasswordInput](./PasswordInput.md)
- [FormikInput](./FormikInput.md)
