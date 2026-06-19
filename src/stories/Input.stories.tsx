import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/Input.md?raw";
import { Input } from "../controls/Input";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
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

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState("Search query");

    return (
      <Input
        {...args}
        clearable
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  },
  args: {
    placeholder: "Search by name or description",
    type: "search",
  },
};
