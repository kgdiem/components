import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  COMPONENTS_COLOR_TOKENS,
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
      "rgb(var(--components-color-primary) / <alpha-value>)",
    );
  });

  it("creates a preset that references CSS variables for runtime overrides", () => {
    const preset = createComponentsPreset();

    expect(preset.theme.extend.colors.primary).toBe(
      "rgb(var(--components-color-primary) / <alpha-value>)",
    );
  });

  it("allows build-time color overrides via rgb channels", () => {
    const preset = createComponentsPreset({
      colors: {
        primary: "100 80 200",
        brand: "rgb(10 20 30)",
      },
    });

    expect(preset.theme.extend.colors.primary).toBe(
      "rgb(100 80 200 / <alpha-value>)",
    );
    expect(preset.theme.extend.colors.brand).toBe(
      "rgb(10 20 30 / <alpha-value>)",
    );
    expect(preset.theme.extend.colors.bg).toBe(
      "rgb(var(--components-color-bg) / <alpha-value>)",
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
      "brand",
    ]);
  });
});

describe("prebuilt styles.css", () => {
  it("emits valid CSS without unresolved alpha placeholders", () => {
    const css = readFileSync(
      resolve(import.meta.dirname, "../../dist/styles.css"),
      "utf8",
    );

    expect(css).not.toContain("<alpha-value>");
    expect(css).toMatch(/--components-color-primary:(?:#0f7696|rgb\(15 118 150\))/);
    expect(css).toMatch(
      /\.bg-primary[^{]*\{[^}]*var\(--components-color-primary\)/,
    );
    expect(css).toMatch(
      /focus\\:ring-focus\\\/25:focus\{--tw-ring-color:color-mix\(in oklab, var\(--components-color-focus\) 25%, transparent\)/,
    );
  });
});
