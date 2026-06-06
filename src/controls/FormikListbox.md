# FormikListbox

## What it is

`FormikListbox` connects [Listbox](./Listbox.md) to Formik field state.

## Import

```tsx
import { FormikListbox } from "@kgdiem/components";
```

## When to use it

- Use for styled single-select fields inside Formik forms.
- Prefer the base [Listbox](./Listbox.md) outside Formik.

## Key props and composition

- `name` is required and binds the selected value to Formik state.
- `options`, `placeholder`, and related listbox props pass through.
- The component expects a parent `Formik` provider.

## Common patterns

- Use for status and assignee fields when you want a custom select presentation in forms.

## Accessibility and behavior notes

- Keep the field label and placeholder clear because the selected value can begin empty.

## Related components

- [Listbox](./Listbox.md)
- [FormikSelect](./FormikSelect.md)
- [FormikCombobox](./FormikCombobox.md)
