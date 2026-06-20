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

    expect(html).toContain(">In Review</span>");
    expect(html).toContain("border-border");
    expect(html).toContain("lucide-chevron-down");
  });

  it("applies the updated comfortable padding and focus ring on the trigger", () => {
    const html = renderToStaticMarkup(
      <Select options={OPTIONS} value="review" onChange={() => undefined} />,
    );

    expect(html).toContain("px-4");
    expect(html).toContain("py-3");
    expect(html).toContain("focus:ring-[3px]");
    expect(html).toContain("disabled:bg-surfaceMuted");
  });

  it("does not apply a resting drop shadow on the trigger", () => {
    const html = renderToStaticMarkup(
      <Select options={OPTIONS} value="review" onChange={() => undefined} />,
    );

    expect(html).not.toContain("shadow-sm");
  });

  it("renders a prefix node before the selected label", () => {
    const html = renderToStaticMarkup(
      <Select
        prefix={<span>ICON</span>}
        options={OPTIONS}
        value="review"
        onChange={() => undefined}
      />,
    );

    expect(html).toContain("ICON");
    expect(html.indexOf("ICON")).toBeLessThan(html.indexOf("In Review"));
  });

  it("renders placeholder when no option is selected", () => {
    const html = renderToStaticMarkup(
      <Select options={OPTIONS} placeholder="Choose status" onChange={() => undefined} />,
    );

    expect(html).toContain(">Choose status</span>");
  });

  it("forwards id to the listbox button for label association", () => {
    const html = renderToStaticMarkup(
      <Select id="field-status" options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain('id="field-status"');
  });

  it("renders disabled state when disabled is true", () => {
    const html = renderToStaticMarkup(
      <Select disabled options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain(">Draft</span>");
    expect(html).toContain('disabled=""');
  });
});
