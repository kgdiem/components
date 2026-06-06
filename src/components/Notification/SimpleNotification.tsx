import { DEFAULT_CLOSE_LABEL } from "./constants";
import { Notification } from "./Notification";
import {
  NotificationActions,
  NotificationBody,
  NotificationClose,
  NotificationDescription,
  NotificationIcon,
  NotificationTitle,
} from "./primitives";
import type { SimpleNotificationProps } from "./types";

export function SimpleNotification({
  actions,
  className,
  closeLabel = DEFAULT_CLOSE_LABEL,
  description,
  icon,
  iconVariant = "neutral",
  onBlur,
  onClose,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  panelClassName,
  reduceMotion = "auto",
  show,
  title,
}: SimpleNotificationProps) {
  return (
    <Notification
      className={className}
      onBlur={onBlur}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      panelClassName={panelClassName}
      reduceMotion={reduceMotion}
      show={show}
    >
      {icon ? <NotificationIcon variant={iconVariant}>{icon}</NotificationIcon> : null}
      <NotificationBody>
        {title ? <NotificationTitle>{title}</NotificationTitle> : null}
        {description ? <NotificationDescription>{description}</NotificationDescription> : null}
        {actions ? <NotificationActions>{actions}</NotificationActions> : null}
      </NotificationBody>
      {onClose ? <NotificationClose label={closeLabel} onClick={onClose} /> : null}
    </Notification>
  );
}
