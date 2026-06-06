# Input

## What is it?

`Input` is the default single-line text field for typed values such as names, email addresses, and search queries.

## Import

```tsx
import { Input } from "@kgdiem/components";
```

## When to use it

- Use for short freeform values entered on a single line.
- Use `type="search"` with `clearable` for search or filter controls.
- Switch to [Textarea](./Textarea.md) when the content needs multiple lines.

## Key props and composition

- `type` controls the browser input mode, such as `text`, `email`, or `search`.
- `value` and `onChange` support controlled usage.
- `clearable` adds a clear action for eligible input types.
- Standard input attributes pass through to the underlying field.

## Common patterns

- Pair with [Label](../typography/Label.md) for visible field context.
- Use alongside [Select](./Select.md) or [Combobox](./Combobox.md) in filter bars and forms.

## Accessibility and behavior notes

- Always provide a visible label or equivalent accessible name.
- Prefer type-specific modes like `email` when they improve keyboard and validation behavior.

## Related components

- [Textarea](./Textarea.md)
- [Combobox](./Combobox.md)
- [PasswordInput](./PasswordInput.md)
- [FormikInput](./FormikInput.md)
