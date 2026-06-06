import type { ReduceMotionPreference } from "./types";

export function createNotificationId(explicitId?: string) {
  if (explicitId) {
    return explicitId;
  }

  return `notification-${Math.random().toString(36).slice(2, 10)}`;
}

export function shouldReduceMotion(preference: ReduceMotionPreference) {
  if (preference === "always") {
    return true;
  }

  if (preference === "never") {
    return false;
  }

  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
