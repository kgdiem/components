import "../index.css";

type ColorSwatch = {
  token: string;
  /** Tailwind bg-* utility (must be a literal substring in this file for Tailwind to detect). */
  swatchClass: string;
  value: string;
};

type ColorGroup = {
  title: string;
  items: readonly ColorSwatch[];
};

const COLOR_GROUPS: readonly ColorGroup[] = [
  {
    title: "Background & surface",
    items: [
      { token: "bg", swatchClass: "bg-bg", value: "rgb(248 250 252)" },
      {
        token: "surface",
        swatchClass: "bg-surface",
        value: "rgb(255 255 255)",
      },
      {
        token: "surfaceRaised",
        swatchClass: "bg-surfaceRaised",
        value: "rgb(255 255 255)",
      },
      {
        token: "surfaceMuted",
        swatchClass: "bg-surfaceMuted",
        value: "rgb(241 245 249)",
      },
    ],
  },
  {
    title: "Text",
    items: [
      { token: "text", swatchClass: "bg-text", value: "rgb(15 23 42)" },
      {
        token: "textMuted",
        swatchClass: "bg-textMuted",
        value: "rgb(71 85 105)",
      },
      {
        token: "textSubtle",
        swatchClass: "bg-textSubtle",
        value: "rgb(100 116 139)",
      },
      {
        token: "textInverse",
        swatchClass: "bg-textInverse",
        value: "rgb(255 255 255)",
      },
    ],
  },
  {
    title: "Border",
    items: [
      { token: "border", swatchClass: "bg-border", value: "rgb(203 213 225)" },
      {
        token: "borderSubtle",
        swatchClass: "bg-borderSubtle",
        value: "rgb(226 232 240)",
      },
      {
        token: "borderStrong",
        swatchClass: "bg-borderStrong",
        value: "rgb(148 163 184)",
      },
    ],
  },
  {
    title: "Primary",
    items: [
      { token: "primary", swatchClass: "bg-primary", value: "rgb(15 118 150)" },
      {
        token: "primaryHover",
        swatchClass: "bg-primaryHover",
        value: "rgb(14 100 130)",
      },
      {
        token: "primaryActive",
        swatchClass: "bg-primaryActive",
        value: "rgb(12 74 110)",
      },
      {
        token: "primarySubtle",
        swatchClass: "bg-primarySubtle",
        value: "rgb(236 254 255)",
      },
      {
        token: "primaryMuted",
        swatchClass: "bg-primaryMuted",
        value: "rgb(165 243 252)",
      },
    ],
  },
  {
    title: "Semantic",
    items: [
      { token: "success", swatchClass: "bg-success", value: "rgb(21 128 61)" },
      {
        token: "successSubtle",
        swatchClass: "bg-successSubtle",
        value: "rgb(240 253 244)",
      },
      { token: "warning", swatchClass: "bg-warning", value: "rgb(180 83 9)" },
      {
        token: "warningSubtle",
        swatchClass: "bg-warningSubtle",
        value: "rgb(255 251 235)",
      },
      { token: "danger", swatchClass: "bg-danger", value: "rgb(185 28 28)" },
      {
        token: "dangerSubtle",
        swatchClass: "bg-dangerSubtle",
        value: "rgb(254 242 242)",
      },
      { token: "info", swatchClass: "bg-info", value: "rgb(37 99 235)" },
      {
        token: "infoSubtle",
        swatchClass: "bg-infoSubtle",
        value: "rgb(239 246 255)",
      },
    ],
  },
  {
    title: "Focus",
    items: [
      { token: "focus", swatchClass: "bg-focus", value: "rgb(8 145 178)" },
    ],
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
        utilities from{" "}
        <code className="rounded bg-surfaceMuted px-1 py-0.5 text-xs">
          tailwind.config.js
        </code>
        .
      </p>
    </header>

    {COLOR_GROUPS.map((group) => (
      <section key={group.title} className="mb-10">
        <h2 className="mb-4 text-lg font-medium">{group.title}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {group.items.map((item) => (
            <div key={item.token}>
              <div
                className={`h-16 rounded-md border border-border shadow-sm ${item.swatchClass}`}
                title={item.value}
              />
              <code className="mt-2 block text-xs font-medium">
                {item.token}
              </code>
              <span className="text-xs text-textSubtle">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);
