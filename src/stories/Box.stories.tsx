import type { Meta, StoryObj } from "@storybook/react-vite";

import "../index.css";
import { Box } from "../structures/Box";
import { Text } from "../typography/Text";

const meta = {
  title: "Structures/Box",
  component: Box,
  tags: ["autodocs"],
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
