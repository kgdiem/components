import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calendar,
  ChartPie,
  Files,
  Folder,
  Home,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import "../index.css";
import { Box } from "../structures/Box";
import { Horizontal } from "../structures/Horizontal";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
} from "../navigation/Sidebar";

function SidebarStoryFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[36rem] w-full max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex w-72 shrink-0 flex-col">{children}</div>
      <main className="flex flex-1 flex-col bg-gray-50 p-8">
        <h2 className="text-lg font-semibold text-gray-900">Page content</h2>
        <p className="mt-2 text-sm text-gray-600">
          Application content appears beside the sidebar.
        </p>
      </main>
    </div>
  );
}

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

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarStoryFrame>
        <Story />
      </SidebarStoryFrame>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sidebar className="h-full min-h-0">
      <SidebarHeader>
        <span className="text-lg font-semibold text-textInverse">YourCCO</span>
      </SidebarHeader>

      <SidebarNav>
        <SidebarSection>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <SidebarItem as="a" href={item.href} active={item.current}>
                  <Horizontal className="w-full items-center gap-x-3">
                    <item.icon
                      aria-hidden="true"
                      className={
                        item.current
                          ? "size-6 shrink-0 text-textInverse"
                          : "size-6 shrink-0 text-textInverse/80 group-hover:text-textInverse"
                      }
                    />
                    {item.name}
                    {item.count ? (
                      <Box
                        aria-hidden="true"
                        className="ml-auto w-9 min-w-max rounded-full bg-brand px-2.5 py-0.5 text-center text-xs/5 font-medium whitespace-nowrap text-textInverse outline-1 -outline-offset-1 outline-white/20"
                      >
                        {item.count}
                      </Box>
                    ) : null}
                  </Horizontal>
                </SidebarItem>
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection label="Your teams">
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <SidebarItem as="a" href={team.href} active={team.current}>
                  <Horizontal className="w-full items-center gap-x-3">
                    <Box className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-black/10 text-[0.625rem] font-medium text-textInverse">
                      {team.initial}
                    </Box>
                    <Box className="truncate">{team.name}</Box>
                  </Horizontal>
                </SidebarItem>
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarFooter>
          <SidebarItem as="a" href="#" className="items-center gap-x-4 px-6 py-3">
            <Horizontal className="items-center gap-x-4">
              <Box
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/10 text-sm font-medium text-textInverse outline -outline-offset-1 outline-white/10"
              >
                JL
              </Box>
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Jordan Lee</span>
            </Horizontal>
          </SidebarItem>
        </SidebarFooter>
      </SidebarNav>
    </Sidebar>
  ),
};

export const WithSectionLabel: Story = {
  render: () => (
    <Sidebar className="h-full min-h-0">
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
  ),
};
