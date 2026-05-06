import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "./Box";

type CardProps = ComponentPropsWithoutRef<typeof Box> & {
  header?: ReactNode;
  footer?: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, header, footer, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      className={mergeClasses(
        "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10",
        className,
      )}
      {...props}
    >
      {header ? <Box className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-white/10">{header}</Box> : null}
      <Box className="px-4 py-5 sm:p-6">{children}</Box>
      {footer ? <Box className="border-t border-gray-200 px-4 py-4 sm:px-6 dark:border-white/10">{footer}</Box> : null}
    </Box>
  );
});
