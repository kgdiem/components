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
  | "focus"
  | "brand";

export type ComponentsColorOverrides = Partial<
  Record<ComponentsColorToken, string>
>;

export type ComponentsPresetOptions = {
  colors?: ComponentsColorOverrides;
};

export type ComponentsTailwindPreset = {
  theme: {
    extend: {
      colors: Record<string, string>;
    };
  };
};

export const COMPONENTS_COLOR_TOKENS: Record<ComponentsColorToken, string>;

export function componentsColorVar(token: ComponentsColorToken): string;

export function componentsTailwindColor(token: ComponentsColorToken): string;

export function toTailwindColorValue(value: string): string;

export function createComponentsColorTheme(
  overrides?: ComponentsColorOverrides,
): {
  colors: Record<string, string>;
};

export function createComponentsPreset(
  options?: ComponentsPresetOptions,
): ComponentsTailwindPreset;

export const componentsTailwindPreset: ComponentsTailwindPreset;

declare const _default: ComponentsTailwindPreset;
export default _default;
