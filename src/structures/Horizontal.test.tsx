import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Horizontal } from "./Horizontal";

describe("Horizontal", () => {
  it("renders with horizontal flex classes", () => {
    const html = renderToStaticMarkup(<Horizontal>Items</Horizontal>);

    expect(html).toContain(">Items</div>");
    expect(html).toContain("flex");
    expect(html).toContain("flex-row");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Horizontal className="gap-4">Items</Horizontal>);

    expect(html).toContain("gap-4");
  });
});
