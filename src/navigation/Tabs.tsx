import { ChevronDown } from "lucide-react";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ChangeEvent,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from "react";

import { mergeClasses } from "@utils/mergeClasses";

type TabIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type TabChildProps = {
  className?: string;
  children?: ReactNode;
  "aria-current"?: "page" | boolean;
};

export type TabProps = {
  children: ReactElement<TabChildProps>;
  className?: string;
  current?: boolean;
  icon?: TabIcon;
  label: string;
  value?: string;
};

export type TabsProps = {
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
  mobileAriaLabel?: string;
  onMobileChange?: (value: string, index: number) => void;
};

const TAB_BASE_CLASSES =
  "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium";

const TAB_ACTIVE_CLASSES = "border-primary text-text font-semibold";

const TAB_INACTIVE_CLASSES =
  "border-transparent text-textSubtle hover:border-border hover:text-text";

const ICON_BASE_CLASSES = "mr-2 -ml-0.5 size-5";

const ICON_ACTIVE_CLASSES = "text-text";

const ICON_INACTIVE_CLASSES =
  "text-textSubtle group-hover:text-text";

const MOBILE_SELECT_CLASSES =
  "col-start-1 row-start-1 w-full appearance-none rounded-md bg-surface py-2 pr-8 pl-3 text-base text-text outline-1 -outline-offset-1 outline-border focus:outline-2 focus:-outline-offset-2 focus:outline-focus";

const MOBILE_CHEVRON_CLASSES =
  "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-textSubtle";

function getTabItems(children: ReactNode): ReactElement<TabProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> =>
      isValidElement(child) && child.type === Tab,
  );
}

function getTabValue(tab: ReactElement<TabProps>): string {
  return tab.props.value ?? tab.props.label;
}

function renderTabLink({
  children,
  className,
  current,
  icon: Icon,
}: TabProps): ReactElement {
  const tabClasses = mergeClasses(
    TAB_BASE_CLASSES,
    current ? TAB_ACTIVE_CLASSES : TAB_INACTIVE_CLASSES,
    className,
    children.props.className,
  );

  return cloneElement(children, {
    className: tabClasses,
    "aria-current": current ? "page" : undefined,
    children: (
      <>
        {Icon ? (
          <Icon
            aria-hidden
            className={mergeClasses(
              ICON_BASE_CLASSES,
              current ? ICON_ACTIVE_CLASSES : ICON_INACTIVE_CLASSES,
            )}
          />
        ) : null}
        {children.props.children}
      </>
    ),
  });
}

export function Tab(props: TabProps): null {
  void props;
  return null;
}

export function Tabs({
  "aria-label": ariaLabel = "Tabs",
  children,
  className,
  mobileAriaLabel = "Select a tab",
  onMobileChange,
}: TabsProps) {
  const tabs = getTabItems(children);
  const currentIndex = tabs.findIndex((tab) => tab.props.current);
  const defaultMobileValue =
    currentIndex >= 0
      ? getTabValue(tabs[currentIndex]!)
      : tabs[0]
        ? getTabValue(tabs[0])
        : "";

  const handleMobileChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;
    const tab = tabs[index];

    if (tab) {
      onMobileChange?.(getTabValue(tab), index);
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          aria-label={mobileAriaLabel}
          className={MOBILE_SELECT_CLASSES}
          defaultValue={defaultMobileValue}
          onChange={handleMobileChange}
        >
          {tabs.map((tab) => {
            const value = getTabValue(tab);

            return (
              <option key={value} value={value}>
                {tab.props.label}
              </option>
            );
          })}
        </select>
        <ChevronDown aria-hidden className={MOBILE_CHEVRON_CLASSES} />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-border">
          <nav aria-label={ariaLabel} className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Fragment key={getTabValue(tab)}>{renderTabLink(tab.props)}</Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
