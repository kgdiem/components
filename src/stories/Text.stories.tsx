import type { Meta, StoryObj } from "@storybook/react-vite";

import "../index.css";
import { Text } from "../typography/Text";

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Body text",
    variant: "body",
    as: "p",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["body", "bodySm", "muted", "subtle", "caption", "label"],
    },
    as: {
      control: "inline-radio",
      options: ["p", "span", "div", "label"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "Secondary supporting text",
  },
};

export const Label: Story = {
  args: {
    as: "label",
    variant: "label",
    children: "Field label",
  },
};
