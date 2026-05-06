import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Select } from "./Select";

const OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved", disabled: true },
];

describe("Select", () => {
  it("renders selected option label", () => {
    const html = renderToStaticMarkup(
      <Select options={OPTIONS} value="review" onChange={() => undefined} />,
    );

    expect(html).toContain(">In Review</button>");
    expect(html).toContain("border-border");
  });

  it("renders placeholder when no option is selected", () => {
    const html = renderToStaticMarkup(
      <Select options={OPTIONS} placeholder="Choose status" onChange={() => undefined} />,
    );

    expect(html).toContain(">Choose status</button>");
  });

  it("renders disabled state when disabled is true", () => {
    const html = renderToStaticMarkup(
      <Select disabled options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain(">Draft</button>");
    expect(html).toContain('disabled=""');
  });
});
