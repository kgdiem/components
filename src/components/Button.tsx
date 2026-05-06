import type { ButtonHTMLAttributes, ReactNode } from "react";
import { mergeClasses } from "../utils/mergeClasses";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const BASE_BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-textInverse hover:bg-primaryHover active:bg-primaryActive",
  secondary:
    "bg-surface text-text border border-border hover:bg-surfaceMuted active:bg-bg",
  tertiary: "bg-transparent text-primary hover:bg-primarySubtle active:bg-primaryMuted",
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={mergeClasses(BASE_BUTTON_CLASSES, VARIANT_CLASSES[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
