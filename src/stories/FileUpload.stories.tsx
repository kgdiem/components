import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import componentDocs from "../controls/FileUpload.md?raw";
import "../index.css";
import type { FileControlValue } from "../controls/fileControlUtils";
import { FileUpload } from "../controls/FileUpload";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    buttonLabel: "Choose file",
    disabled: false,
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<FileControlValue>(null);

    return <FileUpload {...args} onChange={setValue} value={value} />;
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<FileControlValue>([]);

    return <FileUpload {...args} multiple onChange={setValue} value={value} />;
  },
  args: {
    buttonLabel: "Choose files",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
