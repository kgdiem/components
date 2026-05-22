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

  it("renders a clear button when clearable and the value is non-empty", () => {
    const html = renderToStaticMarkup(
      <Input clearable value="query" onChange={() => undefined} />,
    );

    expect(html).toContain('aria-label="Clear"');
    expect(html).toContain("pr-9");
  });

  it("does not render a clear button when clearable and the value is empty", () => {
    const html = renderToStaticMarkup(
      <Input clearable value="" onChange={() => undefined} />,
    );

    expect(html).not.toContain('aria-label="Clear"');
  });

  it("does not render a clear button when clearable is false", () => {
    const html = renderToStaticMarkup(<Input value="query" onChange={() => undefined} />);

    expect(html).not.toContain('aria-label="Clear"');
  });
});
