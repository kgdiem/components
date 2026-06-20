import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Combobox } from "./Combobox";

const OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved", disabled: true },
];

describe("Combobox", () => {
  it("renders input with selected option label", () => {
    const html = renderToStaticMarkup(
      <Combobox options={OPTIONS} value="review" onChange={() => undefined} />,
    );

    expect(html).toContain("<input");
    expect(html).toContain('role="combobox"');
    expect(html).toContain("border-border");
  });

  it("renders placeholder when no option is selected", () => {
    const html = renderToStaticMarkup(
      <Combobox
        options={OPTIONS}
        placeholder="Choose status"
        value={undefined}
        onChange={() => undefined}
      />,
    );

    expect(html).toContain('placeholder="Choose status"');
    expect(html).toContain('aria-autocomplete="list"');
  });

  it("forwards id to the combobox input for label association", () => {
    const html = renderToStaticMarkup(
      <Combobox id="field-department" options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain('id="field-department"');
  });

  it("does not set a default aria-label", () => {
    const html = renderToStaticMarkup(
      <Combobox options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).not.toContain("aria-label=");
  });

  it("renders expected combobox data attributes", () => {
    const html = renderToStaticMarkup(
      <Combobox options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain("data-headlessui-state");
    expect(html).toContain('type="text"');
  });

  it("matches the refreshed field styling", () => {
    const html = renderToStaticMarkup(
      <Combobox options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain("px-4");
    expect(html).toContain("py-3");
    expect(html).toContain("focus:ring-[3px]");
    expect(html).toContain("disabled:bg-surfaceMuted");
    expect(html).not.toContain("shadow-sm");
  });
});
