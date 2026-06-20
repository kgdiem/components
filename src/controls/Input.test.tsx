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

  it("applies the updated comfortable padding and focus ring", () => {
    const html = renderToStaticMarkup(<Input placeholder="Enter value" />);

    expect(html).toContain("px-4");
    expect(html).toContain("py-3");
    expect(html).toContain("focus:ring-[3px]");
  });

  it("applies a muted background when disabled", () => {
    const html = renderToStaticMarkup(<Input disabled value="locked" readOnly />);

    expect(html).toContain("disabled:bg-surfaceMuted");
  });

  it("does not apply a resting drop shadow on the field", () => {
    const html = renderToStaticMarkup(<Input placeholder="Enter value" />);

    expect(html).not.toContain("shadow-sm");
  });

  it("renders a prefix node before the input", () => {
    const html = renderToStaticMarkup(
      <Input prefix={<span>PREFIX</span>} value="1200" onChange={() => undefined} />,
    );

    expect(html).toContain("PREFIX");
    expect(html).toContain("<input");
    expect(html.indexOf("PREFIX")).toBeLessThan(html.indexOf("<input"));
  });

  it("renders a postfix node after the input", () => {
    const html = renderToStaticMarkup(
      <Input postfix={<span>USD</span>} value="1200" onChange={() => undefined} />,
    );

    expect(html).toContain("USD");
    expect(html).toContain("<input");
    expect(html.indexOf("<input")).toBeLessThan(html.indexOf("USD"));
  });

  it("supports a prefix and postfix together with a single input", () => {
    const html = renderToStaticMarkup(
      <Input
        prefix={<span>$</span>}
        postfix={<span>USD</span>}
        value="1200"
        onChange={() => undefined}
      />,
    );

    expect(html).toContain("$");
    expect(html).toContain("USD");
    expect(html.split("<input").length - 1).toBe(1);
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
