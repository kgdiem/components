# Listbox

## What is it?

`Listbox` is a custom single-select control for richer option presentation than a native select.

## Import

```tsx
import { Listbox } from "@kgdiem/components";
```

## When to use it

- Use when you need a styled custom select with better visual control.
- Prefer it over [Select](./Select.md) when option presentation or interaction polish matters.
- Switch to [Combobox](./Combobox.md) when users need filtering or search.

## Key props and composition

- `options` defines the available values.
- `value` and `onChange` support controlled usage.
- `placeholder` handles the empty state before selection.
- Disabled options remain visible but not selectable.

## Common patterns

- Use for custom status pickers, assignee pickers, or settings panels with moderate option counts.
- Pair with [Label](../typography/Label.md) and helper text in forms.

## Accessibility and behavior notes

- Keep option labels distinct so keyboard and screen reader navigation stays clear.
- Use placeholder text only when an unselected state is valid.

## Related components

- [Select](./Select.md)
- [Combobox](./Combobox.md)
- [FormikListbox](./FormikListbox.md)
