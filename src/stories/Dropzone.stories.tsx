import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/Dropzone.md?raw";
import type { FileControlValue } from "../controls/fileControlUtils";
import { Dropzone } from "../controls/Dropzone";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    description: "PDF or PNG up to 10MB",
    disabled: false,
    label: "Drag files here or browse",
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<FileControlValue>(null);

    return <Dropzone {...args} onChange={setValue} value={value} />;
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<FileControlValue>([]);

    return <Dropzone {...args} multiple onChange={setValue} value={value} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
