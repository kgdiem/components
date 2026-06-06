# Select

## What it is

`Select` is the native-style pick-one control for compact choice lists.

## Import

```tsx
import { Select } from "@kgdiem/components";
```

## When to use it

- Use for simple single-choice lists where search is unnecessary.
- Prefer it when you want familiar browser behavior and compact layout.
- Switch to [Listbox](./Listbox.md) or [Combobox](./Combobox.md) when custom interaction is more important.

## Key props and composition

- `options` supplies the available choices.
- `value` and `onChange` support controlled usage.
- `placeholder` shows an empty prompt when no value is selected.
- Disabled options stay visible but unavailable.

## Common patterns

- Use for status, assignee, or team filters with short option sets.
- Pair with [Label](../typography/Label.md) in standard forms.

## Accessibility and behavior notes

- Keep option labels short and distinct.
- Use placeholder text only when the field can reasonably start empty.

## Related components

- [Listbox](./Listbox.md)
- [Combobox](./Combobox.md)
- [FormikSelect](./FormikSelect.md)
