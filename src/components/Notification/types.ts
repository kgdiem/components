import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { Box } from "../../structures/Box";

export type NotificationIconVariant = "success" | "warning" | "danger" | "info" | "neutral";
export type NotificationPriority = "polite" | "assertive";
export type NotificationLifetime = number | false;
export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
export type NotificationPlacement = "viewport" | "container";
export type ReduceMotionPreference = "auto" | "always" | "never";

export type NotifyOptions = {
  id?: string;
  region?: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  iconVariant?: NotificationIconVariant;
  actions?: ReactNode;
  duration?: NotificationLifetime;
  priority?: NotificationPriority;
  onOpenChange?: (open: boolean) => void;
  closeLabel?: string;
  panelClassName?: string;
};

export type NotificationRecord = NotifyOptions & {
  id: string;
  region: string;
  priority: NotificationPriority;
  closeLabel: string;
  visible: boolean;
  duration: NotificationLifetime;
};

export type NotificationAPI = {
  notify: (options: NotifyOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: (region?: string) => void;
};

export type NotificationProviderProps = {
  children: ReactNode;
  defaultDuration?: NotificationLifetime;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  maxVisible?: number;
  reduceMotion?: ReduceMotionPreference;
  defaultRegion?: string;
};

export type NotificationRegionProps = {
  region?: string;
  position?: NotificationPosition;
  placement?: NotificationPlacement;
  className?: string;
};

export type SimpleNotificationProps = {
  show: boolean;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  iconVariant?: NotificationIconVariant;
  actions?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
  panelClassName?: string;
  reduceMotion?: ReduceMotionPreference;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export type NotificationProps = {
  show: boolean;
  children?: ReactNode;
  className?: string;
  panelClassName?: string;
  reduceMotion?: ReduceMotionPreference;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export type NotificationPanelProps = ComponentPropsWithoutRef<typeof Box> & {
  show: boolean;
  reduceMotion?: ReduceMotionPreference;
};

export type NotificationCloseProps = ComponentPropsWithoutRef<"button"> & {
  label?: string;
};

export type TimerState = {
  timeoutId: ReturnType<typeof setTimeout> | null;
  endsAt: number;
};
