import {
  Dialog as HeadlessUiDialog,
  DialogBackdrop as HeadlessUiDialogBackdrop,
  DialogPanel as HeadlessUiDialogPanel,
} from "@headlessui/react";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "../structures/Box";

type OverlayRootProps = Omit<ComponentPropsWithoutRef<typeof HeadlessUiDialog>, "className"> & {
  className?: string;
};

type OverlayBackdropComponentProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialogBackdrop>,
  "className"
> & {
  className?: string;
};

type OverlayContentComponentProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialogPanel>,
  "className"
> & {
  className?: string;
};

type OverlayProps = Omit<OverlayRootProps, "children" | "onClose"> & {
  backdropClassName?: string;
  children?: ReactNode;
  contentClassName?: string;
  dismissible?: boolean;
  onClose: (value: boolean) => void;
};

const OVERLAY_ROOT_CLASSES = "relative z-50";

const OVERLAY_BACKDROP_CLASSES =
  "fixed inset-0 bg-text/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in";

const OVERLAY_CONTAINER_CLASSES = "fixed inset-0 z-10 flex items-center justify-center p-4";

const OVERLAY_CONTENT_CLASSES =
  "flex flex-col items-center justify-center outline-none transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in";

export function OverlayRoot({ className, ...props }: OverlayRootProps) {
  return (
    <HeadlessUiDialog className={mergeClasses(OVERLAY_ROOT_CLASSES, className)} {...props} />
  );
}

export function Overlay({
  backdropClassName,
  children,
  className,
  contentClassName,
  dismissible = false,
  onClose,
  ...rootProps
}: OverlayProps) {
  const handleClose = dismissible ? onClose : () => undefined;

  return (
    <OverlayRoot className={className} onClose={handleClose} {...rootProps}>
      <OverlayBackdrop className={backdropClassName} />
      <OverlayContainer>
        <OverlayContent className={contentClassName}>{children}</OverlayContent>
      </OverlayContainer>
    </OverlayRoot>
  );
}

export const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropComponentProps>(
  function OverlayBackdrop({ className, transition = true, ...props }, ref) {
    return (
      <HeadlessUiDialogBackdrop
        ref={ref}
        transition={transition}
        className={mergeClasses(OVERLAY_BACKDROP_CLASSES, className)}
        {...props}
      />
    );
  },
);

type OverlayContainerProps = ComponentPropsWithoutRef<typeof Box>;

export const OverlayContainer = forwardRef<HTMLDivElement, OverlayContainerProps>(
  function OverlayContainer({ children, className, ...props }, ref) {
    return (
      <Box ref={ref} className={mergeClasses(OVERLAY_CONTAINER_CLASSES, className)} {...props}>
        {children}
      </Box>
    );
  },
);

export const OverlayContent = forwardRef<HTMLDivElement, OverlayContentComponentProps>(
  function OverlayContent({ className, transition = true, ...props }, ref) {
    return (
      <HeadlessUiDialogPanel
        ref={ref}
        transition={transition}
        className={mergeClasses(OVERLAY_CONTENT_CLASSES, className)}
        {...props}
      />
    );
  },
);

export type {
  OverlayBackdropComponentProps as OverlayBackdropProps,
  OverlayContentComponentProps as OverlayContentProps,
  OverlayProps,
  OverlayRootProps,
};
