import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../components/Button.md?raw";
import "../index.css";
import { Button } from "../components/Button";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    children: "Button",
    variant: "primary",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button",
    variant: "tertiary",
  },
};
