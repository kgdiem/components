# Sidebar

## What is it?

`Sidebar` provides a composed navigation shell with header, nav, section, item, and footer building blocks.

## Import

```tsx
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
} from "@kgdiem/components";
```

## When to use it

- Use for persistent app navigation on dashboard-style layouts.
- Prefer it when navigation needs grouped sections, active states, and a branded shell.

## Key props and composition

- `Sidebar` is the outer container.
- `SidebarHeader`, `SidebarNav`, `SidebarSection`, `SidebarItem`, and `SidebarFooter` compose the internal structure.
- `SidebarItem` can render links or other elements through its `as` prop pattern.

## Common patterns

- Group main destinations in one section and teams or secondary links in another.
- Use a footer row for profile navigation or account actions.

## Accessibility and behavior notes

- Mark the active destination clearly so both visual users and assistive tech users can orient themselves.
- Keep section labels meaningful when navigation is split into multiple groups.

## Related components

- [Tabs](./Tabs.md)
- [Horizontal](../structures/Horizontal.md)
- [Box](../structures/Box.md)
