# RadioGroup

## What it is

`RadioGroup` presents a single required or optional choice from a small set of mutually exclusive options.

## Import

```tsx
import { RadioGroup } from "@kgdiem/components";
```

## When to use it

- Use when users should compare all available choices at once.
- Prefer it over a select when the option count is small and descriptions matter.

## Key props and composition

- `options` defines the available choices.
- Each option can include `label`, `value`, `description`, and `disabled`.
- `value` and `onChange` support controlled state.

## Common patterns

- Use for notification method, plan selection, or any small exclusive choice set.
- Pair with [Label](../typography/Label.md) or surrounding explanatory copy when the decision has consequences.

## Accessibility and behavior notes

- Keep option labels parallel so the differences are easy to scan.
- Use option descriptions when labels alone are not enough to explain the tradeoff.

## Related components

- [Select](./Select.md)
- [Listbox](./Listbox.md)
- [FormikRadioGroup](./FormikRadioGroup.md)
