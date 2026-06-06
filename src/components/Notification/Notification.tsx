import { mergeClasses } from "../../utils/mergeClasses";

import { NotificationContent, NotificationPanel } from "./primitives";
import type { NotificationProps } from "./types";

export function Notification({
  children,
  className,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  panelClassName,
  reduceMotion = "auto",
  show,
}: NotificationProps) {
  return (
    <NotificationPanel
      className={mergeClasses(className, panelClassName)}
      reduceMotion={reduceMotion}
      show={show}
    >
      <NotificationContent
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseOut={onMouseLeave}
        onMouseOver={onMouseEnter}
      >
        {children}
      </NotificationContent>
    </NotificationPanel>
  );
}
