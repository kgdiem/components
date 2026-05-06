import { describe, expect, it } from "vitest";

import { mergeClasses } from "./mergeClasses";

describe("mergeClasses", () => {
  it("joins classes with spaces in order", () => {
    expect(mergeClasses("btn", "btn-primary", "w-full")).toBe(
      "btn btn-primary w-full",
    );
  });

  it("filters out undefined values", () => {
    expect(mergeClasses("btn", undefined, "w-full", undefined)).toBe(
      "btn w-full",
    );
  });

  it("returns an empty string when no classes are provided", () => {
    expect(mergeClasses()).toBe("");
  });
});
