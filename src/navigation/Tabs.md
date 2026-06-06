# Tabs

## What is it?

`Tabs` renders tab-style navigation with `Tab` children, including support for mobile selection handling.

## Import

```tsx
import { Tab, Tabs } from "@kgdiem/components";
```

## When to use it

- Use when content or navigation is split into a small set of peer sections.
- Prefer it for top-level subnavigation where all options should stay visible.

## Key props and composition

- `Tabs` is the container and accepts labeling such as `aria-label`.
- `Tab` defines each option and can render links or buttons as children.
- `onMobileChange` handles the mobile selection UI when that behavior matters to the host app.

## Common patterns

- Use linked tabs for navigation and button-backed tabs for local view state.
- Pair with page headings and section summaries in dashboard-style views.

## Accessibility and behavior notes

- Always provide an accessible label for the tab set.
- Keep tab labels short and parallel so users can scan them quickly.

## Related components

- [Sidebar](./Sidebar.md)
- [Page](../structures/Page.md)
- [Header](../typography/Header.md)
