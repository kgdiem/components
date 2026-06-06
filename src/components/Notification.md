# Notification

## What is it?

`Notification` provides toast-style status messaging with a provider-driven API and a lower-level set of composition primitives.

## Import

```tsx
import {
  Notification,
  NotificationActions,
  NotificationBody,
  NotificationClose,
  NotificationDescription,
  NotificationIcon,
  NotificationList,
  NotificationProvider,
  NotificationRegion,
  NotificationTitle,
  NotificationViewport,
  SimpleNotification,
  useNotification,
} from "@kgdiem/components";
```

## When to use it

- Use notifications for save confirmation, async completion, warnings, and lightweight alerts.
- Use assertive notifications only when the event needs immediate attention.
- Prefer inline validation or page-level status for issues that block completion of a form.

## Key props and composition

- `NotificationProvider` owns notification state and default timing.
- `NotificationRegion` controls where toasts render, either in the viewport or in a relative container.
- `useNotification()` exposes `notify()` and `dismiss()` for the high-level API.
- `Notification`, `NotificationBody`, `NotificationTitle`, `NotificationDescription`, `NotificationActions`, and `NotificationClose` support custom layouts.

## Common patterns

- Mount one provider near the app root and render a `NotificationRegion` beside page content.
- Use `duration={false}` for notifications that must stay visible until dismissal.
- Use `panelClassName` for the outer surface and `className` for the inner content row when customizing styles.

```tsx
<NotificationProvider defaultDuration={5000}>
  <App />
  <NotificationRegion />
</NotificationProvider>

const { notify } = useNotification();
notify({ title: "Saved", description: "Your changes were stored." });
```

## Accessibility and behavior notes

- Use descriptive titles so the notification is meaningful when announced out of context.
- Reserve persistent or assertive messaging for events that the user must notice.
- Keep actions short and clear because toast space is intentionally limited.

## Related components

- [Button](./Button.md)
- [Dialog](./Dialog.md)
- [Page](../structures/Page.md)
