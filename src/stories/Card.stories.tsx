import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../structures/Card.md?raw";
import "../index.css";
import { Card } from "../structures/Card";
import { Header } from "../typography/Header";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Structures/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "centered",
  }),
  args: {
    className: "w-[420px]",
    children: (
      <div className="space-y-2">
        <Header as="h6">Q2 Planning</Header>
        <Text variant="muted">
          Finalize roadmap priorities, assign owners, and align delivery milestones.
        </Text>
      </div>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeader: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between">
        <Header as="h6">Team Activity</Header>
        <Text as="span" className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
          Live
        </Text>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: (
      <div className="flex items-center justify-between">
        <Header as="h6">Weekly Summary</Header>
        <Text as="span" variant="caption">
          Updated 2h ago
        </Text>
      </div>
    ),
    footer: (
      <div className="flex items-center justify-between">
        <Text as="span" variant="muted">
          12 tasks completed
        </Text>
        <button className="text-sm font-medium text-primary hover:underline" type="button">
          View details
        </button>
      </div>
    ),
  },
};
