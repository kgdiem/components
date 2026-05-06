import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Box } from "./Box";

describe("Box", () => {
  it("renders children inside a div", () => {
    const html = renderToStaticMarkup(<Box>Content</Box>);

    expect(html).toContain("<div");
    expect(html).toContain(">Content</div>");
  });

  it("applies className and html attributes", () => {
    const html = renderToStaticMarkup(
      <Box className="p-4" id="test-box" data-testid="box">
        Attributes
      </Box>,
    );

    expect(html).toContain('class="p-4"');
    expect(html).toContain('id="test-box"');
    expect(html).toContain('data-testid="box"');
  });
});
