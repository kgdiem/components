import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  COMPONENTS_COLOR_TOKENS,
  COMPONENTS_DARK_COLOR_TOKENS,
  createComponentsPreset,
  componentsColorVar,
  componentsTailwindColor,
} from "../../tokens/colors.js";

describe("components color tokens", () => {
  it("maps tokens to CSS custom property names", () => {
    expect(componentsColorVar("primary")).toBe("--components-color-primary");
  });

  it("builds tailwind colors from CSS variables by default", () => {
    expect(componentsTailwindColor("primary")).toBe(
      "rgb(var(--components-color-primary) / <alpha-value>)"
    );
  });

  it("creates a preset that references CSS variables for runtime overrides", () => {
    const preset = createComponentsPreset();

    expect(preset.theme.extend.colors.primary).toBe(
      "rgb(var(--components-color-primary) / <alpha-value>)"
    );
  });

  it("allows build-time color overrides via rgb channels", () => {
    const preset = createComponentsPreset({
      colors: {
        primary: "100 80 200",
        focus: "rgb(10 20 30)",
      },
    });

    expect(preset.theme.extend.colors.primary).toBe(
      "rgb(100 80 200 / <alpha-value>)"
    );
    expect(preset.theme.extend.colors.focus).toBe(
      "rgb(10 20 30 / <alpha-value>)"
    );
    expect(preset.theme.extend.colors.bg).toBe(
      "rgb(var(--components-color-bg) / <alpha-value>)"
    );
  });

  it("exports defaults for every documented token", () => {
    expect(Object.keys(COMPONENTS_COLOR_TOKENS)).toEqual([
      "bg",
      "surface",
      "surfaceRaised",
      "surfaceMuted",
      "text",
      "textMuted",
      "textSubtle",
      "textInverse",
      "border",
      "borderSubtle",
      "borderStrong",
      "primary",
      "primaryHover",
      "primaryActive",
      "primarySubtle",
      "primaryMuted",
      "success",
      "successSubtle",
      "warning",
      "warningSubtle",
      "danger",
      "dangerSubtle",
      "info",
      "infoSubtle",
      "focus",
    ]);
  });

  it("exports dark mode defaults with the same token keys", () => {
    expect(Object.keys(COMPONENTS_DARK_COLOR_TOKENS)).toEqual(
      Object.keys(COMPONENTS_COLOR_TOKENS)
    );
  });
});

describe("prebuilt styles.css", () => {
  it("emits valid CSS without unresolved alpha placeholders", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../dist/index.css"),
      "utf8"
    );

    expect(css).not.toContain("<alpha-value>");
    expect(css).toMatch(
      /--components-color-primary:(?:#0f7696|rgb\(15 118 150\))/
    );
    expect(css).toMatch(
      /\.bg-primary[^{]*\{[^}]*var\(--components-color-primary\)/
    );
    expect(css).toMatch(
      /focus\\:ring-focus\\\/25:focus\{--tw-ring-color:color-mix\(in oklab, var\(--components-color-focus\) 25%, transparent\)/
    );
    expect(css).not.toContain("html,:host{-webkit-text-size-adjust:100%");
  });

  it("keeps generated utilities out of Tailwind's global utilities layer", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../dist/index.css"),
      "utf8"
    );

    expect(css).toContain("@layer components");
    expect(css).not.toContain("@layer utilities{");
  });

  it("ships an optional preflight bundle", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../dist/styles.preflight.css"),
      "utf8"
    );

    expect(css).toContain("html,:host{-webkit-text-size-adjust:100%");
    expect(css).toContain("@layer components");
  });
});

describe("source-mode entrypoints", () => {
  it("uses dist sources in published source.css", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../src/source.css"),
      "utf8"
    );

    expect(css).toContain('@source "../dist/components";');
    expect(css).toContain('@source "../dist/controls";');
    expect(css).toContain('@source "../dist/navigation";');
    expect(css).toContain('@source "../dist/structures";');
    expect(css).toContain('@source "../dist/typography";');
    expect(css).not.toContain('@source "./components";');
  });

  it("uses local sources in linked-only source.local.css", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../src/source.local.css"),
      "utf8"
    );

    expect(css).toContain('@source "./components";');
    expect(css).toContain('@source "./controls";');
    expect(css).toContain('@source "./navigation";');
    expect(css).toContain('@source "./structures";');
    expect(css).toContain('@source "./typography";');
    expect(css).not.toContain('@source "../dist/components";');
  });
});
