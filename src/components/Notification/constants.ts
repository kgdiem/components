import type { NotificationIconVariant, NotificationPosition } from "./types";

export const DEFAULT_REGION = "global";
export const DEFAULT_CLOSE_LABEL = "Close notification";
export const DISMISS_TRANSITION_MS = 150;

export const NOTIFICATION_PANEL_BASE_CLASSES =
  "pointer-events-auto w-full max-w-sm rounded-lg bg-surface shadow-lg outline-1 outline-border/50 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0";

export const NOTIFICATION_PANEL_REDUCED_MOTION_CLASSES =
  "data-enter:duration-0 data-leave:duration-0 data-closed:data-enter:translate-y-0 data-closed:data-enter:sm:translate-x-0";

export const NOTIFICATION_CONTENT_CLASSES = "flex items-start p-4";

export const NOTIFICATION_ICON_VARIANT_CLASSES: Record<NotificationIconVariant, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-textMuted",
};

export const NOTIFICATION_TITLE_CLASSES = "text-sm font-medium text-text";

export const NOTIFICATION_DESCRIPTION_CLASSES = "mt-1 text-sm text-textMuted";

export const NOTIFICATION_ACTIONS_CLASSES = "mt-3 flex gap-x-7";

export const NOTIFICATION_CLOSE_CLASSES =
  "inline-flex shrink-0 rounded-md text-textMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

export const NOTIFICATION_VIEWPORT_BASE_CLASSES =
  "pointer-events-none z-50 flex flex-col px-4 py-6 sm:p-6";

export const NOTIFICATION_VIEWPORT_PLACEMENT_CLASSES = {
  viewport: "fixed inset-0",
  container: "absolute inset-0 overflow-visible",
} as const;

export const NOTIFICATION_LIST_CLASSES =
  "pointer-events-auto flex w-sm max-w-[calc(100%-2rem)] shrink-0 flex-col gap-4";

export const NOTIFICATION_POSITION_CLASSES: Record<NotificationPosition, string> = {
  "top-left": "items-start justify-start",
  "top-center": "items-center justify-start",
  "top-right": "items-end justify-start",
  "bottom-left": "items-start justify-end",
  "bottom-center": "items-center justify-end",
  "bottom-right": "items-end justify-end",
};
