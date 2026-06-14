import type { ButtonHTMLAttributes, ReactNode } from "react";
import { mergeClasses } from "../utils/mergeClasses";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const BASE_BUTTON_CLASSES =
  "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-textInverse hover:bg-primaryHover active:bg-primaryActive",
  secondary:
    "bg-surface text-text border border-border hover:bg-surfaceMuted active:bg-bg",
  tertiary: "bg-transparent text-primary hover:bg-primarySubtle active:bg-primaryMuted",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-7 gap-1.5 rounded-md px-3 py-1 text-xs",
  md: "h-9 gap-1.5 rounded-md px-4 py-2 text-sm",
  lg: "h-12 gap-2 rounded-lg px-6 py-3 text-base",
};

const SPINNER_SIZE: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const stateClasses = loading
    ? "cursor-wait opacity-75"
    : "disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      type={type}
      className={mergeClasses(
        BASE_BUTTON_CLASSES,
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        stateClasses,
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner size={SPINNER_SIZE[size]} /> : null}
      {children}
    </button>
  );
}
