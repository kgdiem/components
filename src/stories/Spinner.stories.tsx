import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../components/Spinner.md?raw";
import "../index.css";
import { Spinner } from "../components/Spinner";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "centered",
  }),
  args: {
    size: "md",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Sizes</h3>
        <div className="flex items-center gap-4 text-text">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Colors</h3>
        <div className="flex items-center gap-4">
          <Spinner className="text-primary" size="lg" />
          <Spinner className="text-textMuted" size="lg" />
          <Spinner className="text-danger" size="lg" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">With status text</h3>
        <div className="flex items-center gap-2 text-text">
          <Spinner size="sm" />
          <Text as="span" variant="muted">
            Saving changes…
          </Text>
        </div>
      </div>
    </div>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
