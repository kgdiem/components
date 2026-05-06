import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Vertical } from "./Vertical";

describe("Vertical", () => {
  it("renders with vertical flex classes", () => {
    const html = renderToStaticMarkup(<Vertical>Items</Vertical>);

    expect(html).toContain(">Items</div>");
    expect(html).toContain("flex");
    expect(html).toContain("flex-col");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Vertical className="gap-4">Items</Vertical>);

    expect(html).toContain("gap-4");
  });
});
