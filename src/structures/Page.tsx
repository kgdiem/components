import { forwardRef } from "react";
import { Box, type BoxProps } from "./Box";
import { mergeClasses } from "../utils/mergeClasses";

type PageProps = BoxProps;

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, className, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      className={mergeClasses("mx-auto max-w-7xl sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Box>
  );
});
