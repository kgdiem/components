// @vitest-environment happy-dom

import { act, useEffect, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { fireEvent } from "@testing-library/dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Box } from "../../structures/Box";
import {
  Notification,
  NotificationBody,
  NotificationClose,
  NotificationDescription,
  NotificationIcon,
  NotificationPanel,
  NotificationProvider,
  NotificationRegion,
  NotificationTitle,
  SimpleNotification,
  useNotification,
} from "./index";

function renderNotification(ui: ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return {
    container,
    get html() {
      return document.body.innerHTML;
    },
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
      document.body.innerHTML = "";
    },
  };
}

function NotifyTrigger({
  options,
  onReady,
}: {
  options: Parameters<ReturnType<typeof useNotification>["notify"]>[0];
  onReady?: (id: string) => void;
}) {
  const { notify } = useNotification();

  useEffect(() => {
    const id = notify(options);
    onReady?.(id);
  }, [notify, onReady, options]);

  return null;
}

describe("useNotification", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("throws when used outside NotificationProvider", () => {
    function OutsideProvider() {
      useNotification();
      return null;
    }

    expect(() => renderNotification(<OutsideProvider />)).toThrow(
      "useNotification must be used within a NotificationProvider",
    );
  });
});

describe("NotificationProvider and NotificationRegion", () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("renders a notification in the default region", () => {
    const result = renderNotification(
      <NotificationProvider>
        <NotifyTrigger options={{ title: "Saved successfully" }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain("Saved successfully");
    result.cleanup();
  });

  it("positions notifications using the region position prop", () => {
    const positions = [
      {
        position: "bottom-right" as const,
        horizontal: "items-end",
        vertical: "justify-end",
      },
      {
        position: "bottom-center" as const,
        horizontal: "items-center",
        vertical: "justify-end",
      },
      {
        position: "top-right" as const,
        horizontal: "items-end",
        vertical: "justify-start",
      },
    ];

    for (const { position, horizontal, vertical } of positions) {
      const result = renderNotification(
        <NotificationProvider>
          <NotifyTrigger options={{ title: `${position} toast` }} />
          <NotificationRegion position={position} data-testid="toast-region" />
        </NotificationProvider>,
      );

      const region = result.container.querySelector('[data-testid="toast-region"]');
      const list = region?.querySelector("[data-notification-list]");

      expect(region?.className).toContain(horizontal);
      expect(region?.className).toContain(vertical);
      expect(region?.className).toContain("flex-col");
      expect(list?.className).toContain("w-sm");
      expect(list?.className).not.toMatch(/\bw-full\b/);
      result.cleanup();
    }
  });

  it("supports container-scoped placement within a positioned ancestor", () => {
    const result = renderNotification(
      <NotificationProvider>
        <Box className="relative h-64 w-96" data-testid="app-shell">
          <NotifyTrigger options={{ title: "In-app toast", region: "app" }} />
          <NotificationRegion
            data-testid="app-region"
            placement="container"
            position="top-right"
            region="app"
          />
        </Box>
      </NotificationProvider>,
    );

    const region = result.container.querySelector('[data-testid="app-region"]');

    expect(region?.className).toContain("absolute");
    expect(region?.className).not.toContain("fixed");
    expect(result.html).toContain("In-app toast");
    result.cleanup();
  });

  it("renders a notification in a targeted region", () => {
    const result = renderNotification(
      <NotificationProvider>
        <NotifyTrigger options={{ title: "Header alert", region: "header" }} />
        <NotificationRegion region="header" data-testid="header-region" />
        <NotificationRegion region="footer" data-testid="footer-region" />
      </NotificationProvider>,
    );

    expect(result.html).toContain("Header alert");
    expect(result.container.querySelector('[data-testid="header-region"]')?.innerHTML).toContain(
      "Header alert",
    );
    expect(result.container.querySelector('[data-testid="footer-region"]')?.innerHTML).not.toContain(
      "Header alert",
    );
    result.cleanup();
  });

  it("falls back to the default region when the target region is missing", () => {
    const result = renderNotification(
      <NotificationProvider defaultRegion="global">
        <NotifyTrigger options={{ title: "Fallback toast", region: "missing" }} />
        <NotificationRegion region="global" data-testid="global-region" />
      </NotificationProvider>,
    );

    expect(result.container.querySelector('[data-testid="global-region"]')?.innerHTML).toContain(
      "Fallback toast",
    );
    result.cleanup();
  });

  it("dismisses a notification by id", () => {
    function DismissExample() {
      const { dismiss, notify } = useNotification();

      useEffect(() => {
        const id = notify({ title: "Dismiss me" });
        dismiss(id);
      }, [dismiss, notify]);

      return null;
    }

    const result = renderNotification(
      <NotificationProvider defaultDuration={false}>
        <DismissExample />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).not.toContain("Dismiss me");
    result.cleanup();
  });

  it("dismisses all notifications in a region", () => {
    vi.useFakeTimers();

    const result = renderNotification(
      <NotificationProvider defaultDuration={false}>
        <MultiNotifyTrigger />
        <DismissAllTrigger region="global" />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain("First");
    expect(result.html).toContain("Second");

    act(() => {
      (document.querySelector("[data-dismiss-all]") as HTMLButtonElement | null)?.click();
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.html).not.toContain("First");
    expect(result.html).not.toContain("Second");
    result.cleanup();
    vi.useRealTimers();
  });
});

function DismissAllTrigger({ region }: { region?: string }) {
  const { dismissAll } = useNotification();

  return (
    <button data-dismiss-all type="button" onClick={() => dismissAll(region)}>
      Dismiss all
    </button>
  );
}

function MultiNotifyTrigger() {
  const { notify } = useNotification();

  useEffect(() => {
    notify({ title: "First" });
    notify({ title: "Second" });
  }, [notify]);

  return null;
}

describe("Notification lifetimes", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("auto-dismisses using the provider default duration", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={5000}>
        <NotifyTrigger options={{ title: "Temporary toast" }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain("Temporary toast");

    act(() => {
      vi.runAllTimers();
    });

    expect(result.html).not.toContain("Temporary toast");
    result.cleanup();
  });

  it("uses a per-notification duration override", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={5000}>
        <NotifyTrigger options={{ title: "Quick toast", duration: 2000 }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain("Quick toast");

    act(() => {
      vi.runAllTimers();
    });

    expect(result.html).not.toContain("Quick toast");
    result.cleanup();
  });

  it("keeps persistent notifications until dismissed", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={5000}>
        <NotifyTrigger options={{ title: "Persistent toast", duration: false }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.html).toContain("Persistent toast");
    result.cleanup();
  });

  it("pauses and resumes the countdown on hover", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={5000} pauseOnHover>
        <NotifyTrigger options={{ title: "Hover toast" }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    const panel = result.container.querySelector("[data-notification-panel]") as HTMLElement;
    const content = panel.firstElementChild as HTMLElement;
    expect(panel).toBeTruthy();
    expect(content).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      fireEvent.mouseOver(content);
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.html).toContain("Hover toast");

    act(() => {
      fireEvent.mouseOut(content);
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.html).not.toContain("Hover toast");
    result.cleanup();
  });
});

describe("Notification accessibility", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders polite and assertive live region lanes", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={false}>
        <NotifyTrigger options={{ title: "Routine update", priority: "polite" }} />
        <NotifyTrigger options={{ title: "Critical alert", priority: "assertive" }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain('aria-live="polite"');
    expect(result.html).toContain('aria-live="assertive"');
    expect(result.html).toContain('aria-atomic="true"');
    expect(result.html).toContain("Routine update");
    expect(result.html).toContain("Critical alert");
    result.cleanup();
  });

  it("renders an accessible close button label", () => {
    const result = renderNotification(
      <NotificationProvider defaultDuration={false}>
        <NotifyTrigger options={{ title: "Close me", closeLabel: "Dismiss notification" }} />
        <NotificationRegion />
      </NotificationProvider>,
    );

    expect(result.html).toContain("Dismiss notification");
    result.cleanup();
  });
});

describe("Notification primitives", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders SimpleNotification with title, description, icon, and close", () => {
    const result = renderNotification(
      <SimpleNotification
        show
        description="Details here"
        icon={<span>icon</span>}
        iconVariant="success"
        onClose={() => undefined}
        title="Saved"
      />,
    );

    expect(result.html).toContain("Saved");
    expect(result.html).toContain("Details here");
    expect(result.html).toContain("text-success");
    expect(result.html).toContain("Close notification");
    result.cleanup();
  });

  it("supports advanced composition with primitives", () => {
    const result = renderNotification(
      <Notification show panelClassName="ring-1">
        <NotificationIcon variant="info">
          <span>icon</span>
        </NotificationIcon>
        <NotificationBody>
          <NotificationTitle>Manual notification</NotificationTitle>
          <NotificationDescription>Composed content</NotificationDescription>
        </NotificationBody>
        <NotificationClose onClick={() => undefined} />
      </Notification>,
    );

    expect(result.html).toContain("Manual notification");
    expect(result.html).toContain("Composed content");
    expect(result.html).toContain("ring-1");
    result.cleanup();
  });

  it("merges custom panel className values on NotificationPanel", () => {
    const result = renderNotification(
      <NotificationPanel show className="border border-border">
        Panel
      </NotificationPanel>,
    );

    expect(result.html).toContain("border border-border");
    result.cleanup();
  });
});
