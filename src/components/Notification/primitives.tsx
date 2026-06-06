import { Transition } from "@headlessui/react";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import { Box } from "../../structures/Box";
import { Horizontal } from "../../structures/Horizontal";
import { Vertical } from "../../structures/Vertical";

import { CloseIcon } from "./CloseIcon";
import {
  DEFAULT_CLOSE_LABEL,
  NOTIFICATION_ACTIONS_CLASSES,
  NOTIFICATION_CLOSE_CLASSES,
  NOTIFICATION_CONTENT_CLASSES,
  NOTIFICATION_DESCRIPTION_CLASSES,
  NOTIFICATION_ICON_VARIANT_CLASSES,
  NOTIFICATION_LIST_CLASSES,
  NOTIFICATION_PANEL_BASE_CLASSES,
  NOTIFICATION_PANEL_REDUCED_MOTION_CLASSES,
  NOTIFICATION_POSITION_CLASSES,
  NOTIFICATION_TITLE_CLASSES,
  NOTIFICATION_VIEWPORT_BASE_CLASSES,
  NOTIFICATION_VIEWPORT_PLACEMENT_CLASSES,
} from "./constants";
import type {
  NotificationCloseProps,
  NotificationIconVariant,
  NotificationPanelProps,
  NotificationPlacement,
  NotificationPosition,
} from "./types";
import { shouldReduceMotion } from "./utils";

export const NotificationPanel = forwardRef<HTMLDivElement, NotificationPanelProps>(
  function NotificationPanel(
    { children, className, reduceMotion = "auto", show, ...props },
    ref,
  ) {
    const reducedMotion = shouldReduceMotion(reduceMotion);

    return (
      <Transition show={show}>
        <Box
          ref={ref}
          data-notification-panel
          className={mergeClasses(
            NOTIFICATION_PANEL_BASE_CLASSES,
            reducedMotion ? NOTIFICATION_PANEL_REDUCED_MOTION_CLASSES : undefined,
            className,
          )}
          {...props}
        >
          {children}
        </Box>
      </Transition>
    );
  },
);

export const NotificationContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Horizontal>
>(function NotificationContent({ className, ...props }, ref) {
  return (
    <Horizontal
      ref={ref}
      className={mergeClasses(NOTIFICATION_CONTENT_CLASSES, className)}
      {...props}
    />
  );
});

export const NotificationBody = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Vertical>
>(function NotificationBody({ className, ...props }, ref) {
  return (
    <Vertical ref={ref} className={mergeClasses("ml-3 w-0 flex-1 pt-0.5", className)} {...props} />
  );
});

type NotificationIconProps = ComponentPropsWithoutRef<typeof Box> & {
  children: ReactNode;
  variant?: NotificationIconVariant;
};

export const NotificationIcon = forwardRef<HTMLDivElement, NotificationIconProps>(
  function NotificationIcon({ children, className, variant = "neutral", ...props }, ref) {
    return (
      <Box
        ref={ref}
        className={mergeClasses(
          "shrink-0",
          NOTIFICATION_ICON_VARIANT_CLASSES[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

type NotificationTitleProps = ComponentPropsWithoutRef<"p">;

export const NotificationTitle = forwardRef<HTMLParagraphElement, NotificationTitleProps>(
  function NotificationTitle({ className, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={mergeClasses(NOTIFICATION_TITLE_CLASSES, className)}
        {...props}
      />
    );
  },
);

type NotificationDescriptionProps = ComponentPropsWithoutRef<"p">;

export const NotificationDescription = forwardRef<
  HTMLParagraphElement,
  NotificationDescriptionProps
>(function NotificationDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={mergeClasses(NOTIFICATION_DESCRIPTION_CLASSES, className)}
      {...props}
    />
  );
});

export const NotificationActions = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Box>
>(function NotificationActions({ className, ...props }, ref) {
  return (
    <Box
      ref={ref}
      className={mergeClasses(NOTIFICATION_ACTIONS_CLASSES, className)}
      {...props}
    />
  );
});

export const NotificationClose = forwardRef<HTMLButtonElement, NotificationCloseProps>(
  function NotificationClose({ children, className, label = DEFAULT_CLOSE_LABEL, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={mergeClasses("ml-4", NOTIFICATION_CLOSE_CLASSES, className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
        {children ?? <CloseIcon />}
      </button>
    );
  },
);

export const NotificationList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Box>
>(function NotificationList({ className, ...props }, ref) {
  return (
    <Box
      ref={ref}
      data-notification-list
      className={mergeClasses(NOTIFICATION_LIST_CLASSES, className)}
      {...props}
    />
  );
});

export const NotificationViewport = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Box> & {
    placement?: NotificationPlacement;
    position?: NotificationPosition;
  }
>(function NotificationViewport(
  { className, placement = "viewport", position = "bottom-center", ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      className={mergeClasses(
        NOTIFICATION_VIEWPORT_BASE_CLASSES,
        NOTIFICATION_VIEWPORT_PLACEMENT_CLASSES[placement],
        NOTIFICATION_POSITION_CLASSES[position],
        className,
      )}
      {...props}
    />
  );
});
