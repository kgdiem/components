# Sidebar

## What is it?

`Sidebar` provides a composed navigation shell with header, nav, section, item, and footer building blocks.

## Import

```tsx
import {
  Sidebar,
  SidebarDrawer,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarMobileButton,
  SidebarNav,
  SidebarSection,
} from "@kgdiem/components";
```

## When to use it

- Use for persistent app navigation on dashboard-style layouts.
- Prefer it when navigation needs grouped sections, active states, and a branded shell.

## Key props and composition

- `Sidebar` is the outer container.
- Set `collapsible` and drive `collapsed` when you need a desktop rail that can shrink.
- `SidebarHeader`, `SidebarNav`, `SidebarSection`, `SidebarItem`, and `SidebarFooter` compose the internal structure.
- `SidebarItem` can render links or other elements through its `as` prop pattern, and also supports `icon`, `label`, and `badge` props for a standard collapse-aware item layout.
- Collapsed sidebars center `SidebarItem` content automatically, including custom child content.
- `SidebarDrawer` wraps sidebar content in a dialog-backed mobile drawer, and supports `contained` when the drawer should be previewed or anchored inside a bounded surface.
- `SidebarMobileButton` provides a compact mobile trigger button.

## Common patterns

- Group main destinations in one section and teams or secondary links in another.
- Use a footer row for profile navigation or account actions.
- Prefer `SidebarItem` `icon` plus `label` when the sidebar needs to collapse cleanly on desktop.
- Pair `SidebarMobileButton` with `SidebarDrawer` for mobile navigation.
- Use `contained` on `SidebarDrawer` when you want a bounded preview inside Storybook or another framed surface.

## Accessibility and behavior notes

- Mark the active destination clearly so both visual users and assistive tech users can orient themselves.
- Keep section labels meaningful when navigation is split into multiple groups.
- Provide an accessible name on the mobile trigger, such as `aria-label="Open navigation"`.

## Related components

- [Tabs](./Tabs.md)
- [Dialog](../components/Dialog.md)
- [Horizontal](../structures/Horizontal.md)
- [Box](../structures/Box.md)
