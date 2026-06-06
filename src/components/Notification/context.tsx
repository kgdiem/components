import { createContext, useContext } from "react";

import type {
  NotificationAPI,
  NotificationLifetime,
  NotificationRecord,
  ReduceMotionPreference,
} from "./types";

export type NotificationContextValue = NotificationAPI & {
  defaultRegion: string;
  defaultDuration: NotificationLifetime;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  maxVisible?: number;
  reduceMotion: ReduceMotionPreference;
  notifications: NotificationRecord[];
  registerRegion: (region: string) => void;
  unregisterRegion: (region: string) => void;
  isRegionRegistered: (region: string) => boolean;
  pauseLifetime: (id: string) => void;
  resumeLifetime: (id: string) => void;
};

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification(): NotificationAPI {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }

  return {
    notify: context.notify,
    dismiss: context.dismiss,
    dismissAll: context.dismissAll,
  };
}
