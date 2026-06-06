# FormikTextarea

## What it is

`FormikTextarea` connects [Textarea](./Textarea.md) to Formik field state.

## Import

```tsx
import { FormikTextarea } from "@kgdiem/components";
```

## When to use it

- Use for multiline fields inside Formik-managed forms.
- Prefer the base [Textarea](./Textarea.md) when the field is not part of Formik state.

## Key props and composition

- `name` is required and binds the field to Formik values.
- `rows`, `placeholder`, and other textarea props pass through.
- The component expects to render within a `Formik` form tree.

## Common patterns

- Use for notes, descriptions, comments, and message bodies in forms.

## Accessibility and behavior notes

- Use the same visible labeling and helper patterns you would use with the base textarea.
- Keep field names aligned with your validation schema.

## Related components

- [Textarea](./Textarea.md)
- [FormikInput](./FormikInput.md)
- [FormikSelect](./FormikSelect.md)
