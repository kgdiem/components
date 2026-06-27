import { mergeClasses } from "../../utils/mergeClasses";

export type AvatarSize = "xs" | "sm" | "md" | "lg";

export type AvatarProps = {
  /** One or two uppercase initials shown inside the circle. */
  initials: string;
  size?: AvatarSize;
  /** Background utility classes, e.g. `bg-primarySubtle`. */
  backgroundClassName?: string;
  /** Text utility classes, e.g. `text-primary`. */
  textClassName?: string;
  className?: string;
};

const AVATAR_SIZE_CLASSES: Record<
  AvatarSize,
  { container: string; text: string }
> = {
  xs: {
    container: "size-5",
    text: "text-[0.5625rem] leading-none",
  },
  sm: {
    container: "size-8",
    text: "text-sm",
  },
  md: {
    container: "size-10",
    text: "text-sm",
  },
  lg: {
    container: "size-12",
    text: "text-base",
  },
};

export function Avatar({
  initials,
  size = "md",
  backgroundClassName = "bg-primarySubtle",
  textClassName = "text-primary",
  className,
}: AvatarProps) {
  const sizeClasses = AVATAR_SIZE_CLASSES[size];

  return (
    <span
      aria-hidden="true"
      className={mergeClasses(
        "flex shrink-0 items-center justify-center rounded-full font-bold",
        sizeClasses.container,
        sizeClasses.text,
        backgroundClassName,
        textClassName,
        className,
      )}
    >
      {initials}
    </span>
  );
}
