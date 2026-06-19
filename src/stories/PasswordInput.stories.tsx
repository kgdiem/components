import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/PasswordInput.md?raw";
import { PasswordInput } from "../controls/PasswordInput";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    placeholder: "Enter password",
    disabled: false,
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("secret-password");

    return (
      <PasswordInput
        {...args}
        autoComplete="current-password"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
  },
};
