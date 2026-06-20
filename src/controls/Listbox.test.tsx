import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Listbox } from "./Listbox";

const OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved", disabled: true },
];

describe("Listbox", () => {
  it("renders selected option label", () => {
    const html = renderToStaticMarkup(
      <Listbox options={OPTIONS} value="review" onChange={() => undefined} />,
    );

    expect(html).toContain(">In Review</button>");
    expect(html).toContain('aria-haspopup="listbox"');
  });

  it("renders placeholder when no option is selected", () => {
    const html = renderToStaticMarkup(
      <Listbox options={OPTIONS} placeholder="Choose status" onChange={() => undefined} />,
    );

    expect(html).toContain(">Choose status</button>");
  });

  it("forwards id to the listbox button for label association", () => {
    const html = renderToStaticMarkup(
      <Listbox id="field-status" options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain('id="field-status"');
  });

  it("renders option list with disabled option attributes", () => {
    const html = renderToStaticMarkup(
      <Listbox options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain(">Draft</button>");
    expect(html).toContain("focus:ring-focus/25");
  });

  it("matches the refreshed trigger styling", () => {
    const html = renderToStaticMarkup(
      <Listbox options={OPTIONS} value="draft" onChange={() => undefined} />,
    );

    expect(html).toContain("px-4");
    expect(html).toContain("py-3");
    expect(html).toContain("focus:ring-[3px]");
    expect(html).toContain("disabled:bg-surfaceMuted");
    expect(html).not.toContain("shadow-sm");
  });
});
