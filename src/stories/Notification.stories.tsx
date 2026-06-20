import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Check, Inbox } from "lucide-react";
import { useState, type ReactNode } from "react";

import componentDocs from "../components/Notification.md?raw";
import { Button } from "../components/Button";
import { Box } from "../structures/Box";
import { withComponentDocs } from "./storyDocs";
import {
  Notification,
  NotificationActions,
  NotificationBody,
  NotificationClose,
  NotificationDescription,
  NotificationIcon,
  NotificationList,
  NotificationProvider,
  NotificationRegion,
  NotificationTitle,
  NotificationViewport,
  useNotification,
  type NotificationPosition,
} from "../components/Notification";

function NotificationStoryShell({
  children,
  hint = "Notifications appear at the edge of the viewport, not over the trigger.",
}: {
  children: ReactNode;
  hint?: string;
}) {
  return (
    <Box className="flex min-h-96 w-full max-w-3xl flex-col items-start gap-4">
      {children}
      <Box className="text-sm text-textMuted">{hint}</Box>
    </Box>
  );
}

function QuickStartStory() {
  const { notify } = useNotification();

  return (
    <NotificationStoryShell>
      <Button
        onClick={() =>
          notify({
            title: "Successfully saved!",
            description: "Anyone with a link can now view this file.",
            icon: <Check aria-hidden className="size-6" />,
            iconVariant: "success",
          })
        }
        variant="secondary"
      >
        Show notification
      </Button>
    </NotificationStoryShell>
  );
}

function CustomPlacementStory() {
  const { notify } = useNotification();

  return (
    <Box className="relative mx-auto flex min-h-[24rem] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border">
      <Box className="flex items-center justify-between border-b border-border bg-surfaceMuted px-4 py-3">
        <Box className="text-sm font-medium text-text">App header</Box>
        <Button
          onClick={() =>
            notify({
              region: "header",
              title: "Build complete",
              description: "Production deploy finished in 2m 14s.",
              icon: <Check aria-hidden className="size-6" />,
              iconVariant: "success",
            })
          }
          variant="secondary"
        >
          Notify header
        </Button>
      </Box>

      <Box className="flex flex-1 items-center justify-center p-8 text-sm text-textMuted">
        Main content area
      </Box>

      <Box className="flex items-center justify-between border-t border-border bg-surfaceMuted px-4 py-3">
        <Box className="text-sm text-textMuted">Status bar</Box>
        <Button
          onClick={() =>
            notify({
              region: "footer",
              title: "Sync failed",
              description: "We could not reach the backup service.",
              icon: <AlertTriangle aria-hidden className="size-6" />,
              iconVariant: "warning",
              priority: "assertive",
            })
          }
          variant="secondary"
        >
          Notify footer
        </Button>
      </Box>

      <NotificationRegion
        className="!top-14 !bottom-auto !h-auto !justify-start !pt-2"
        placement="container"
        position="top-right"
        region="header"
      />
      <NotificationRegion
        className="!top-auto !bottom-14 !h-auto !justify-end !pb-2"
        placement="container"
        position="bottom-right"
        region="footer"
      />
    </Box>
  );
}

const VIEWPORT_POSITIONS: NotificationPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

function ViewportPositionsStory() {
  const [position, setPosition] = useState<NotificationPosition>("bottom-right");
  const { notify } = useNotification();

  return (
    <Box className="flex min-h-screen flex-col gap-6 p-8">
      <Box className="max-w-2xl text-sm text-textMuted">
        Viewport regions anchor to the preview edges. Pick a corner or edge, then trigger a toast.
      </Box>

      <Box className="flex flex-wrap gap-2">
        {VIEWPORT_POSITIONS.map((option) => (
          <Button
            key={option}
            onClick={() => setPosition(option)}
            variant={option === position ? "primary" : "secondary"}
          >
            {option}
          </Button>
        ))}
      </Box>

      <Button
        onClick={() =>
          notify({
            title: `Toast at ${position}`,
            description: "This toast uses the selected viewport position.",
            icon: <Check aria-hidden className="size-6" />,
            iconVariant: "success",
          })
        }
        variant="secondary"
      >
        Show toast
      </Button>

      <NotificationRegion key={position} position={position} />
    </Box>
  );
}

function LifetimesStory() {
  const { notify } = useNotification();

  return (
    <NotificationStoryShell>
      <Box className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            notify({
              title: "Quick toast",
              description: "Auto-dismisses after 2 seconds.",
              duration: 2000,
            })
          }
          variant="secondary"
        >
          Short lifetime (2s)
        </Button>
        <Button
          onClick={() =>
            notify({
              title: "Persistent toast",
              description: "Stays until you dismiss it.",
              duration: false,
            })
          }
          variant="secondary"
        >
          Persistent
        </Button>
      </Box>
    </NotificationStoryShell>
  );
}

function AccessibilityStory() {
  const { notify } = useNotification();

  return (
    <NotificationStoryShell>
      <Button
        onClick={() =>
          notify({
            title: "Payment failed",
            description: "Update your billing details to restore service.",
            icon: <AlertTriangle aria-hidden className="size-6" />,
            iconVariant: "danger",
            priority: "assertive",
            closeLabel: "Dismiss payment alert",
          })
        }
        variant="secondary"
      >
        Show assertive alert
      </Button>
    </NotificationStoryShell>
  );
}

function WithActionsStory() {
  const { dismiss, notify } = useNotification();

  return (
    <NotificationStoryShell>
      <Button
        onClick={() => {
          const id = notify({
            title: "Discussion moved",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            icon: <Inbox aria-hidden className="size-6" />,
            iconVariant: "neutral",
            duration: false,
            actions: (
              <>
                <button
                  className="rounded-md text-sm font-medium text-primary hover:text-primaryHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  type="button"
                >
                  Undo
                </button>
                <button
                  className="rounded-md text-sm font-medium text-textMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  onClick={() => dismiss(id)}
                  type="button"
                >
                  Dismiss
                </button>
              </>
            ),
          });
        }}
        variant="secondary"
      >
        Show with actions
      </Button>
    </NotificationStoryShell>
  );
}

function ComposedPrimitivesStory() {
  const [show, setShow] = useState(false);

  return (
    <NotificationStoryShell hint="Built from primitives without the provider convenience API.">
      <Button onClick={() => setShow(true)} variant="secondary">
        Show composed notification
      </Button>
      <NotificationViewport placement="viewport" position="bottom-right">
        <NotificationList>
          <Notification show={show}>
            <NotificationIcon variant="info">
              <Inbox aria-hidden className="size-6" />
            </NotificationIcon>
            <NotificationBody>
              <NotificationTitle>Custom composed layout</NotificationTitle>
              <NotificationDescription>
                Built from primitives without the provider convenience API.
              </NotificationDescription>
              <NotificationActions>
                <button
                  className="rounded-md text-sm font-medium text-primary hover:text-primaryHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
                  type="button"
                >
                  View details
                </button>
              </NotificationActions>
            </NotificationBody>
            <NotificationClose onClick={() => setShow(false)} />
          </Notification>
        </NotificationList>
      </NotificationViewport>
    </NotificationStoryShell>
  );
}

const meta = {
  title: "Components/Notification",
  component: QuickStartStory,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "padded",
  }),
  decorators: [
    (Story) => (
      <NotificationProvider defaultDuration={5000}>
        <Story />
        <NotificationRegion />
      </NotificationProvider>
    ),
  ],
} satisfies Meta<typeof QuickStartStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuickStart: Story = {
  render: () => <QuickStartStory />,
};

export const WithActions: Story = {
  render: () => <WithActionsStory />,
};

export const CustomPlacement: Story = {
  decorators: [
    (Story) => (
      <NotificationProvider defaultDuration={5000}>
        <Story />
      </NotificationProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Use `placement=\"container\"` on a `relative` ancestor to keep toasts inside an app shell. Offset the region with `className` so header toasts sit below the header bar and footer toasts sit above the footer bar.",
      },
    },
  },
  render: () => <CustomPlacementStory />,
};

export const ViewportPositions: Story = {
  decorators: [
    (Story) => (
      <NotificationProvider defaultDuration={5000}>
        <Story />
      </NotificationProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The default `placement=\"viewport\"` anchors toasts to the browser preview edges. Use the `position` prop to pick a corner or edge.",
      },
    },
  },
  render: () => <ViewportPositionsStory />,
};

export const Lifetimes: Story = {
  render: () => <LifetimesStory />,
};

export const Accessibility: Story = {
  render: () => <AccessibilityStory />,
};

export const ComposedPrimitives: Story = {
  decorators: [
    (Story) => (
      <Box className="w-full">
        <Story />
      </Box>
    ),
  ],
  render: () => <ComposedPrimitivesStory />,
};
