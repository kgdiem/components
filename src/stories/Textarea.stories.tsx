import type { Meta, StoryObj } from "@storybook/react-vite";

import "../index.css";
import { Textarea } from "../controls/Textarea";

const meta = {
  title: "Controls/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Write your message",
    rows: 4,
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "Initial message body",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled textarea",
  },
};
