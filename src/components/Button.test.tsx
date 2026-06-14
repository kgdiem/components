import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "./Button";

describe("Button", () => {
  it("renders primary variant by default", () => {
    const html = renderToStaticMarkup(<Button>Primary</Button>);

    expect(html).toContain(">Primary</button>");
    expect(html).toContain("bg-primary");
    expect(html).toContain('type="button"');
  });

  it("renders secondary variant classes", () => {
    const html = renderToStaticMarkup(
      <Button variant="secondary">Secondary</Button>,
    );

    expect(html).toContain(">Secondary</button>");
    expect(html).toContain("border-border");
    expect(html).toContain("bg-surface");
  });

  it("renders tertiary variant classes", () => {
    const html = renderToStaticMarkup(<Button variant="tertiary">Tertiary</Button>);

    expect(html).toContain(">Tertiary</button>");
    expect(html).toContain("bg-transparent");
    expect(html).toContain("text-primary");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Button className="w-full">Custom</Button>);

    expect(html).toContain("w-full");
  });

  it("applies medium size classes by default", () => {
    const html = renderToStaticMarkup(<Button>Default</Button>);

    expect(html).toContain("h-9");
    expect(html).toContain("text-sm");
  });

  it("renders sm and lg size classes", () => {
    const small = renderToStaticMarkup(<Button size="sm">Small</Button>);
    expect(small).toContain("h-7");
    expect(small).toContain("text-xs");

    const large = renderToStaticMarkup(<Button size="lg">Large</Button>);
    expect(large).toContain("h-12");
    expect(large).toContain("text-base");
  });

  it("renders a spinner and disables the button when loading", () => {
    const html = renderToStaticMarkup(<Button loading>Saving…</Button>);

    expect(html).toContain("animate-spin");
    expect(html).toContain("cursor-wait");
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain("disabled");
    expect(html).toContain("Saving…");
  });

  it("does not render a spinner when not loading", () => {
    const html = renderToStaticMarkup(<Button>Idle</Button>);

    expect(html).not.toContain("animate-spin");
    expect(html).toContain('aria-busy="false"');
  });
});
