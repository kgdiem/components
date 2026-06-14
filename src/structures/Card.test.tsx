import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Card } from "./Card";

describe("Card", () => {
  it("renders body content", () => {
    const html = renderToStaticMarkup(<Card>Body</Card>);

    expect(html).toContain(">Body</div>");
    expect(html).toContain("sm:rounded-lg");
    expect(html).toContain("bg-surface");
  });

  it("renders optional header and footer slots", () => {
    const html = renderToStaticMarkup(
      <Card header={<div>Header</div>} footer={<div>Footer</div>}>
        Body
      </Card>
    );

    expect(html).toContain("Header");
    expect(html).toContain("Footer");
    expect(html).toContain("border-b");
    expect(html).toContain("border-t");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Card className="ring-1">Body</Card>);

    expect(html).toContain("ring-1");
  });
});
