import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import "../index.css";
import { Listbox } from "../controls/Listbox";

const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta = {
  title: "Controls/Listbox",
  component: Listbox,
  tags: ["autodocs"],
  args: {
    options,
    placeholder: "Choose status",
    disabled: false,
  },
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("draft");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
};

export const Placeholder: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "approved",
  },
};
