import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "./Box";

type VerticalProps = ComponentPropsWithoutRef<typeof Box>;

export const Vertical = forwardRef<HTMLDivElement, VerticalProps>(function Vertical(
  { className, ...props },
  ref,
) {
  return <Box ref={ref} className={mergeClasses("flex flex-col", className)} {...props} />;
});
