import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../structures/StackedList.md?raw";
import { StackedList, StackedListItem } from "../structures/StackedList";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Structures/StackedList",
  component: StackedList,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    className: "rounded-md border border-border px-4",
  },
  render: (args) => (
    <StackedList {...args}>
      <StackedListItem>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Text className="font-semibold text-foreground">Leslie Alexander</Text>
            <Text as="p" className="truncate text-sm text-mutedForeground">
              leslie.alexander@example.com
            </Text>
          </div>
          <Text as="span" className="shrink-0 text-sm text-mutedForeground">
            Co-Founder / CEO
          </Text>
        </div>
      </StackedListItem>
      <StackedListItem>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Text className="font-semibold text-foreground">Michael Foster</Text>
            <Text as="p" className="truncate text-sm text-mutedForeground">
              michael.foster@example.com
            </Text>
          </div>
          <Text as="span" className="shrink-0 text-sm text-mutedForeground">
            Co-Founder / CTO
          </Text>
        </div>
      </StackedListItem>
      <StackedListItem>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Text className="font-semibold text-foreground">Dries Vincent</Text>
            <Text as="p" className="truncate text-sm text-mutedForeground">
              dries.vincent@example.com
            </Text>
          </div>
          <Text as="span" className="shrink-0 text-sm text-mutedForeground">
            Business Relations
          </Text>
        </div>
      </StackedListItem>
    </StackedList>
  ),
} satisfies Meta<typeof StackedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItemLayouts: Story = {
  render: (args) => (
    <StackedList {...args}>
      <StackedListItem className="flex items-start gap-3">
        <div className="mt-1 size-2 rounded-full bg-emerald-500" />
        <div>
          <Text className="font-medium text-foreground">Deployment completed</Text>
          <Text as="p" className="text-sm text-mutedForeground">
            v2.4.1 rolled out to production.
          </Text>
        </div>
      </StackedListItem>
      <StackedListItem className="grid grid-cols-[1fr_auto] items-center gap-3">
        <Text className="text-foreground">Pending invoices</Text>
        <Text as="span" className="rounded bg-surfaceMuted px-2 py-1 text-sm">
          7
        </Text>
      </StackedListItem>
    </StackedList>
  ),
};
