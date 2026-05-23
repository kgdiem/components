import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Label } from "./Label";

describe("Label", () => {
  it("renders a label with default field label classes", () => {
    const html = renderToStaticMarkup(<Label>Email</Label>);

    expect(html).toContain("<label");
    expect(html).toContain("text-sm");
    expect(html).toContain("font-medium");
    expect(html).toContain("text-text");
    expect(html).toContain(">Email</label>");
  });

  it("associates with a form control via htmlFor", () => {
    const html = renderToStaticMarkup(<Label htmlFor="signup-username">Email</Label>);

    expect(html).toContain('for="signup-username"');
  });

  it("renders a legend when as is legend", () => {
    const html = renderToStaticMarkup(<Label as="legend">Notification method</Label>);

    expect(html).toContain("<legend");
    expect(html).toContain(">Notification method</legend>");
    expect(html).not.toContain("<label");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Label className="sr-only">Hidden</Label>);

    expect(html).toContain("sr-only");
  });
});
