import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/Switch.md?raw";
import "../index.css";
import { Switch } from "../controls/Switch";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    label: "Enable notifications",
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Off: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "Disabled switch",
  },
};
