# FormikRadioGroup

## What it is

`FormikRadioGroup` connects [RadioGroup](./RadioGroup.md) to Formik field state.

## Import

```tsx
import { FormikRadioGroup } from "@kgdiem/components";
```

## When to use it

- Use when a single exclusive choice belongs to a Formik-managed form.
- Prefer the base [RadioGroup](./RadioGroup.md) outside Formik.

## Key props and composition

- `name` is required and maps the field into Formik values.
- `options` and related radio group props pass through.
- The component expects a parent `Formik` provider.

## Common patterns

- Use for notification preferences, plan choice, and other small exclusive sets in forms.

## Accessibility and behavior notes

- Keep option labels parallel so comparison is easy for both visual and assistive tech users.

## Related components

- [RadioGroup](./RadioGroup.md)
- [FormikSelect](./FormikSelect.md)
- [FormikListbox](./FormikListbox.md)
