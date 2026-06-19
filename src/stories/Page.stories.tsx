import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../structures/Page.md?raw";
import { Page } from "../structures/Page";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Structures/Page",
  component: Page,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    className: "py-8",
    children: (
      <div className="rounded-md border border-border bg-surface p-4">
        <Text>Page-centered content</Text>
      </div>
    ),
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
