# FileUpload

## What it is

`FileUpload` is a button-triggered file picker for choosing one or more local files.

## Import

```tsx
import { FileUpload } from "@kgdiem/components";
```

## When to use it

- Use when users should browse for files from a compact form control.
- Prefer [Dropzone](./Dropzone.md) when drag-and-drop is the primary interaction.

## Key props and composition

- `multiple` enables selecting more than one file.
- `value` and `onChange` support controlled usage with `File`, `File[]`, or `null`.
- `accept` limits selectable file types using native input accept rules.
- `buttonLabel` customizes the trigger button text.

## Common patterns

- Pair with [Label](../typography/Label.md) for visible field context.
- Use `multiple` for attachments that can include several files.

## Accessibility and behavior notes

- Always provide a visible label or equivalent accessible name.
- A single selected file name is shown beside the trigger button.
- Multiple selections show a summary that expands on click and exposes file names in a hover tooltip.

## Related components

- [Dropzone](./Dropzone.md)
- [FormikFileUpload](./FormikFileUpload.md)
