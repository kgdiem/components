import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { StackedList, StackedListItem } from "./StackedList";

describe("StackedList", () => {
  it("renders stacked list container styles", () => {
    const html = renderToStaticMarkup(
      <StackedList>
        <StackedListItem>Row</StackedListItem>
      </StackedList>
    );

    expect(html).toContain("divide-y");
    expect(html).toContain("divide-borderSubtle");
  });

  it("renders list items with wrapper spacing only", () => {
    const html = renderToStaticMarkup(
      <StackedList>
        <StackedListItem>
          <div className="flex justify-between">Custom content</div>
        </StackedListItem>
      </StackedList>
    );

    expect(html).toContain("<li");
    expect(html).toContain("py-5");
    expect(html).toContain("Custom content");
    expect(html).toContain("flex justify-between");
  });

  it("merges custom className values", () => {
    const html = renderToStaticMarkup(
      <StackedList className="rounded-lg">
        <StackedListItem className="px-4">Row</StackedListItem>
      </StackedList>
    );

    expect(html).toContain("rounded-lg");
    expect(html).toContain("px-4");
  });
});
