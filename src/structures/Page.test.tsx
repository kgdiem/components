import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Page } from "./Page";

describe("Page", () => {
  it("renders with page container classes", () => {
    const html = renderToStaticMarkup(<Page>Content</Page>);

    expect(html).toContain(">Content</div>");
    expect(html).toContain("mx-auto");
    expect(html).toContain("max-w-7xl");
    expect(html).toContain("sm:px-6");
    expect(html).toContain("lg:px-8");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Page className="py-8">Content</Page>);

    expect(html).toContain("py-8");
  });
});
