import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../typography/Text.md?raw";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
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
