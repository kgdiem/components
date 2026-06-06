import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../typography/Header.md?raw";
import "../index.css";
import { Header } from "../typography/Header";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Typography/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    children: "Section heading",
    as: "h2",
  },
  argTypes: {
    as: {
      control: "inline-radio",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    as: "h1",
    children: "Page heading",
  },
};

export const H2: Story = {};

export const H4: Story = {
  args: {
    as: "h4",
    children: "Subsection heading",
  },
};
