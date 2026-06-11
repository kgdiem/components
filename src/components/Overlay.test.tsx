// @vitest-environment happy-dom

import { act, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  Overlay,
  OverlayBackdrop,
  OverlayContainer,
  OverlayContent,
  OverlayRoot,
} from "./Overlay";

function renderOverlay(ui: ReactElement) {
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

describe("Overlay", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders custom content in the overlay shell", () => {
    const result = renderOverlay(
      <Overlay open onClose={() => undefined}>
        <span>Loading workspace</span>
      </Overlay>,
    );

    expect(result.html).toContain("Loading workspace");
    expect(result.html).toContain("relative z-50");
    expect(result.html).toContain("bg-text/50");
    expect(result.html).toContain("items-center justify-center");
    result.cleanup();
  });

  it("merges custom backdrop and content className values", () => {
    const result = renderOverlay(
      <Overlay
        backdropClassName="bg-surface"
        contentClassName="gap-4"
        open
        onClose={() => undefined}
      >
        Content
      </Overlay>,
    );

    expect(result.html).toContain("bg-surface");
    expect(result.html).toContain("gap-4");
    result.cleanup();
  });

  it("does not call onClose when dismissible is false", () => {
    const onClose = vi.fn();

    const result = renderOverlay(
      <Overlay dismissible={false} open onClose={onClose}>
        Content
      </Overlay>,
    );

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onClose).not.toHaveBeenCalled();
    result.cleanup();
  });

  it("calls onClose when dismissible is true and Escape is pressed", () => {
    const onClose = vi.fn();

    const result = renderOverlay(
      <Overlay dismissible open onClose={onClose}>
        Content
      </Overlay>,
    );

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onClose).toHaveBeenCalled();
    result.cleanup();
  });
});

describe("Overlay primitives", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("supports advanced composition with primitives", () => {
    const result = renderOverlay(
      <OverlayRoot open onClose={() => undefined}>
        <OverlayBackdrop />
        <OverlayContainer>
          <OverlayContent>
            <span>Custom logo</span>
          </OverlayContent>
        </OverlayContainer>
      </OverlayRoot>,
    );

    expect(result.html).toContain("Custom logo");
    expect(result.html).toContain("bg-text/50");
    result.cleanup();
  });
});
