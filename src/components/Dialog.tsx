import {
  Description,
  Dialog as HeadlessUiDialog,
  DialogBackdrop as HeadlessUiDialogBackdrop,
  DialogPanel as HeadlessUiDialogPanel,
  DialogTitle as HeadlessUiDialogTitle,
} from "@headlessui/react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { mergeClasses } from "../utils/mergeClasses";
import { Box } from "../structures/Box";
import { Vertical } from "../structures/Vertical";

type DialogSize = "sm" | "md" | "lg";
type DialogIconVariant = "success" | "warning" | "danger" | "info";
type DialogFooterLayout = "single" | "dual";
type DialogTitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type DialogRootProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialog>,
  "className"
> & {
  className?: string;
};

type DialogBackdropComponentProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialogBackdrop>,
  "className"
> & {
  className?: string;
};

type DialogPanelComponentProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialogPanel>,
  "className"
> & {
  className?: string;
  size?: DialogSize;
};

type DialogTitleComponentProps = Omit<
  ComponentPropsWithoutRef<typeof HeadlessUiDialogTitle>,
  "className"
> & {
  className?: string;
};

type DialogDescriptionProps = Omit<
  ComponentPropsWithoutRef<typeof Description>,
  "className"
> & {
  className?: string;
};

type DialogProps = Omit<DialogRootProps, "children"> & {
  backdropClassName?: string;
  children?: ReactNode;
  panelClassName?: string;
  size?: DialogSize;
};

type SimpleDialogProps = Omit<DialogRootProps, "children"> & {
  backdropClassName?: string;
  bodyClassName?: string;
  centered?: boolean;
  children?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  footerLayout?: DialogFooterLayout;
  icon?: ReactNode;
  iconVariant?: DialogIconVariant;
  panelClassName?: string;
  size?: DialogSize;
  title?: ReactNode;
  titleAs?: DialogTitleElement;
};

const DIALOG_ROOT_CLASSES = "relative z-50";

const DIALOG_BACKDROP_CLASSES =
  "fixed inset-0 bg-text/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in";

const DIALOG_CONTAINER_OUTER_CLASSES =
  "fixed inset-0 z-10 w-screen overflow-y-auto";

const DIALOG_CONTAINER_INNER_CLASSES =
  "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0";

const DIALOG_PANEL_BASE_CLASSES =
  "relative transform overflow-hidden rounded-lg bg-surfaceRaised px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95";

const DIALOG_PANEL_SIZE_CLASSES: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
};

const DIALOG_TITLE_CLASSES = "text-base font-semibold text-text";

const DIALOG_DESCRIPTION_CLASSES = "text-sm text-textMuted";

const DIALOG_BODY_CLASSES = "text-center sm:text-left";

const DIALOG_ICON_BASE_CLASSES =
  "mx-auto flex size-12 items-center justify-center rounded-full";

const DIALOG_ICON_VARIANT_CLASSES: Record<DialogIconVariant, string> = {
  success: "bg-successSubtle text-success",
  warning: "bg-warningSubtle text-warning",
  danger: "bg-dangerSubtle text-danger",
  info: "bg-infoSubtle text-info",
};

const DIALOG_FOOTER_BASE_CLASSES = "mt-5 sm:mt-6";

const DIALOG_FOOTER_LAYOUT_CLASSES: Record<DialogFooterLayout, string> = {
  single: "[&>:only-child]:w-full",
  dual: "sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 [&>:first-child]:w-full [&>:first-child]:sm:col-start-2 [&>:last-child]:mt-3 [&>:last-child]:w-full [&>:last-child]:sm:col-start-1 [&>:last-child]:sm:mt-0",
};

export function DialogRoot({ className, ...props }: DialogRootProps) {
  return (
    <HeadlessUiDialog
      className={mergeClasses(DIALOG_ROOT_CLASSES, className)}
      {...props}
    />
  );
}

export function Dialog({
  backdropClassName,
  children,
  className,
  panelClassName,
  size = "md",
  ...rootProps
}: DialogProps) {
  return (
    <DialogRoot className={className} {...rootProps}>
      <DialogBackdrop className={backdropClassName} />
      <DialogContainer>
        <DialogPanel className={panelClassName} size={size}>
          {children}
        </DialogPanel>
      </DialogContainer>
    </DialogRoot>
  );
}

export function SimpleDialog({
  backdropClassName,
  bodyClassName,
  centered,
  children,
  className,
  description,
  footer,
  footerLayout = "single",
  icon,
  iconVariant = "success",
  panelClassName,
  size = "md",
  title,
  titleAs = "h3",
  ...rootProps
}: SimpleDialogProps) {
  const isCentered = centered ?? Boolean(icon);
  const hasHeader = Boolean(title || description || icon);
  const hasBody = hasHeader || Boolean(children);

  return (
    <Dialog
      backdropClassName={backdropClassName}
      className={className}
      panelClassName={panelClassName}
      size={size}
      {...rootProps}
    >
      {hasBody ? (
        <DialogBody
          className={mergeClasses(
            isCentered ? "text-center sm:text-center" : undefined,
            bodyClassName
          )}
        >
          {icon ? <DialogIcon variant={iconVariant}>{icon}</DialogIcon> : null}
          {title || description ? (
            <Vertical className={icon ? "mt-3 sm:mt-5" : undefined}>
              {title ? <DialogTitle as={titleAs}>{title}</DialogTitle> : null}
              {description ? (
                <DialogDescription>{description}</DialogDescription>
              ) : null}
            </Vertical>
          ) : null}
          {children}
        </DialogBody>
      ) : null}
      {footer ? (
        <DialogFooter layout={footerLayout}>{footer}</DialogFooter>
      ) : null}
    </Dialog>
  );
}

export const DialogBackdrop = forwardRef<
  HTMLDivElement,
  DialogBackdropComponentProps
>(function DialogBackdrop({ className, transition = true, ...props }, ref) {
  return (
    <HeadlessUiDialogBackdrop
      ref={ref}
      transition={transition}
      className={mergeClasses(DIALOG_BACKDROP_CLASSES, className)}
      {...props}
    />
  );
});

type DialogContainerProps = ComponentPropsWithoutRef<typeof Box> & {
  innerClassName?: string;
};

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>(
  function DialogContainer(
    { children, className, innerClassName, ...props },
    ref
  ) {
    return (
      <Box
        ref={ref}
        className={mergeClasses(DIALOG_CONTAINER_OUTER_CLASSES, className)}
        {...props}
      >
        <Box
          className={mergeClasses(
            DIALOG_CONTAINER_INNER_CLASSES,
            innerClassName
          )}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

type DialogPanelProps = DialogPanelComponentProps;

export const DialogPanel = forwardRef<
  HTMLDivElement,
  DialogPanelComponentProps
>(function DialogPanel(
  { className, size = "md", transition = true, ...props },
  ref
) {
  return (
    <HeadlessUiDialogPanel
      ref={ref}
      transition={transition}
      className={mergeClasses(
        DIALOG_PANEL_BASE_CLASSES,
        DIALOG_PANEL_SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  );
});

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  DialogTitleComponentProps
>(function DialogTitle({ as = "h3", className, ...props }, ref) {
  return (
    <HeadlessUiDialogTitle
      ref={ref}
      as={as}
      className={mergeClasses(DIALOG_TITLE_CLASSES, className)}
      {...props}
    />
  );
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <Description
      ref={ref}
      className={mergeClasses(DIALOG_DESCRIPTION_CLASSES, className)}
      {...props}
    />
  );
});

type DialogBodyProps = ComponentPropsWithoutRef<typeof Vertical>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody({ className, ...props }, ref) {
    return (
      <Vertical
        ref={ref}
        className={mergeClasses(DIALOG_BODY_CLASSES, className)}
        {...props}
      />
    );
  }
);

type DialogIconProps = ComponentPropsWithoutRef<typeof Box> & {
  children: ReactNode;
  variant?: DialogIconVariant;
};

export const DialogIcon = forwardRef<HTMLDivElement, DialogIconProps>(
  function DialogIcon(
    { children, className, variant = "success", ...props },
    ref
  ) {
    return (
      <Box
        ref={ref}
        className={mergeClasses(
          DIALOG_ICON_BASE_CLASSES,
          DIALOG_ICON_VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

type DialogFooterProps = ComponentPropsWithoutRef<typeof Box> & {
  layout?: DialogFooterLayout;
};

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, layout = "single", ...props }, ref) {
    return (
      <Box
        ref={ref}
        className={mergeClasses(
          DIALOG_FOOTER_BASE_CLASSES,
          DIALOG_FOOTER_LAYOUT_CLASSES[layout],
          className
        )}
        {...props}
      />
    );
  }
);

export type {
  DialogBackdropComponentProps as DialogBackdropProps,
  DialogDescriptionProps,
  DialogFooterLayout,
  DialogIconVariant,
  DialogPanelProps,
  DialogProps,
  DialogRootProps,
  DialogSize,
  SimpleDialogProps,
  DialogTitleComponentProps as DialogTitleProps,
  DialogTitleElement,
};
