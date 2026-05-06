import type { Meta, StoryObj } from "@storybook/react-vite";

import "../index.css";
import { Input } from "../controls/Input";

const meta = {
  title: "Controls/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmailField: Story = {
  args: {
    type: "email",
    name: "email",
    placeholder: "name@company.com",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
  },
};
