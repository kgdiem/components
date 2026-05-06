import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "./Box";

type HorizontalProps = ComponentPropsWithoutRef<typeof Box>;

export const Horizontal = forwardRef<HTMLDivElement, HorizontalProps>(
  function Horizontal({ className, ...props }, ref) {
    return <Box ref={ref} className={mergeClasses("flex flex-row", className)} {...props} />;
  },
);
