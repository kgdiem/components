import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../components/Button.md?raw";
import "../index.css";
import { Button } from "../components/Button";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Variants</h3>
        <div className="flex items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Sizes</h3>
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">All Variants × Sizes</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="primary" size="lg">Primary</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="secondary" size="lg">Secondary</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="tertiary" size="sm">Tertiary</Button>
            <Button variant="tertiary" size="md">Tertiary</Button>
            <Button variant="tertiary" size="lg">Tertiary</Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">States</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="tertiary" disabled>Disabled</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="primary" loading>Saving…</Button>
            <Button variant="secondary" loading>Loading…</Button>
            <Button variant="tertiary" loading>Loading…</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary Button",
    variant: "tertiary",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    children: "Saving…",
    loading: true,
  },
};
