# FormikDropzone

## What it is

`FormikDropzone` connects [Dropzone](./Dropzone.md) to Formik field state.

## Import

```tsx
import { FormikDropzone } from "@kgdiem/components";
```

## When to use it

- Use when a drag-and-drop file target lives inside a Formik-managed form.
- Prefer the base [Dropzone](./Dropzone.md) when you are not using Formik.

## Key props and composition

- `name` is required and maps the field to Formik values.
- Most `Dropzone` props pass through to the underlying control.
- The component expects an active `Formik` provider above it.

## Common patterns

- Initialize single-file fields with `null` and multiple-file fields with `[]`.
- Pair with [Label](../typography/Label.md) and external validation messaging if your form pattern includes it.

## Accessibility and behavior notes

- Keep the `name` stable so validation and touched state map correctly.
- Provide the same visible labeling you would provide for the base control.

## Related components

- [Dropzone](./Dropzone.md)
- [FormikFileUpload](./FormikFileUpload.md)
