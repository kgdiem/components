import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element with base classes", () => {
    const html = renderToStaticMarkup(<Textarea placeholder="Write a note" rows={4} />);

    expect(html).toContain("<textarea");
    expect(html).toContain('placeholder="Write a note"');
    expect(html).toContain('rows="4"');
    expect(html).toContain("border-border");
    expect(html).toContain("focus:ring-focus/25");
  });

  it("merges custom className and html attributes", () => {
    const html = renderToStaticMarkup(
      <Textarea className="min-h-24" id="textarea-id" name="notes">
        Details
      </Textarea>,
    );

    expect(html).toContain("min-h-24");
    expect(html).toContain('id="textarea-id"');
    expect(html).toContain('name="notes"');
    expect(html).toContain(">Details</textarea>");
  });

  it("matches the refreshed field styling", () => {
    const html = renderToStaticMarkup(<Textarea placeholder="Write a note" />);

    expect(html).toContain("px-4");
    expect(html).toContain("py-3");
    expect(html).toContain("focus:ring-[3px]");
    expect(html).toContain("disabled:bg-surfaceMuted");
    expect(html).not.toContain("shadow-sm");
  });
});
