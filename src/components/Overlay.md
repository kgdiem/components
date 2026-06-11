# Overlay

## What is it?

`Overlay` provides full-screen blocking layers for loading states, splash screens, and other transient UI that covers the page. It wraps Headless UI `Dialog` for focus management, scroll locking, and transitions without imposing modal panel chrome.

## Import

```tsx
import { Overlay } from "@kgdiem/components";
```

## When to use it

- Use `Overlay` for loading indicators, brand splash screens, or other centered blocking content.
- Use [Dialog](./Dialog.md) when the user needs to read text and make a decision.
- Keep overlays short-lived and tied to a clear process such as authentication or data loading.

## Key props and composition

- `open` and `onClose` control visibility.
- `dismissible` defaults to `false` so loading overlays stay open until the process completes.
- `children` accepts any custom content such as a logo or spinner.
- `OverlayRoot`, `OverlayBackdrop`, `OverlayContainer`, and `OverlayContent` compose the lower-level API.

## Common patterns

- Pair a solid `backdropClassName="bg-surface"` with a centered logo for splash screens.
- Pass `dismissible` when the overlay should close on Escape or outside clicks.
- Use `contentClassName` to adjust spacing around stacked logo and status text.

## Accessibility and behavior notes

- Provide meaningful content inside the overlay so assistive technologies can announce the state.
- For loading overlays, consider adding `aria-busy` on surrounding content or descriptive text near the spinner.
- Avoid leaving non-dismissible overlays open indefinitely without progress feedback.

## Related components

- [Dialog](./Dialog.md)
- [Button](./Button.md)
