import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "./Box";

type CardProps = ComponentPropsWithoutRef<typeof Box> & {
  header?: ReactNode;
  footer?: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, header, footer, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      className={mergeClasses(
        "overflow-hidden bg-surface shadow-sm border border-borderSubtle sm:rounded-lg",
        className
      )}
      {...props}
    >
      {header ? (
        <Box className="border-b border-borderSubtle px-4 py-5 sm:px-6">
          {header}
        </Box>
      ) : null}
      <Box className="px-4 py-5 sm:p-6">{children}</Box>
      {footer ? (
        <Box className="border-t border-borderSubtle px-4 py-4 sm:px-6">
          {footer}
        </Box>
      ) : null}
    </Box>
  );
});
