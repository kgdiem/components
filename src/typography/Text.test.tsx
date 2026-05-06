import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Text } from "./Text";

describe("Text", () => {
  it("renders paragraph text with default classes", () => {
    const html = renderToStaticMarkup(<Text>Body text</Text>);

    expect(html).toContain("<p");
    expect(html).toContain("text-base");
    expect(html).toContain(">Body text</p>");
  });

  it("renders different element and variant classes", () => {
    const html = renderToStaticMarkup(
      <Text as="span" className="italic" variant="caption">
        Caption text
      </Text>,
    );

    expect(html).toContain("<span");
    expect(html).toContain("text-xs");
    expect(html).toContain("text-textMuted");
    expect(html).toContain("italic");
  });
});
