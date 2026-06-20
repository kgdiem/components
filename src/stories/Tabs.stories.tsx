import type { Meta, StoryObj } from "@storybook/react-vite";
import { Building2, CreditCard, User, Users } from "lucide-react";
import { useState } from "react";

import componentDocs from "../navigation/Tabs.md?raw";
import { Tab, Tabs } from "../navigation/Tabs";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    "aria-label": "Settings",
    children: null,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs aria-label="Settings">
      <Tab label="My Account" icon={User}>
        <a href="#account">My Account</a>
      </Tab>
      <Tab label="Company" icon={Building2}>
        <a href="#company">Company</a>
      </Tab>
      <Tab label="Team Members" current icon={Users}>
        <a href="#team">Team Members</a>
      </Tab>
      <Tab label="Billing" icon={CreditCard}>
        <a href="#billing">Billing</a>
      </Tab>
    </Tabs>
  ),
};

export const ButtonTabs: Story = {
  render: () => {
    const [active, setActive] = useState("draft");

    return (
      <Tabs aria-label="Document status">
        <Tab label="Draft" current={active === "draft"}>
          <button type="button" onClick={() => setActive("draft")}>
            Draft
          </button>
        </Tab>
        <Tab label="In Review" current={active === "review"}>
          <button type="button" onClick={() => setActive("review")}>
            In Review
          </button>
        </Tab>
        <Tab label="Approved" current={active === "approved"}>
          <button type="button" onClick={() => setActive("approved")}>
            Approved
          </button>
        </Tab>
      </Tabs>
    );
  },
};

export const WithMobileHandler: Story = {
  render: () => {
    const [lastSelection, setLastSelection] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Tabs
          aria-label="Settings"
          onMobileChange={(value, index) => {
            setLastSelection(`${value} (index ${index})`);
          }}
        >
          <Tab label="Overview" current value="overview">
            <a href="#overview">Overview</a>
          </Tab>
          <Tab label="Analytics" value="analytics">
            <a href="#analytics">Analytics</a>
          </Tab>
          <Tab label="Reports" value="reports">
            <a href="#reports">Reports</a>
          </Tab>
        </Tabs>
        {lastSelection ? (
          <p className="text-sm text-textMuted sm:hidden">
            Mobile select changed to: {lastSelection}
          </p>
        ) : (
          <p className="text-sm text-textMuted sm:hidden">
            Resize to mobile width and change the select to see navigation handling.
          </p>
        )}
      </div>
    );
  },
};
