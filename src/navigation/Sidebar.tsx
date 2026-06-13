import {
  Dialog as HeadlessUiDialog,
  DialogBackdrop as HeadlessUiDialogBackdrop,
  DialogPanel as HeadlessUiDialogPanel,
} from "@headlessui/react";
import { Menu } from "lucide-react";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";

import { Box } from "../structures/Box";
import { Vertical } from "../structures/Vertical";
import { mergeClasses } from "../utils/mergeClasses";

const SIDEBAR_SHELL_CLASSES =
  "group/sidebar relative shrink-0 overflow-y-auto bg-brand transition-[width,padding] duration-200 dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10";

const SIDEBAR_COLLAPSIBLE_EXPANDED_CLASSES = "w-72 px-6";

const SIDEBAR_COLLAPSIBLE_COLLAPSED_CLASSES = "w-20 px-3";

const SIDEBAR_HEADER_CLASSES = "flex h-16 shrink-0 items-center";

const SIDEBAR_NAV_CLASSES = "flex flex-1 flex-col";

const SIDEBAR_SECTION_CLASSES = "flex flex-col gap-y-0";

const SIDEBAR_FOOTER_CLASSES = "-mx-6 mt-auto";

const SIDEBAR_ITEM_BASE_CLASSES =
  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand";

const SIDEBAR_ITEM_ACTIVE_CLASSES = "bg-black/10 text-textInverse";

const SIDEBAR_ITEM_INACTIVE_CLASSES =
  "text-textInverse/80 hover:bg-black/10 hover:text-textInverse";

const SIDEBAR_DRAWER_ROOT_BASE_CLASSES = "inset-0 z-50";

const SIDEBAR_DRAWER_FIXED_ROOT_CLASSES = "fixed";

const SIDEBAR_DRAWER_CONTAINED_ROOT_CLASSES = "absolute";

const SIDEBAR_DRAWER_BACKDROP_BASE_CLASSES =
  "bg-text/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in";

const SIDEBAR_DRAWER_BACKDROP_CLASSES = "absolute inset-0";

const SIDEBAR_DRAWER_CONTAINER_CLASSES = "absolute inset-0 z-10 flex justify-start";

const SIDEBAR_DRAWER_PANEL_BASE_CLASSES =
  "flex h-full w-full max-w-xs transform overflow-y-auto bg-brand shadow-xl transition-all outline-none data-closed:-translate-x-full data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in";

const SIDEBAR_MOBILE_BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md p-2 text-text transition-colors duration-150 hover:bg-surfaceMuted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

const SIDEBAR_ITEM_ICON_CLASSES = "size-5 shrink-0";

const SIDEBAR_ITEM_LABEL_CLASSES =
  "truncate group-data-[collapsed=true]/sidebar:hidden";

const SIDEBAR_ITEM_BADGE_CLASSES =
  "ml-auto min-w-max rounded-full bg-black/10 px-2 py-0.5 text-xs/5 font-medium whitespace-nowrap text-textInverse outline-1 -outline-offset-1 outline-white/20 group-data-[collapsed=true]/sidebar:hidden";

type SidebarContextValue = {
  collapsed: boolean;
  collapsible: boolean;
};

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  collapsible: false,
});

type SidebarProps = ComponentPropsWithoutRef<typeof Vertical> & {
  collapsed?: boolean;
  collapsible?: boolean;
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  { children, className, collapsed = false, collapsible = false, ...props },
  ref,
) {
  return (
    <SidebarContext.Provider value={{ collapsed, collapsible }}>
      <Vertical
        ref={ref}
        data-collapsed={collapsed ? "true" : "false"}
        data-collapsible={collapsible ? "true" : "false"}
        className={mergeClasses(
          SIDEBAR_SHELL_CLASSES,
          collapsible
            ? collapsed
              ? SIDEBAR_COLLAPSIBLE_COLLAPSED_CLASSES
              : SIDEBAR_COLLAPSIBLE_EXPANDED_CLASSES
            : "px-6",
          "gap-y-5",
          className,
        )}
        {...props}
      >
        {children}
      </Vertical>
    </SidebarContext.Provider>
  );
});

type SidebarHeaderProps = ComponentPropsWithoutRef<typeof Box>;

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader(
  { children, className, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      className={mergeClasses(
        SIDEBAR_HEADER_CLASSES,
        "group-data-[collapsed=true]/sidebar:justify-center",
        className,
      )}
      {...props}
    >
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
          <Box className="mb-2 px-2 text-xs/6 font-semibold text-textInverse/80 group-data-[collapsed=true]/sidebar:sr-only">
            {label}
          </Box>
        ) : null}
        {children}
      </Vertical>
    );
  },
);

type SidebarIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type SidebarItemProps<T extends ElementType = typeof Box> = {
  active?: boolean;
  as?: T;
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
  icon?: SidebarIcon;
  label?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps<typeof Box>>(
  function SidebarItem(
    { active = false, as, badge, children, className, icon: Icon, label, ...props },
    ref,
  ) {
    const { collapsed, collapsible } = useContext(SidebarContext);
    const Component = (as ?? Box) as ElementType;
    const title =
      props.title ?? (collapsed && collapsible && typeof label === "string" ? label : undefined);
    const shouldRenderStandardContent = children == null && (label || badge || Icon);

    return (
      <Component
        ref={ref as ComponentPropsWithRef<typeof Component>["ref"]}
        className={mergeClasses(
          SIDEBAR_ITEM_BASE_CLASSES,
          active ? SIDEBAR_ITEM_ACTIVE_CLASSES : SIDEBAR_ITEM_INACTIVE_CLASSES,
          "group-data-[collapsed=true]/sidebar:justify-center",
          className,
        )}
        aria-current={active ? "page" : undefined}
        title={title}
        {...props}
      >
        {shouldRenderStandardContent ? (
          <>
            {Icon ? <Icon aria-hidden className={SIDEBAR_ITEM_ICON_CLASSES} /> : null}
            {label ? <span className={SIDEBAR_ITEM_LABEL_CLASSES}>{label}</span> : null}
            {badge ? <Box className={SIDEBAR_ITEM_BADGE_CLASSES}>{badge}</Box> : null}
          </>
        ) : (
          children
        )}
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

type SidebarDrawerProps = Omit<ComponentPropsWithoutRef<typeof HeadlessUiDialog>, "className"> & {
  backdropClassName?: string;
  className?: string;
  contained?: boolean;
  panelClassName?: string;
};

export function SidebarDrawer({
  backdropClassName,
  children,
  className,
  contained = false,
  panelClassName,
  ...props
}: SidebarDrawerProps) {
  return (
    <HeadlessUiDialog
      className={mergeClasses(
        SIDEBAR_DRAWER_ROOT_BASE_CLASSES,
        contained ? SIDEBAR_DRAWER_CONTAINED_ROOT_CLASSES : SIDEBAR_DRAWER_FIXED_ROOT_CLASSES,
        className,
      )}
      {...props}
    >
      <HeadlessUiDialogBackdrop
        transition
        className={mergeClasses(
          SIDEBAR_DRAWER_BACKDROP_BASE_CLASSES,
          SIDEBAR_DRAWER_BACKDROP_CLASSES,
          backdropClassName,
        )}
      />
      <Box className={SIDEBAR_DRAWER_CONTAINER_CLASSES}>
        <HeadlessUiDialogPanel
          transition
          className={mergeClasses(SIDEBAR_DRAWER_PANEL_BASE_CLASSES, panelClassName)}
        >
          {children}
        </HeadlessUiDialogPanel>
      </Box>
    </HeadlessUiDialog>
  );
}

type SidebarMobileButtonProps = ComponentPropsWithoutRef<"button">;

export const SidebarMobileButton = forwardRef<HTMLButtonElement, SidebarMobileButtonProps>(
  function SidebarMobileButton(
    { children, className, type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={mergeClasses(SIDEBAR_MOBILE_BUTTON_CLASSES, className)}
        {...props}
      >
        {children ?? <Menu aria-hidden className="size-5" />}
      </button>
    );
  },
);

export type { SidebarDrawerProps, SidebarMobileButtonProps, SidebarProps };
