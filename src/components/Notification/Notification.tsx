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
    <NotificationPanel className={panelClassName} reduceMotion={reduceMotion} show={show}>
      <NotificationContent
        className={className}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </NotificationContent>
    </NotificationPanel>
  );
}
