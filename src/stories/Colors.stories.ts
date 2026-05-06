import type { Meta, StoryObj } from "@storybook/react-vite";

import { Colors } from "./Colors";

const meta = {
  title: "Tokens/Colors",
  component: Colors,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
