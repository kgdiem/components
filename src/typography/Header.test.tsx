import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Header } from "./Header";

describe("Header", () => {
  it("renders h2 by default with expected classes", () => {
    const html = renderToStaticMarkup(<Header>Section title</Header>);

    expect(html).toContain("<h2");
    expect(html).toContain("text-3xl");
    expect(html).toContain(">Section title</h2>");
  });

  it("supports heading level override and custom className", () => {
    const html = renderToStaticMarkup(
      <Header as="h4" className="uppercase" id="header-id">
        Smaller heading
      </Header>,
    );

    expect(html).toContain("<h4");
    expect(html).toContain("text-xl");
    expect(html).toContain("uppercase");
    expect(html).toContain('id="header-id"');
  });
});
