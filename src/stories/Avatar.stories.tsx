import type { Meta, StoryObj } from "@storybook/react-vite";

import componentDocs from "../components/Avatar/Avatar.md?raw";
import { Avatar } from "../components/Avatar";
import { Horizontal } from "../structures/Horizontal";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "centered",
  }),
  args: {
    initials: "BS",
    size: "md",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Sizes</h3>
        <Horizontal className="items-center gap-4">
          <Avatar initials="BS" size="xs" />
          <Avatar initials="BS" size="sm" />
          <Avatar initials="BS" size="md" />
          <Avatar initials="BS" size="lg" />
        </Horizontal>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Semantic tones</h3>
        <Horizontal className="items-center gap-4">
          <Avatar backgroundClassName="bg-primarySubtle" initials="BS" textClassName="text-primary" />
          <Avatar backgroundClassName="bg-infoSubtle" initials="JL" textClassName="text-info" />
          <Avatar backgroundClassName="bg-successSubtle" initials="AC" textClassName="text-success" />
          <Avatar backgroundClassName="bg-warningSubtle" initials="MW" textClassName="text-warning" />
          <Avatar backgroundClassName="bg-dangerSubtle" initials="RK" textClassName="text-danger" />
        </Horizontal>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-textMuted">Beside a name</h3>
        <Horizontal className="items-center gap-2">
          <Avatar initials="BS" size="sm" />
          <Text>bart simpson</Text>
        </Horizontal>
      </div>
    </div>
  ),
};
