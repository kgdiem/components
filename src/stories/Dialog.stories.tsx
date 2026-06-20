import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Check, Trash2 } from "lucide-react";
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import componentDocs from "../components/Dialog.md?raw";
import { Button } from "../components/Button";
import { Box } from "../structures/Box";
import { withComponentDocs } from "./storyDocs";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  SimpleDialog,
  type SimpleDialogProps,
} from "../components/Dialog";

type SimpleDialogStoryProps = Omit<SimpleDialogProps, "open" | "onClose"> & {
  triggerLabel?: string;
};

function withDialogClose(node: ReactNode, onClose: () => void): ReactNode {
  if (!isValidElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void; children?: ReactNode }>(
    node,
  )) {
    return node;
  }

  if (node.type === Fragment) {
    return cloneElement(
      node,
      {},
      Children.map(node.props.children, (child) => withDialogClose(child, onClose)),
    );
  }

  const { onClick } = node.props;

  return cloneElement(node, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      onClick?.(event);
      onClose();
    },
  });
}

function SimpleDialogStory({
  triggerLabel = "Open dialog",
  footer,
  ...dialogProps
}: SimpleDialogStoryProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        {triggerLabel}
      </Button>
      <SimpleDialog
        open={open}
        onClose={setOpen}
        footer={footer ? withDialogClose(footer, close) : undefined}
        {...dialogProps}
      />
    </>
  );
}

const meta = {
  title: "Components/Dialog",
  component: SimpleDialogStory,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs, {
    layout: "centered",
  }),
  args: {
    triggerLabel: "View export status",
    title: "Report exported",
    description:
      "Your quarterly usage report is ready. The download link expires in 24 hours.",
    icon: <Check aria-hidden className="size-6" />,
    iconVariant: "success",
    size: "sm",
    footerLayout: "single",
    footer: <Button>Download report</Button>,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    footerLayout: {
      control: "inline-radio",
      options: ["single", "dual"],
    },
    iconVariant: {
      control: "inline-radio",
      options: ["success", "warning", "danger", "info"],
    },
  },
} satisfies Meta<typeof SimpleDialogStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Warning: Story = {
  args: {
    triggerLabel: "Edit draft",
    title: "Unsaved changes",
    description:
      "You have edits on this page that haven't been saved. Leaving now will discard them.",
    icon: <AlertTriangle aria-hidden className="size-6" />,
    iconVariant: "warning",
    size: "md",
    footerLayout: "dual",
    footer: (
      <>
        <Button>Leave without saving</Button>
        <Button autoFocus variant="secondary">
          Keep editing
        </Button>
      </>
    ),
  },
};

export const Confirmation: Story = {
  args: {
    triggerLabel: "Delete API key",
    title: "Delete production key?",
    description:
      "Integrations using this key will stop working immediately. This action cannot be undone.",
    icon: <Trash2 aria-hidden className="size-6" />,
    iconVariant: "danger",
    size: "lg",
    footerLayout: "dual",
    footer: (
      <>
        <Button>Delete key</Button>
        <Button autoFocus variant="secondary">
          Cancel
        </Button>
      </>
    ),
  },
};

export const CustomContent: Story = {
  args: {
    triggerLabel: "Review before publish",
    title: "Publish release notes",
    titleAs: "h2",
    description: "Confirm the summary below before sending to all workspace members.",
    icon: undefined,
    size: "md",
    footerLayout: "dual",
    footer: (
      <>
        <Button>Publish now</Button>
        <Button autoFocus variant="secondary">
          Back to editor
        </Button>
      </>
    ),
    children: (
      <dl className="mt-4 space-y-2 rounded-md border border-border bg-surfaceMuted px-3 py-2 text-left text-sm">
        <Box className="flex justify-between gap-4">
          <dt className="text-textMuted">Version</dt>
          <dd className="font-medium text-text">2.14.0</dd>
        </Box>
        <Box className="flex justify-between gap-4">
          <dt className="text-textMuted">Audience</dt>
          <dd className="font-medium text-text">All members (48)</dd>
        </Box>
        <Box className="flex justify-between gap-4">
          <dt className="text-textMuted">Highlights</dt>
          <dd className="font-medium text-text">3 changes</dd>
        </Box>
      </dl>
    ),
  },
};

function ComposedDialogStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        Manage notifications
      </Button>
      <Dialog open={open} onClose={setOpen} size="md">
        <DialogBody>
          <DialogTitle>Pause email digests?</DialogTitle>
          <DialogDescription>
            Weekly summaries will stop until you turn them back on. Alerts for billing and
            security events are not affected.
          </DialogDescription>
        </DialogBody>
        <DialogFooter layout="dual">
          <Button onClick={() => setOpen(false)}>Pause digests</Button>
          <Button autoFocus onClick={() => setOpen(false)} variant="secondary">
            Keep receiving
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const Composed: StoryObj = {
  render: () => <ComposedDialogStory />,
};
