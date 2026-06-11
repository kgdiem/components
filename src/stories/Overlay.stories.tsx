import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";

import componentDocs from "../components/Overlay.md?raw";
import "../index.css";
import { Button } from "../components/Button";
import { Overlay } from "../components/Overlay";
import { Text } from "../typography/Text";
import { withComponentDocs } from "./storyDocs";

type OverlayStoryProps = {
  backdropClassName?: string;
  children?: ReactNode;
  contentClassName?: string;
  dismissible?: boolean;
  triggerLabel?: string;
};

function OverlayStory({
  backdropClassName,
  children,
  contentClassName,
  dismissible = false,
  triggerLabel = "Show overlay",
}: OverlayStoryProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        {triggerLabel}
      </Button>
      <Overlay
        backdropClassName={backdropClassName}
        contentClassName={contentClassName}
        dismissible={dismissible}
        open={open}
        onClose={setOpen}
      >
        {children ?? (
          <>
            <Loader2 aria-hidden className="size-10 animate-spin text-primary" />
            <Text className="mt-4 text-textMuted">Loading workspace...</Text>
          </>
        )}
        {!dismissible ? (
          <Button className="mt-6" onClick={close} variant="tertiary">
            Close preview
          </Button>
        ) : null}
      </Overlay>
    </>
  );
}

const meta = {
  title: "Components/Overlay",
  component: OverlayStory,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "centered",
  }),
  args: {
    triggerLabel: "Show loading overlay",
    dismissible: false,
  },
} satisfies Meta<typeof OverlayStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const SplashScreen: Story = {
  args: {
    triggerLabel: "Show splash screen",
    backdropClassName: "bg-surface",
    contentClassName: "gap-3",
    children: (
      <>
        <div
          aria-hidden
          className="flex size-16 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-textInverse"
        >
          K
        </div>
        <Text className="text-textMuted">Preparing your workspace</Text>
      </>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    triggerLabel: "Show dismissible overlay",
    dismissible: true,
    children: (
      <>
        <Loader2 aria-hidden className="size-10 animate-spin text-primary" />
        <Text className="mt-4 text-textMuted">Press Escape or click outside to dismiss.</Text>
      </>
    ),
  },
};

function ComposedOverlayStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        Show composed overlay
      </Button>
      <Overlay dismissible open={open} onClose={setOpen}>
        <Text>Press Escape or click outside to dismiss.</Text>
      </Overlay>
    </>
  );
}

export const Composed: StoryObj = {
  render: () => <ComposedOverlayStory />,
};
