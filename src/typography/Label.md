# Label

## What is it?

`Label` provides consistent form field labeling across text inputs, textareas, switches, radios, selects, and combobox-style controls.

## Import

```tsx
import { Label } from "@kgdiem/components";
```

## When to use it

- Use whenever a form control needs a visible label.
- Prefer it over standalone text styling so field labels stay consistent across control types.

## Key props and composition

- `children` provides the visible label text.
- Use it with related control components such as [Input](../controls/Input.md), [Select](../controls/Select.md), and [Switch](../controls/Switch.md).

## Common patterns

- Wrap or place the label adjacent to the field it names.
- Reuse the same label pattern across plain controls and Formik field wrappers.

## Accessibility and behavior notes

- Every interactive form control should have a clear accessible name, usually through a visible label.
- Keep label text specific enough that errors and validation messages remain understandable out of context.

## Related components

- [Input](../controls/Input.md)
- [Textarea](../controls/Textarea.md)
- [Select](../controls/Select.md)
