import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { FileSelectionSummary } from "./FileSelectionSummary";

function createFile(name: string): File {
  return new File(["content"], name, { type: "text/plain" });
}

describe("FileSelectionSummary", () => {
  it("renders nothing when no files are selected", () => {
    const html = renderToStaticMarkup(<FileSelectionSummary value={null} />);

    expect(html).toBe("");
  });

  it("renders a single selected file name inline", () => {
    const html = renderToStaticMarkup(<FileSelectionSummary value={createFile("report.pdf")} />);

    expect(html).toContain("report.pdf");
    expect(html).not.toContain("<details");
  });

  it("renders an expandable summary for multiple selected files", () => {
    const html = renderToStaticMarkup(
      <FileSelectionSummary value={[createFile("one.txt"), createFile("two.txt")]} />,
    );

    expect(html).toContain("<details");
    expect(html).toContain("2 files selected");
    expect(html).toContain('title="one.txt, two.txt"');
    expect(html).toContain("one.txt");
    expect(html).toContain("two.txt");
  });
});
