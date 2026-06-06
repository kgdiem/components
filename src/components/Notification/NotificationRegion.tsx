import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ComponentPropsWithoutRef,
} from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import { Box } from "../../structures/Box";

import { DEFAULT_REGION } from "./constants";
import { NotificationContext, useNotification } from "./context";
import { NotificationList, NotificationViewport } from "./primitives";
import { SimpleNotification } from "./SimpleNotification";
import type {
  NotificationRecord,
  NotificationRegionProps,
  ReduceMotionPreference,
} from "./types";

function NotificationAnnouncement({
  item,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  reduceMotion,
}: {
  item: NotificationRecord;
  onBlur: (id: string) => void;
  onFocus: (id: string) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  reduceMotion: ReduceMotionPreference;
}) {
  return (
    <Box
      aria-atomic="true"
      aria-live={item.priority}
      className="contents"
      data-notification-announcement={item.priority}
    >
      <ManagedNotificationItem
        item={item}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        reduceMotion={reduceMotion}
      />
    </Box>
  );
}

function ManagedNotificationItem({
  item,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  reduceMotion,
}: {
  item: NotificationRecord;
  onBlur: (id: string) => void;
  onFocus: (id: string) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  reduceMotion: ReduceMotionPreference;
}) {
  const { dismiss } = useNotification();

  return (
    <SimpleNotification
      actions={item.actions}
      closeLabel={item.closeLabel}
      description={item.description}
      icon={item.icon}
      iconVariant={item.iconVariant}
      onBlur={() => onBlur(item.id)}
      onClose={() => dismiss(item.id)}
      onFocus={() => onFocus(item.id)}
      onMouseEnter={() => onMouseEnter(item.id)}
      onMouseLeave={() => onMouseLeave(item.id)}
      panelClassName={item.panelClassName}
      reduceMotion={reduceMotion}
      show={item.visible}
      title={item.title}
    />
  );
}

export function NotificationRegion({
  className,
  placement = "viewport",
  position = "bottom-center",
  region = DEFAULT_REGION,
  ...props
}: NotificationRegionProps & ComponentPropsWithoutRef<typeof Box>) {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("NotificationRegion must be used within a NotificationProvider");
  }

  const {
    maxVisible,
    notifications,
    pauseOnFocus,
    pauseOnHover,
    pauseLifetime,
    reduceMotion,
    registerRegion,
    resumeLifetime,
    unregisterRegion,
  } = context;

  registerRegion(region);

  useEffect(() => {
    return () => unregisterRegion(region);
  }, [region, unregisterRegion]);

  const regionNotifications = useMemo(() => {
    const filtered = notifications.filter((item) => item.region === region);

    if (typeof maxVisible === "number") {
      return filtered.slice(-maxVisible);
    }

    return filtered;
  }, [maxVisible, notifications, region]);

  const handleMouseEnter = useCallback(
    (id: string) => {
      if (pauseOnHover) {
        pauseLifetime(id);
      }
    },
    [pauseLifetime, pauseOnHover],
  );

  const handleMouseLeave = useCallback(
    (id: string) => {
      if (pauseOnHover) {
        resumeLifetime(id);
      }
    },
    [pauseOnHover, resumeLifetime],
  );

  const handleFocus = useCallback(
    (id: string) => {
      if (pauseOnFocus) {
        pauseLifetime(id);
      }
    },
    [pauseLifetime, pauseOnFocus],
  );

  const handleBlur = useCallback(
    (id: string) => {
      if (pauseOnFocus) {
        resumeLifetime(id);
      }
    },
    [pauseOnFocus, resumeLifetime],
  );

  if (regionNotifications.length === 0) {
    return (
      <NotificationViewport
        aria-hidden="true"
        className={mergeClasses("hidden", className)}
        data-notification-region={region}
        placement={placement}
        position={position}
        {...props}
      />
    );
  }

  return (
    <NotificationViewport
      className={className}
      data-notification-region={region}
      placement={placement}
      position={position}
      {...props}
    >
      <NotificationList>
        {regionNotifications.map((item) => (
          <NotificationAnnouncement
            key={item.id}
            item={item}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            reduceMotion={reduceMotion}
          />
        ))}
      </NotificationList>
    </NotificationViewport>
  );
}
