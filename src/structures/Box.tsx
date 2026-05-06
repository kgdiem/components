import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  className?: string;
};

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { children, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});
