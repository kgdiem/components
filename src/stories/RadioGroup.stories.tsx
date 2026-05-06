import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import "../index.css";
import { RadioGroup } from "../controls/RadioGroup";

const options = [
  {
    value: "email",
    label: "Email",
    description: "Receive updates through email notifications.",
  },
  {
    value: "sms",
    label: "SMS",
    description: "Receive text message alerts.",
  },
  {
    value: "push",
    label: "Push",
    description: "Receive mobile push notifications.",
    disabled: true,
  },
];

const meta = {
  title: "Controls/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    options,
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>("email");
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Unselected: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>();
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    value: "email",
    disabled: true,
  },
};
