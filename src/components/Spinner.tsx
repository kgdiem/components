import { mergeClasses } from "../utils/mergeClasses";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
};

const SPINNER_PIXEL_SIZE: Record<SpinnerSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  const pixelSize = SPINNER_PIXEL_SIZE[size];

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      className={mergeClasses("shrink-0 animate-spin", className)}
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
