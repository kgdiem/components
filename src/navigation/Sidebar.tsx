import {
  forwardRef,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

import { Box } from "../structures/Box";
import { Vertical } from "../structures/Vertical";
import { mergeClasses } from "../utils/mergeClasses";

const SIDEBAR_SHELL_CLASSES =
  "relative grow overflow-y-auto bg-brand px-6 dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10";

const SIDEBAR_HEADER_CLASSES = "flex h-16 shrink-0 items-center";

const SIDEBAR_NAV_CLASSES = "flex flex-1 flex-col";

const SIDEBAR_SECTION_CLASSES = "flex flex-col gap-y-0";

const SIDEBAR_FOOTER_CLASSES = "-mx-6 mt-auto";

const SIDEBAR_ITEM_BASE_CLASSES =
  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand";

const SIDEBAR_ITEM_ACTIVE_CLASSES = "bg-black/10 text-textInverse";

const SIDEBAR_ITEM_INACTIVE_CLASSES =
  "text-textInverse/80 hover:bg-black/10 hover:text-textInverse";

type SidebarProps = ComponentPropsWithoutRef<typeof Vertical>;

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  { children, className, ...props },
  ref,
) {
  return (
    <Vertical ref={ref} className={mergeClasses(SIDEBAR_SHELL_CLASSES, "gap-y-5", className)} {...props}>
      {children}
    </Vertical>
  );
});

type SidebarHeaderProps = ComponentPropsWithoutRef<typeof Box>;

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader(
  { children, className, ...props },
  ref,
) {
  return (
    <Box ref={ref} className={mergeClasses(SIDEBAR_HEADER_CLASSES, className)} {...props}>
      {children}
    </Box>
  );
});

type SidebarNavProps = ComponentPropsWithoutRef<"nav">;

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  { children, className, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={mergeClasses(SIDEBAR_NAV_CLASSES, className)} {...props}>
      <Vertical className="flex-1 gap-y-7">{children}</Vertical>
    </nav>
  );
});

type SidebarSectionProps = ComponentPropsWithoutRef<typeof Vertical> & {
  label?: ReactNode;
};

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  function SidebarSection({ children, className, label, ...props }, ref) {
    return (
      <Vertical ref={ref} className={mergeClasses(SIDEBAR_SECTION_CLASSES, className)} {...props}>
        {label ? (
          <Box className="mb-2 px-2 text-xs/6 font-semibold text-textInverse/80">{label}</Box>
        ) : null}
        {children}
      </Vertical>
    );
  },
);

type SidebarItemProps<T extends ElementType = typeof Box> = {
  active?: boolean;
  as?: T;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps<typeof Box>>(
  function SidebarItem({ active = false, as, children, className, ...props }, ref) {
  const Component = (as ?? Box) as ElementType;

  return (
    <Component
      ref={ref as ComponentPropsWithRef<typeof Component>["ref"]}
      className={mergeClasses(
        SIDEBAR_ITEM_BASE_CLASSES,
        active ? SIDEBAR_ITEM_ACTIVE_CLASSES : SIDEBAR_ITEM_INACTIVE_CLASSES,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
  },
) as <T extends ElementType = typeof Box>(
  props: SidebarItemProps<T> & { ref?: ComponentPropsWithRef<T>["ref"] },
) => ReactElement | null;

type SidebarFooterProps = ComponentPropsWithoutRef<typeof Box>;

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
  { children, className, ...props },
  ref,
) {
  return (
    <Box ref={ref} className={mergeClasses(SIDEBAR_FOOTER_CLASSES, className)} {...props}>
      {children}
    </Box>
  );
});
