# Dialog

## What it is

`Dialog` provides modal overlays for confirmations, blocking decisions, and focused workflows. The package also exports `SimpleDialog` for common modal patterns with less ceremony.

## Import

```tsx
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  SimpleDialog,
} from "@kgdiem/components";
```

## When to use it

- Use `SimpleDialog` for standard confirmation, warning, or success modals.
- Use `Dialog` when you need custom layout, custom body content, or custom footer actions.
- Keep dialogs for focused decisions rather than large page-sized forms.

## Key props and composition

- `open` and `onClose` control visibility.
- `size` adjusts the dialog width for compact or content-heavy layouts.
- `icon`, `iconVariant`, `title`, `description`, and `footer` cover the most common `SimpleDialog` needs.
- `DialogTitle`, `DialogDescription`, `DialogBody`, and `DialogFooter` compose the lower-level API.

## Common patterns

- Pair destructive actions with a secondary cancel action in `DialogFooter`.
- Use `SimpleDialog` when your dialog mostly needs a title, description, icon, and footer buttons.
- Switch to the composed API when the body needs tables, summaries, or multi-section content.

## Accessibility and behavior notes

- Every dialog should have a clear title that explains the decision being made.
- Prefer concise descriptions that state consequences before the user confirms.
- Keep autofocus on the safest or most common next step for the specific flow.

## Related components

- [Button](./Button.md)
- [Notification](./Notification.md)
- [Card](../structures/Card.md)
