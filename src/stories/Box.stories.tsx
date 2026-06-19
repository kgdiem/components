import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../structures/Box.md?raw";
import { Box } from "../structures/Box";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Structures/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    className: "rounded-md border border-border p-4",
    children: <Text>Box content</Text>,
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomElementAttributes: Story = {
  args: {
    id: "box-story",
    role: "region",
    "aria-label": "Example box",
    children: <Text>Accessible box content</Text>,
  },
};
