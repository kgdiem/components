# FormikFileUpload

## What it is

`FormikFileUpload` connects [FileUpload](./FileUpload.md) to Formik field state.

## Import

```tsx
import { FormikFileUpload } from "@kgdiem/components";
```

## When to use it

- Use when a file picker lives inside a Formik-managed form.
- Prefer the base [FileUpload](./FileUpload.md) when you are not using Formik.

## Key props and composition

- `name` is required and maps the field to Formik values.
- Most `FileUpload` props pass through to the underlying control.
- The component expects an active `Formik` provider above it.

## Common patterns

- Initialize single-file fields with `null` and multiple-file fields with `[]`.
- Pair with [Label](../typography/Label.md) and external validation messaging if your form pattern includes it.

## Accessibility and behavior notes

- Keep the `name` stable so validation and touched state map correctly.
- Provide the same visible labeling you would provide for the base control.

## Related components

- [FileUpload](./FileUpload.md)
- [FormikDropzone](./FormikDropzone.md)
