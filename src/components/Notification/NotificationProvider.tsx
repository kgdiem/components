import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_CLOSE_LABEL, DEFAULT_REGION, DISMISS_TRANSITION_MS } from "./constants";
import { NotificationContext, type NotificationContextValue } from "./context";
import type {
  NotificationProviderProps,
  NotificationRecord,
  NotifyOptions,
  TimerState,
} from "./types";
import { createNotificationId } from "./utils";

export function NotificationProvider({
  children,
  defaultDuration = 5000,
  defaultRegion = DEFAULT_REGION,
  maxVisible,
  pauseOnFocus = true,
  pauseOnHover = true,
  reduceMotion = "auto",
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const notificationsRef = useRef<NotificationRecord[]>([]);
  const registeredRegionsRef = useRef(new Set<string>());
  const timersRef = useRef(new Map<string, TimerState>());
  const removalTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const dismissRef = useRef<(id: string) => void>(() => undefined);

  useEffect(() => {
    notificationsRef.current = notifications;
  }, [notifications]);

  const registerRegion = useCallback((region: string) => {
    registeredRegionsRef.current.add(region);
  }, []);

  const unregisterRegion = useCallback((region: string) => {
    registeredRegionsRef.current.delete(region);
  }, []);

  const isRegionRegistered = useCallback((region: string) => {
    return registeredRegionsRef.current.has(region);
  }, []);

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer?.timeoutId) {
      clearTimeout(timer.timeoutId);
    }
    timersRef.current.delete(id);
  }, []);

  const clearRemovalTimer = useCallback((id: string) => {
    const removalTimer = removalTimersRef.current.get(id);
    if (removalTimer) {
      clearTimeout(removalTimer);
    }
    removalTimersRef.current.delete(id);
  }, []);

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((current) => current.filter((item) => item.id !== id));
      clearTimer(id);
      clearRemovalTimer(id);
    },
    [clearRemovalTimer, clearTimer],
  );

  const dismiss = useCallback(
    (id: string) => {
      let onOpenChange: NotifyOptions["onOpenChange"];
      let wasDismissed = false;

      setNotifications((current) =>
        current.map((item) => {
          if (item.id !== id || !item.visible) {
            return item;
          }

          wasDismissed = true;
          onOpenChange = item.onOpenChange;
          return { ...item, visible: false };
        }),
      );

      if (!wasDismissed) {
        return;
      }

      onOpenChange?.(false);

      clearTimer(id);
      clearRemovalTimer(id);

      const removalTimer = setTimeout(() => {
        removeNotification(id);
      }, DISMISS_TRANSITION_MS);
      removalTimersRef.current.set(id, removalTimer);
    },
    [clearRemovalTimer, clearTimer, removeNotification],
  );

  useEffect(() => {
    dismissRef.current = dismiss;
  }, [dismiss]);

  useEffect(() => {
    const timers = timersRef.current;
    const removalTimers = removalTimersRef.current;

    return () => {
      timers.forEach((timer) => {
        if (timer.timeoutId) {
          clearTimeout(timer.timeoutId);
        }
      });

      removalTimers.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const resolveRegion = useCallback(
    (targetRegion?: string) => {
      const requestedRegion = targetRegion ?? defaultRegion;

      if (isRegionRegistered(requestedRegion)) {
        return requestedRegion;
      }

      return defaultRegion;
    },
    [defaultRegion, isRegionRegistered],
  );

  const startTimer = useCallback(
    (id: string, durationMs: number) => {
      clearTimer(id);

      const endsAt = Date.now() + durationMs;
      const timeoutId = setTimeout(() => {
        dismissRef.current(id);
      }, durationMs);

      timersRef.current.set(id, {
        timeoutId,
        endsAt,
      });
    },
    [clearTimer],
  );

  const pauseLifetime = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (!timer?.timeoutId) {
      return;
    }

    clearTimeout(timer.timeoutId);

    const remainingMs = Math.max(timer.endsAt - Date.now(), 0);

    timersRef.current.set(id, {
      timeoutId: null,
      endsAt: Date.now() + remainingMs,
    });
  }, []);

  const resumeLifetime = useCallback(
    (id: string) => {
      const timer = timersRef.current.get(id);
      if (!timer || timer.timeoutId) {
        return;
      }

      const remainingMs = Math.max(timer.endsAt - Date.now(), 0);
      if (remainingMs <= 0) {
        dismissRef.current(id);
        return;
      }

      startTimer(id, remainingMs);
    },
    [startTimer],
  );

  const notify = useCallback(
    (options: NotifyOptions) => {
      const id = createNotificationId(options.id);
      const region = resolveRegion(options.region);
      const duration = options.duration !== undefined ? options.duration : defaultDuration;
      const priority = options.priority ?? "polite";
      const closeLabel = options.closeLabel ?? DEFAULT_CLOSE_LABEL;

      const record: NotificationRecord = {
        ...options,
        id,
        region,
        priority,
        closeLabel,
        visible: true,
        duration,
      };

      clearRemovalTimer(id);

      setNotifications((current) => {
        const existingIndex = current.findIndex((item) => item.id === id);

        if (existingIndex === -1) {
          return [...current, record];
        }

        const next = [...current];
        next[existingIndex] = record;
        return next;
      });
      options.onOpenChange?.(true);

      if (typeof duration === "number" && duration > 0) {
        startTimer(id, duration);
      } else {
        clearTimer(id);
      }

      return id;
    },
    [clearRemovalTimer, clearTimer, defaultDuration, resolveRegion, startTimer],
  );

  const dismissAll = useCallback(
    (region?: string) => {
      notificationsRef.current
        .filter((item) => (region ? item.region === region : true))
        .forEach((item) => dismiss(item.id));
    },
    [dismiss],
  );

  const contextValue = useMemo<NotificationContextValue>(
    () => ({
      notify,
      dismiss,
      dismissAll,
      defaultRegion,
      defaultDuration,
      pauseOnHover,
      pauseOnFocus,
      maxVisible,
      reduceMotion,
      notifications,
      registerRegion,
      unregisterRegion,
      isRegionRegistered,
      pauseLifetime,
      resumeLifetime,
    }),
    [
      notify,
      dismiss,
      dismissAll,
      defaultRegion,
      defaultDuration,
      pauseOnHover,
      pauseOnFocus,
      maxVisible,
      reduceMotion,
      notifications,
      registerRegion,
      unregisterRegion,
      isRegionRegistered,
      pauseLifetime,
      resumeLifetime,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
}
