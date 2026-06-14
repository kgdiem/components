import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders a spinning svg with aria-hidden by default", () => {
    const html = renderToStaticMarkup(<Spinner />);

    expect(html).toContain("<svg");
    expect(html).toContain("animate-spin");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('width="16"');
    expect(html).toContain('height="16"');
  });

  it("renders sm and lg pixel sizes", () => {
    const small = renderToStaticMarkup(<Spinner size="sm" />);
    expect(small).toContain('width="14"');
    expect(small).toContain('height="14"');

    const large = renderToStaticMarkup(<Spinner size="lg" />);
    expect(large).toContain('width="20"');
    expect(large).toContain('height="20"');
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(<Spinner className="text-primary" />);

    expect(html).toContain("text-primary");
    expect(html).toContain("shrink-0");
  });
});
