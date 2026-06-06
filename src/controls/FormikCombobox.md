# FormikCombobox

## What is it?

`FormikCombobox` connects [Combobox](./Combobox.md) to Formik field state.

## Import

```tsx
import { FormikCombobox } from "@kgdiem/components";
```

## When to use it

- Use for searchable selection fields inside Formik forms.
- Prefer the base [Combobox](./Combobox.md) outside Formik.

## Key props and composition

- `name` is required and maps the selected value into Formik state.
- `options`, `placeholder`, and related combobox props pass through.
- The component expects a parent `Formik` provider.

## Common patterns

- Use for people pickers, team selection, and longer option sets in forms.

## Accessibility and behavior notes

- Keep option labels specific so filtering stays meaningful as the user types.

## Related components

- [Combobox](./Combobox.md)
- [FormikListbox](./FormikListbox.md)
- [FormikSelect](./FormikSelect.md)
