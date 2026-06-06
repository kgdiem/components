# FormikSwitch

## What it is

`FormikSwitch` connects [Switch](./Switch.md) to Formik field state.

## Import

```tsx
import { FormikSwitch } from "@kgdiem/components";
```

## When to use it

- Use for boolean settings inside a Formik-managed form.
- Prefer the base [Switch](./Switch.md) outside Formik.

## Key props and composition

- `name` is required and binds the field to Formik values.
- `label` and supporting props still define the visible setting text.
- The component expects a parent `Formik` provider.

## Common patterns

- Use in settings forms and onboarding preferences with other Formik field wrappers.

## Accessibility and behavior notes

- Write the label as a setting state rather than an action command.
- Keep Formik field names consistent with stored boolean values.

## Related components

- [Switch](./Switch.md)
- [FormikInput](./FormikInput.md)
- [FormikRadioGroup](./FormikRadioGroup.md)
