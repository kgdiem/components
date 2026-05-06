import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element with base classes", () => {
    const html = renderToStaticMarkup(<Input placeholder="Enter value" />);

    expect(html).toContain("<input");
    expect(html).toContain('placeholder="Enter value"');
    expect(html).toContain("border-border");
    expect(html).toContain("focus:ring-focus/25");
  });

  it("merges custom className and html attributes", () => {
    const html = renderToStaticMarkup(
      <Input className="max-w-sm" id="input-id" name="email" type="email" />,
    );

    expect(html).toContain("max-w-sm");
    expect(html).toContain('id="input-id"');
    expect(html).toContain('name="email"');
    expect(html).toContain('type="email"');
  });
});
