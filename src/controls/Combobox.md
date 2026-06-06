# Combobox

## What is it?

`Combobox` is a searchable single-select control for longer or less predictable option lists.

## Import

```tsx
import { Combobox } from "@kgdiem/components";
```

## When to use it

- Use when users benefit from typing to narrow options.
- Prefer it for people pickers, team pickers, and longer taxonomies.
- Use [Listbox](./Listbox.md) or [Select](./Select.md) when the list is already small and obvious.

## Key props and composition

- `options` defines the selectable values.
- `value` and `onChange` support controlled state.
- `placeholder` communicates search intent before selection.
- Disabled options remain visible in the list but cannot be chosen.

## Common patterns

- Use for member assignment, lookup-style status changes, or type-to-filter selection flows.
- Pair with [Label](../typography/Label.md) when used inside forms.

## Accessibility and behavior notes

- Write option labels that remain clear when filtered.
- Avoid extremely ambiguous placeholder text; tell the user what they are searching for.

## Related components

- [Listbox](./Listbox.md)
- [Input](./Input.md)
- [FormikCombobox](./FormikCombobox.md)
