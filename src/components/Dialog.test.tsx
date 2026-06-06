// @vitest-environment happy-dom

import { act, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "./Button";
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogContainer,
  DialogDescription,
  DialogFooter,
  DialogIcon,
  DialogPanel,
  DialogRoot,
  DialogTitle,
  SimpleDialog,
} from "./Dialog";

function renderDialog(ui: ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return {
    html: document.body.innerHTML,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
      document.body.innerHTML = "";
    },
  };
}

describe("Dialog", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a thin shell with composed children", () => {
    const result = renderDialog(
      <Dialog open onClose={() => undefined} size="sm" panelClassName="ring-1">
        <DialogBody>
          <DialogTitle>Custom dialog</DialogTitle>
          <DialogDescription>Composed content</DialogDescription>
        </DialogBody>
        <DialogFooter>
          <Button>Dismiss</Button>
        </DialogFooter>
      </Dialog>,
    );

    expect(result.html).toContain("Custom dialog");
    expect(result.html).toContain("Composed content");
    expect(result.html).toContain("Dismiss");
    expect(result.html).toContain("sm:max-w-sm");
    expect(result.html).toContain("relative z-50");
    expect(result.html).toContain("bg-text/50");
    expect(result.html).toContain("ring-1");
    result.cleanup();
  });

  it("renders panel size variants", () => {
    const small = renderDialog(
      <Dialog open onClose={() => undefined} size="sm">
        <DialogBody>Small</DialogBody>
      </Dialog>,
    );
    const medium = renderDialog(
      <Dialog open onClose={() => undefined} size="md">
        <DialogBody>Medium</DialogBody>
      </Dialog>,
    );
    const large = renderDialog(
      <Dialog open onClose={() => undefined} size="lg">
        <DialogBody>Large</DialogBody>
      </Dialog>,
    );

    expect(small.html).toContain("sm:max-w-sm");
    expect(medium.html).toContain("sm:max-w-md");
    expect(large.html).toContain("sm:max-w-lg");

    small.cleanup();
    medium.cleanup();
    large.cleanup();
  });

  it("merges custom backdrop and panel className values", () => {
    const result = renderDialog(
      <Dialog
        backdropClassName="bg-primary/20"
        open
        onClose={() => undefined}
        panelClassName="border border-border"
      >
        <DialogBody>Body</DialogBody>
      </Dialog>,
    );

    expect(result.html).toContain("bg-primary/20");
    expect(result.html).toContain("border border-border");
    result.cleanup();
  });
});

describe("SimpleDialog", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders title, description, and footer from props", () => {
    const result = renderDialog(
      <SimpleDialog
        description="Your payment has been processed."
        footer={<Button>Go back to dashboard</Button>}
        open
        onClose={() => undefined}
        size="sm"
        title="Payment successful"
      />,
    );

    expect(result.html).toContain("Payment successful");
    expect(result.html).toContain("Your payment has been processed.");
    expect(result.html).toContain("Go back to dashboard");
    expect(result.html).toContain("sm:max-w-sm");
    result.cleanup();
  });

  it("renders panel size variants", () => {
    const small = renderDialog(
      <SimpleDialog open onClose={() => undefined} size="sm" title="Small">
        Body
      </SimpleDialog>,
    );
    const medium = renderDialog(
      <SimpleDialog open onClose={() => undefined} size="md" title="Medium">
        Body
      </SimpleDialog>,
    );
    const large = renderDialog(
      <SimpleDialog open onClose={() => undefined} size="lg" title="Large">
        Body
      </SimpleDialog>,
    );

    expect(small.html).toContain("sm:max-w-sm");
    expect(medium.html).toContain("sm:max-w-md");
    expect(large.html).toContain("sm:max-w-lg");

    small.cleanup();
    medium.cleanup();
    large.cleanup();
  });

  it("supports custom children in the body", () => {
    const result = renderDialog(
      <SimpleDialog open onClose={() => undefined} title="Custom dialog">
        <p>Extra content</p>
      </SimpleDialog>,
    );

    expect(result.html).toContain("Extra content");
    result.cleanup();
  });

  it("renders icon with variant styling", () => {
    const result = renderDialog(
      <SimpleDialog
        icon={<span>icon</span>}
        iconVariant="success"
        open
        onClose={() => undefined}
        title="With icon"
      />,
    );

    expect(result.html).toContain("bg-successSubtle");
    expect(result.html).toContain("text-success");
    result.cleanup();
  });

  it("keeps icon centered at all breakpoints when an icon is present", () => {
    const result = renderDialog(
      <SimpleDialog
        icon={<span>icon</span>}
        open
        onClose={() => undefined}
        title="With icon"
      />,
    );

    expect(result.html).toContain("mx-auto");
    expect(result.html).not.toContain("sm:mx-0");
    result.cleanup();
  });

  it("renders footer layout variants", () => {
    const single = renderDialog(
      <SimpleDialog
        footer={<Button>Confirm</Button>}
        footerLayout="single"
        open
        onClose={() => undefined}
        title="Single action"
      />,
    );
    const dual = renderDialog(
      <SimpleDialog
        footer={
          <>
            <Button>Confirm</Button>
            <Button variant="secondary">Cancel</Button>
          </>
        }
        footerLayout="dual"
        open
        onClose={() => undefined}
        title="Dual action"
      />,
    );

    expect(single.html).toContain("only-child");
    expect(dual.html).toContain("sm:grid-cols-2");

    single.cleanup();
    dual.cleanup();
  });
});

describe("Dialog primitives", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders icon variants", () => {
    const result = renderDialog(
      <DialogIcon variant="success">
        <span>icon</span>
      </DialogIcon>,
    );

    expect(result.html).toContain("bg-successSubtle");
    expect(result.html).toContain("text-success");
    result.cleanup();
  });

  it("renders footer layout variants", () => {
    const single = renderDialog(
      <DialogFooter layout="single">
        <Button>Confirm</Button>
      </DialogFooter>,
    );
    const dual = renderDialog(
      <DialogFooter layout="dual">
        <Button>Confirm</Button>
        <Button variant="secondary">Cancel</Button>
      </DialogFooter>,
    );

    expect(single.html).toContain("only-child");
    expect(dual.html).toContain("sm:grid-cols-2");

    single.cleanup();
    dual.cleanup();
  });

  it("supports advanced composition with primitives", () => {
    const result = renderDialog(
      <DialogRoot open onClose={() => undefined}>
        <DialogBackdrop />
        <DialogContainer>
          <DialogPanel size="sm">
            <DialogTitle>Manual dialog</DialogTitle>
          </DialogPanel>
        </DialogContainer>
      </DialogRoot>,
    );

    expect(result.html).toContain("Manual dialog");
    expect(result.html).toContain("font-semibold");
    result.cleanup();
  });
});
