import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/Combobox.md?raw";
import { Combobox } from "../controls/Combobox";
import { withComponentDocs } from "./storyDocs";

const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta = {
  title: "Controls/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    options,
    placeholder: "Search status",
    disabled: false,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("draft");
    return <Combobox {...args} value={value} onChange={setValue} />;
  },
};

export const Empty: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return <Combobox {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "approved",
  },
};
