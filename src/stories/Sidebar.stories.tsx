import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, ChartPie, Files, Folder, Home, Users } from "lucide-react";
import { useState, type ReactNode } from "react";

import componentDocs from "../navigation/Sidebar.md?raw";
import { Button } from "../components/Button";
import { Box } from "../structures/Box";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";
import {
  Sidebar,
  SidebarDrawer,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarMobileButton,
  SidebarNav,
  SidebarSection,
} from "../navigation/Sidebar";

function SidebarStoryFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[36rem] w-full max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {children}
      <main className="flex flex-1 flex-col bg-gray-50 p-8">
        <h2 className="text-lg font-semibold text-gray-900">Page content</h2>
        <p className="mt-2 text-sm text-gray-600">
          Application content appears beside the sidebar.
        </p>
      </main>
    </div>
  );
}

type SidebarDesktopStoryProps = {
  collapsed?: boolean;
  collapsible?: boolean;
  title?: ReactNode;
};

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, count: "5", current: true },
  { name: "Team", href: "#", icon: Users, current: false },
  { name: "Projects", href: "#", icon: Folder, count: "12", current: false },
  { name: "Calendar", href: "#", icon: Calendar, count: "20+", current: false },
  { name: "Documents", href: "#", icon: Files, current: false },
  { name: "Reports", href: "#", icon: ChartPie, current: false },
];

const teams = [
  { name: "Design", href: "#", initial: "D", current: false },
  { name: "Engineering", href: "#", initial: "E", current: true },
  { name: "Operations", href: "#", initial: "O", current: false },
];

function SidebarNavigation({
  collapsed = false,
  collapsible = false,
  title = "YourCCO",
}: SidebarDesktopStoryProps) {
  return (
    <Sidebar
      collapsed={collapsed}
      collapsible={collapsible}
      className={collapsible ? "h-full min-h-0" : "h-full min-h-0 w-72"}
    >
      <SidebarHeader>
        <span className={collapsed ? "sr-only" : "text-lg font-semibold text-textInverse"}>
          {title}
        </span>
        <span className={collapsed ? "text-lg font-semibold text-textInverse" : "sr-only"}>
          YC
        </span>
      </SidebarHeader>

      <SidebarNav>
        <SidebarSection>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <SidebarItem
                  as="a"
                  href={item.href}
                  active={item.current}
                  icon={item.icon}
                  label={item.name}
                  badge={item.count}
                />
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection label="Your teams">
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <SidebarItem as="a" href={team.href} active={team.current}>
                  <Box className="flex w-full items-center gap-x-3 group-data-[collapsed=true]/sidebar:w-auto group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:gap-x-0">
                    <Box className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-black/10 text-[0.625rem] font-medium text-textInverse">
                      {team.initial}
                    </Box>
                    <Box className="truncate group-data-[collapsed=true]/sidebar:hidden">
                      {team.name}
                    </Box>
                  </Box>
                </SidebarItem>
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarFooter>
          <SidebarItem
            as="a"
            href="#"
            className="items-center gap-x-4 px-6 py-3 group-data-[collapsed=true]/sidebar:justify-center"
          >
            <Box className="flex items-center gap-x-4 group-data-[collapsed=true]/sidebar:gap-x-0">
              <Box
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-sm font-medium text-textInverse outline -outline-offset-1 outline-white/10"
              >
                JL
              </Box>
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true" className="group-data-[collapsed=true]/sidebar:hidden">
                Jordan Lee
              </span>
            </Box>
          </SidebarItem>
        </SidebarFooter>
      </SidebarNav>
    </Sidebar>
  );
}

function SidebarDesktopStory(props: SidebarDesktopStoryProps) {
  return (
    <SidebarStoryFrame>
      <SidebarNavigation {...props} />
    </SidebarStoryFrame>
  );
}

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "fullscreen",
  }),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SidebarDesktopStory />,
};

function CollapsibleSidebarStory() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-[36rem] w-full max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <SidebarNavigation collapsed={collapsed} collapsible />
      <main className="flex flex-1 flex-col gap-4 bg-gray-50 p-8">
        <h2 className="text-lg font-semibold text-gray-900">Collapsible navigation</h2>
        <p className="text-sm text-gray-600">
          Collapse the sidebar to switch from a full navigation column to a compact rail.
        </p>
        <Text className="text-sm text-gray-500">
          Current state: {collapsed ? "collapsed" : "expanded"}
        </Text>
        <Button variant="secondary" onClick={() => setCollapsed((current) => !current)}>
          {collapsed ? "Expand sidebar" : "Collapse sidebar"}
        </Button>
      </main>
    </div>
  );
}

export const Collapsible: Story = {
  render: () => <CollapsibleSidebarStory />,
};

export const WithSectionLabel: Story = {
  render: () => (
    <SidebarStoryFrame>
      <Sidebar className="h-full min-h-0 w-72">
        <SidebarHeader>Acme Inc</SidebarHeader>
        <SidebarNav>
          <SidebarSection label="Your teams">
            <SidebarItem as="a" href="#">
              Design
            </SidebarItem>
            <SidebarItem as="a" href="#" active>
              Engineering
            </SidebarItem>
          </SidebarSection>
        </SidebarNav>
      </Sidebar>
    </SidebarStoryFrame>
  ),
};

function MobilePreviewShell({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Box className="relative mx-auto flex h-[36rem] w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
      <Box className="flex items-center gap-x-3 border-b border-gray-200 bg-white px-4 py-3">
        <SidebarMobileButton aria-label="Open navigation" onClick={() => onOpenChange(true)} />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
          YourCCO
        </span>
        <Box className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          Mobile
        </Box>
      </Box>

      <Box className="flex flex-1 flex-col bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Mobile navigation</h2>
        <p className="mt-2 text-sm text-gray-600">
          This preview is constrained inside the Storybook canvas so the drawer can be reviewed
          without resizing the entire browser.
        </p>
        <Button className="mt-4 self-start" variant="secondary" onClick={() => onOpenChange(true)}>
          Open drawer
        </Button>
      </Box>

      <SidebarDrawer contained open={open} onClose={onOpenChange}>
        <SidebarNavigation title="YourCCO" />
      </SidebarDrawer>
    </Box>
  );
}

function MobileDrawerStory() {
  const [open, setOpen] = useState(false);

  return (
    <Box className="bg-gray-100 px-6 py-10">
      <MobilePreviewShell open={open} onOpenChange={setOpen} />
    </Box>
  );
}

export const MobileDrawer: Story = {
  render: () => <MobileDrawerStory />,
};


