import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { Dropzone } from "./Dropzone";

describe("Dropzone", () => {
  it("renders a drop target with browse affordance", () => {
    const html = renderToStaticMarkup(
      <Dropzone description="PDF or PNG up to 10MB" label="Upload files" name="upload" />,
    );

    expect(html).toContain('type="file"');
    expect(html).toContain('name="upload"');
    expect(html).toContain("Upload files");
    expect(html).toContain("PDF or PNG up to 10MB");
    expect(html).toContain("border-dashed");
  });

  it("supports multiple file selection", () => {
    const html = renderToStaticMarkup(<Dropzone multiple name="uploads" />);

    expect(html).toContain("multiple");
  });

  it("lists selected files", () => {
    const files = [
      new File(["a"], "one.txt", { type: "text/plain" }),
      new File(["b"], "two.txt", { type: "text/plain" }),
    ];
    const html = renderToStaticMarkup(<Dropzone multiple value={files} onChange={() => undefined} />);

    expect(html).toContain("one.txt");
    expect(html).toContain("two.txt");
  });
});
