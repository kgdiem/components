import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("storybook showcase styles", () => {
  it("compiles the full Tailwind framework so the showcase keeps preflight", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../.storybook/preview.css"),
      "utf8"
    );

    // The published `index.css` is intentionally lean (theme + component-layer
    // utilities, no preflight). The showcase is a host app, so it must pull the
    // full framework to recover preflight and Tailwind's canonical layer order.
    expect(css).toContain('@import "tailwindcss"');
    expect(css).not.toContain('@import "tailwindcss/theme"');
    expect(css).toContain('@import "../src/theme.css"');
  });
});
