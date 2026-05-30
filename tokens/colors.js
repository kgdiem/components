/** @typedef {import("./colors.d.ts").ComponentsColorToken} ComponentsColorToken */
/** @typedef {import("./colors.d.ts").ComponentsColorOverrides} ComponentsColorOverrides */
/** @typedef {import("./colors.d.ts").ComponentsPresetOptions} ComponentsPresetOptions */

/** @type {Record<ComponentsColorToken, string>} */
export const COMPONENTS_COLOR_TOKENS = {
  bg: "248 250 252",
  surface: "255 255 255",
  surfaceRaised: "255 255 255",
  surfaceMuted: "241 245 249",

  text: "15 23 42",
  textMuted: "71 85 105",
  textSubtle: "100 116 139",
  textInverse: "255 255 255",

  border: "203 213 225",
  borderSubtle: "226 232 240",
  borderStrong: "148 163 184",

  primary: "15 118 150",
  primaryHover: "14 100 130",
  primaryActive: "12 74 110",
  primarySubtle: "236 254 255",
  primaryMuted: "165 243 252",

  success: "21 128 61",
  successSubtle: "240 253 244",

  warning: "180 83 9",
  warningSubtle: "255 251 235",

  danger: "185 28 28",
  dangerSubtle: "254 242 242",

  info: "37 99 235",
  infoSubtle: "239 246 255",

  focus: "8 145 178",

  brand: "67 56 202",
};

/** @param {ComponentsColorToken} token */
export function componentsColorVar(token) {
  return `--components-color-${token}`;
}

/** @param {ComponentsColorToken} token */
export function componentsTailwindColor(token) {
  return `rgb(var(${componentsColorVar(token)}) / <alpha-value>)`;
}

/**
 * @param {string} value RGB channels (`100 80 200`) or a full `rgb(...)` color.
 * @returns {string}
 */
export function toTailwindColorValue(value) {
  const normalized = value.trim();

  if (normalized.includes("<alpha-value>")) {
    return normalized;
  }

  if (normalized.startsWith("rgb(")) {
    return normalized.replace(/\)$/, " / <alpha-value>)");
  }

  return `rgb(${normalized} / <alpha-value>)`;
}

/** @param {ComponentsColorOverrides} [overrides] */
export function createComponentsColorTheme(overrides = {}) {
  /** @type {Record<string, string>} */
  const colors = {};

  for (const [token, channels] of Object.entries(COMPONENTS_COLOR_TOKENS)) {
    const override = overrides[/** @type {ComponentsColorToken} */ (token)];

    colors[token] =
      override === undefined
        ? componentsTailwindColor(/** @type {ComponentsColorToken} */ (token))
        : toTailwindColorValue(override);
  }

  return { colors };
}

/** @param {ComponentsPresetOptions} [options] */
export function createComponentsPreset(options = {}) {
  return {
    theme: {
      extend: createComponentsColorTheme(options.colors),
    },
  };
}

/** Default preset with runtime-overridable CSS variable references. */
export const componentsTailwindPreset = createComponentsPreset();

export default componentsTailwindPreset;
