export type ComponentsColorToken =
  | "bg"
  | "surface"
  | "surfaceRaised"
  | "surfaceMuted"
  | "text"
  | "textMuted"
  | "textSubtle"
  | "textInverse"
  | "border"
  | "borderSubtle"
  | "borderStrong"
  | "primary"
  | "primaryHover"
  | "primaryActive"
  | "primarySubtle"
  | "primaryMuted"
  | "success"
  | "successSubtle"
  | "warning"
  | "warningSubtle"
  | "danger"
  | "dangerSubtle"
  | "info"
  | "infoSubtle"
  | "focus";

export type ComponentsColorOverrides = Partial<
  Record<ComponentsColorToken, string>
>;

export type ComponentsFontToken = "body" | "heading" | "mono";

export type ComponentsFontOverrides = Partial<
  Record<ComponentsFontToken, string>
>;

export type ComponentsPresetOptions = {
  colors?: ComponentsColorOverrides;
  fonts?: ComponentsFontOverrides;
};

export type ComponentsTailwindPreset = {
  theme: {
    extend: {
      colors: Record<string, string>;
      fontFamily: Record<string, string>;
    };
  };
};

export const COMPONENTS_COLOR_TOKENS: Record<ComponentsColorToken, string>;

export const COMPONENTS_DARK_COLOR_TOKENS: Record<ComponentsColorToken, string>;

export const COMPONENTS_FONT_TOKENS: Record<ComponentsFontToken, string>;

export function componentsColorVar(token: ComponentsColorToken): string;

export function componentsTailwindColor(token: ComponentsColorToken): string;

export function componentsFontVar(token: ComponentsFontToken): string;

export function componentsTailwindFont(token: ComponentsFontToken): string;

export function toTailwindColorValue(value: string): string;

export function createComponentsColorTheme(
  overrides?: ComponentsColorOverrides
): {
  colors: Record<string, string>;
};

export function createComponentsFontTheme(
  overrides?: ComponentsFontOverrides
): {
  fontFamily: Record<string, string>;
};

export function createComponentsPreset(
  options?: ComponentsPresetOptions
): ComponentsTailwindPreset;

export const componentsTailwindPreset: ComponentsTailwindPreset;

declare const _default: ComponentsTailwindPreset;
export default _default;
