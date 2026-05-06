import type { HTMLAttributes } from "react";
import { mergeClasses } from "../utils/mergeClasses";

type TextVariant = "body" | "bodySm" | "muted" | "subtle" | "caption" | "label";
type TextElement = "p" | "span" | "div" | "label";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextElement;
  className?: string;
  variant?: TextVariant;
};

const BASE_TEXT_CLASSES = "text-text";

const TEXT_VARIANT_CLASSES: Record<TextVariant, string> = {
  body: "text-base",
  bodySm: "text-sm",
  muted: "text-sm text-textMuted",
  subtle: "text-sm text-textSubtle",
  caption: "text-xs text-textMuted",
  label: "text-sm font-medium",
};

export function Text({ as = "p", className, variant = "body", ...props }: TextProps) {
  const Component = as;

  return (
    <Component
      className={mergeClasses(BASE_TEXT_CLASSES, TEXT_VARIANT_CLASSES[variant], className)}
      {...props}
    />
  );
}
