# Switch

## What it is

`Switch` is the binary on or off control for settings and preferences.

## Import

```tsx
import { Switch } from "@kgdiem/components";
```

## When to use it

- Use for immediate boolean settings such as feature toggles or preferences.
- Prefer a checkbox when the label needs to read as a sentence with explicit checked semantics.

## Key props and composition

- `checked` and `onChange` support controlled state.
- `label` provides the primary description of the setting.
- Optional descriptive copy can clarify the impact of enabling the control.

## Common patterns

- Use inside settings pages, preference cards, or filter sidebars.
- Group related switches inside [Card](../structures/Card.md) or [Vertical](../structures/Vertical.md) layouts.

## Accessibility and behavior notes

- Write labels as clear stateful settings, not as commands.
- Keep any supporting description close to the switch so the effect is obvious.

## Related components

- [RadioGroup](./RadioGroup.md)
- [FormikSwitch](./FormikSwitch.md)
- [Card](../structures/Card.md)
