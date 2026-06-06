import { describe, expect, it } from "vitest";

import { appendFiles, fileSelectionCount, filesFromFileList, formatFileSelection, formatFileSelectionTooltip, getSelectedFiles } from "./fileControlUtils";

function createFile(name: string): File {
  return new File(["content"], name, { type: "text/plain" });
}

function createFileList(files: File[]): FileList {
  const fileList = {
    length: files.length,
    item(index: number) {
      return files[index] ?? null;
    },
    *[Symbol.iterator]() {
      for (const file of files) {
        yield file;
      }
    },
  } as FileList;

  files.forEach((file, index) => {
    Object.defineProperty(fileList, index, {
      value: file,
      enumerable: true,
    });
  });

  return fileList;
}

describe("fileControlUtils", () => {
  it("returns null for empty single selection", () => {
    expect(filesFromFileList(createFileList([]), false)).toBeNull();
  });

  it("returns an empty array for empty multiple selection", () => {
    expect(filesFromFileList(createFileList([]), true)).toEqual([]);
  });

  it("returns the first file for single selection", () => {
    const files = [createFile("one.txt"), createFile("two.txt")];

    expect(filesFromFileList(createFileList(files), false)).toBe(files[0]);
  });

  it("returns all files for multiple selection", () => {
    const files = [createFile("one.txt"), createFile("two.txt")];

    expect(filesFromFileList(createFileList(files), true)).toEqual(files);
  });

  it("appends incoming files to the current multiple selection", () => {
    const existing = [createFile("existing.txt")];
    const incoming = createFileList([createFile("new.txt")]);

    const result = appendFiles(existing, incoming);

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe("existing.txt");
    expect(result[1]?.name).toBe("new.txt");
  });

  it("formats single and multiple selections for display", () => {
    expect(formatFileSelection(createFile("report.pdf"))).toBe("report.pdf");
    expect(formatFileSelection([createFile("a.txt"), createFile("b.txt")])).toBe("2 files selected");
    expect(formatFileSelection([])).toBe("");
  });

  it("counts selected files", () => {
    expect(fileSelectionCount(createFile("report.pdf"))).toBe(1);
    expect(fileSelectionCount([createFile("a.txt"), createFile("b.txt")])).toBe(2);
    expect(fileSelectionCount(null)).toBe(0);
  });

  it("returns selected files from single and multiple values", () => {
    const files = [createFile("a.txt"), createFile("b.txt")];

    expect(getSelectedFiles(createFile("report.pdf"))).toHaveLength(1);
    expect(getSelectedFiles(createFile("report.pdf"))[0]?.name).toBe("report.pdf");
    expect(getSelectedFiles(files)).toEqual(files);
    expect(getSelectedFiles(null)).toEqual([]);
  });

  it("formats a tooltip from selected file names", () => {
    expect(formatFileSelectionTooltip([createFile("a.txt"), createFile("b.txt")])).toBe(
      "a.txt, b.txt",
    );
  });
});
