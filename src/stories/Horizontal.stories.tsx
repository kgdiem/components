import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../structures/Horizontal.md?raw";
import { Horizontal } from "../structures/Horizontal";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Structures/Horizontal",
  component: Horizontal,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    className: "gap-3 rounded-md border border-border p-4",
    children: (
      <>
        <Text as="span" className="rounded bg-surfaceMuted px-2 py-1">
          Item 1
        </Text>
        <Text as="span" className="rounded bg-surfaceMuted px-2 py-1">
          Item 2
        </Text>
        <Text as="span" className="rounded bg-surfaceMuted px-2 py-1">
          Item 3
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof Horizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
