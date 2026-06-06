# Dropzone

## What it is

`Dropzone` is a drag-and-drop target for choosing one or more local files.

## Import

```tsx
import { Dropzone } from "@kgdiem/components";
```

## When to use it

- Use when users should drag files into a form or upload surface.
- Prefer [FileUpload](./FileUpload.md) for compact browse-only interactions.

## Key props and composition

- `multiple` enables selecting or dropping more than one file.
- `value` and `onChange` support controlled usage with `File`, `File[]`, or `null`.
- `label` and `description` customize the drop target messaging.
- `accept` limits selectable file types using native input accept rules.

## Common patterns

- Pair with [Label](../typography/Label.md) for visible field context.
- Use `multiple` when users may add several files over time.

## Accessibility and behavior notes

- Always provide a visible label or equivalent accessible name.
- The drop target is keyboard activatable and opens the native file picker.
- A single selected file name is listed below the drop target.
- Multiple selections show a summary that expands on click and exposes file names in a hover tooltip.

## Related components

- [FileUpload](./FileUpload.md)
- [FormikDropzone](./FormikDropzone.md)
