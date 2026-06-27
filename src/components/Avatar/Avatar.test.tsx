import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials in a circular badge", () => {
    const html = renderToStaticMarkup(<Avatar initials="BS" />);

    expect(html).toContain("BS");
    expect(html).toContain("rounded-full");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("size-10");
  });

  it("renders xs and lg sizes", () => {
    const extraSmall = renderToStaticMarkup(<Avatar initials="AB" size="xs" />);
    expect(extraSmall).toContain("size-5");

    const large = renderToStaticMarkup(<Avatar initials="AB" size="lg" />);
    expect(large).toContain("size-12");
  });

  it("merges custom color and layout classes", () => {
    const html = renderToStaticMarkup(
      <Avatar
        backgroundClassName="bg-infoSubtle"
        className="ring-2"
        initials="JL"
        textClassName="text-info"
      />,
    );

    expect(html).toContain("bg-infoSubtle");
    expect(html).toContain("text-info");
    expect(html).toContain("ring-2");
  });
});
