import "../index.css";

import { COMPONENTS_COLOR_TOKENS, componentsColorVar } from "../tokens/colors";

type ColorSwatch = {
  token: keyof typeof COMPONENTS_COLOR_TOKENS;
  /** Tailwind bg-* utility (must be a literal substring in this file for Tailwind to detect). */
  swatchClass: string;
};

type ColorGroup = {
  title: string;
  items: readonly ColorSwatch[];
};

const COLOR_GROUPS: readonly ColorGroup[] = [
  {
    title: "Background & surface",
    items: [
      { token: "bg", swatchClass: "bg-bg" },
      { token: "surface", swatchClass: "bg-surface" },
      { token: "surfaceRaised", swatchClass: "bg-surfaceRaised" },
      { token: "surfaceMuted", swatchClass: "bg-surfaceMuted" },
    ],
  },
  {
    title: "Text",
    items: [
      { token: "text", swatchClass: "bg-text" },
      { token: "textMuted", swatchClass: "bg-textMuted" },
      { token: "textSubtle", swatchClass: "bg-textSubtle" },
      { token: "textInverse", swatchClass: "bg-textInverse" },
    ],
  },
  {
    title: "Border",
    items: [
      { token: "border", swatchClass: "bg-border" },
      { token: "borderSubtle", swatchClass: "bg-borderSubtle" },
      { token: "borderStrong", swatchClass: "bg-borderStrong" },
    ],
  },
  {
    title: "Primary",
    items: [
      { token: "primary", swatchClass: "bg-primary" },
      { token: "primaryHover", swatchClass: "bg-primaryHover" },
      { token: "primaryActive", swatchClass: "bg-primaryActive" },
      { token: "primarySubtle", swatchClass: "bg-primarySubtle" },
      { token: "primaryMuted", swatchClass: "bg-primaryMuted" },
    ],
  },
  {
    title: "Semantic",
    items: [
      { token: "success", swatchClass: "bg-success" },
      { token: "successSubtle", swatchClass: "bg-successSubtle" },
      { token: "warning", swatchClass: "bg-warning" },
      { token: "warningSubtle", swatchClass: "bg-warningSubtle" },
      { token: "danger", swatchClass: "bg-danger" },
      { token: "dangerSubtle", swatchClass: "bg-dangerSubtle" },
      { token: "info", swatchClass: "bg-info" },
      { token: "infoSubtle", swatchClass: "bg-infoSubtle" },
    ],
  },
  {
    title: "Focus",
    items: [{ token: "focus", swatchClass: "bg-focus" }],
  },
] as const;

export const Colors = () => (
  <div className="min-h-screen bg-bg p-8 text-text">
    <header className="mb-10">
      <h1 className="text-2xl font-semibold">Color tokens</h1>
      <p className="mt-2 text-sm text-textMuted">
        Swatches use Tailwind{" "}
        <code className="rounded bg-surfaceMuted px-1 py-0.5 text-xs">
          bg-*
        </code>{" "}
        utilities backed by{" "}
        <code className="rounded bg-surfaceMuted px-1 py-0.5 text-xs">
          --components-color-*
        </code>{" "}
        CSS variables from{" "}
        <code className="rounded bg-surfaceMuted px-1 py-0.5 text-xs">
          theme.css
        </code>
        .
      </p>
    </header>

    {COLOR_GROUPS.map((group) => (
      <section key={group.title} className="mb-10">
        <h2 className="mb-4 text-lg font-medium">{group.title}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {group.items.map((item) => {
            const channels = COMPONENTS_COLOR_TOKENS[item.token];
            const cssVar = componentsColorVar(item.token);

            return (
              <div key={item.token}>
                <div
                  className={`h-16 rounded-md border border-border shadow-sm ${item.swatchClass}`}
                  title={`rgb(${channels})`}
                />
                <code className="mt-2 block text-xs font-medium">
                  {item.token}
                </code>
                <span className="text-xs text-textSubtle">{cssVar}</span>
              </div>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);
