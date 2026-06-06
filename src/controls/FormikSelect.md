# FormikSelect

## What is it?

`FormikSelect` connects [Select](./Select.md) to Formik field state.

## Import

```tsx
import { FormikSelect } from "@kgdiem/components";
```

## When to use it

- Use for simple choice fields inside Formik forms.
- Prefer the base [Select](./Select.md) when Formik is not in use.

## Key props and composition

- `name` is required and maps to the Formik field path.
- `options`, `placeholder`, and other select props pass through.
- The component expects a parent `Formik` provider.

## Common patterns

- Use for status, team, and other compact option sets in forms.

## Accessibility and behavior notes

- Keep option labels distinct and align field names with validation schema keys.

## Related components

- [Select](./Select.md)
- [FormikListbox](./FormikListbox.md)
- [FormikCombobox](./FormikCombobox.md)
