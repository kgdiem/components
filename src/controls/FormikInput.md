# FormikInput

## What is it?

`FormikInput` connects [Input](./Input.md) to Formik field state.

## Import

```tsx
import { FormikInput } from "@kgdiem/components";
```

## When to use it

- Use when a text input lives inside a Formik-managed form.
- Prefer the base [Input](./Input.md) when you are not using Formik.

## Key props and composition

- `name` is required and maps the field to Formik values.
- Most `Input` props pass through to the underlying control.
- The component expects an active `Formik` provider above it.

## Common patterns

- Use for email, search, and short text fields in forms.
- Pair with [Label](../typography/Label.md) and external validation messaging if your form pattern includes it.

## Accessibility and behavior notes

- Keep the `name` stable so validation and touched state map correctly.
- Provide the same visible labeling you would provide for the base input.

## Related components

- [Input](./Input.md)
- [FormikTextarea](./FormikTextarea.md)
- [FormikSelect](./FormikSelect.md)
