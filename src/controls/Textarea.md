# Textarea

## What it is

`Textarea` is the multi-line text field for notes, descriptions, and message-style input.

## Import

```tsx
import { Textarea } from "@kgdiem/components";
```

## When to use it

- Use when the user may need more than a short line of text.
- Prefer it for descriptions, comments, and other freeform content.

## Key props and composition

- `rows` sets the initial visible height.
- `value` and `onChange` support controlled usage.
- Standard textarea attributes pass through to the underlying element.

## Common patterns

- Pair with [Label](../typography/Label.md) for context and helper copy.
- Use in [Dialog](../components/Dialog.md) or [Card](../structures/Card.md) flows when gathering short-form written input.

## Accessibility and behavior notes

- Provide a visible label and keep placeholder text supplemental rather than primary instruction.
- Set a sensible initial height so users can see the expected amount of content.

## Related components

- [Input](./Input.md)
- [FormikTextarea](./FormikTextarea.md)
- [Label](../typography/Label.md)
