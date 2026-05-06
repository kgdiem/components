import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { mergeClasses } from "../utils/mergeClasses";

type HeaderElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeaderProps = ComponentPropsWithoutRef<"h2"> & {
  as?: HeaderElement;
  className?: string;
};

const BASE_HEADER_CLASSES = "font-semibold tracking-tight text-text";

const HEADER_SIZE_CLASSES: Record<HeaderElement, string> = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-base",
};

export const Header = forwardRef<HTMLHeadingElement, HeaderProps>(function Header(
  { as = "h2", className, ...props },
  ref,
) {
  const Component = as;

  return (
    <Component
      ref={ref}
      className={mergeClasses(BASE_HEADER_CLASSES, HEADER_SIZE_CLASSES[as], className)}
      {...props}
    />
  );
});
