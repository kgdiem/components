import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("renders a hidden file input and trigger button", () => {
    const html = renderToStaticMarkup(<FileUpload buttonLabel="Choose file" name="attachment" />);

    expect(html).toContain('type="file"');
    expect(html).toContain('name="attachment"');
    expect(html).toContain("Choose file");
    expect(html).toContain('class="hidden"');
  });

  it("supports multiple file selection", () => {
    const html = renderToStaticMarkup(<FileUpload multiple name="attachments" />);

    expect(html).toContain("multiple");
  });

  it("shows the selected file name", () => {
    const file = new File(["content"], "report.pdf", { type: "application/pdf" });
    const html = renderToStaticMarkup(<FileUpload value={file} onChange={() => undefined} />);

    expect(html).toContain("report.pdf");
  });

  it("shows an expandable summary for multiple selected files", () => {
    const files = [
      new File(["a"], "one.txt", { type: "text/plain" }),
      new File(["b"], "two.txt", { type: "text/plain" }),
    ];
    const html = renderToStaticMarkup(
      <FileUpload multiple value={files} onChange={() => undefined} />,
    );

    expect(html).toContain("2 files selected");
    expect(html).toContain('title="one.txt, two.txt"');
    expect(html).toContain("one.txt");
    expect(html).toContain("two.txt");
  });
});
