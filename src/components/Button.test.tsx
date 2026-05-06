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
});
