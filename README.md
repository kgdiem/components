# Kevin's Design System

Instead of continually building the same components for each project, I've created a design system that I can use across my projects.

It is intended to be minimal, extensible, and unopinionated, heavily inspired by Tailwind components.

Built with React, Tailwind CSS, Headless UI, and Storybook.

## Documentation

Browse the hosted component library at [components.kevindiem.com](https://components.kevindiem.com).

For GitHub-first navigation, each Storybook-backed component also has a co-located Markdown doc in the repo. Start with [COMPONENTS.md](./COMPONENTS.md).

## Installation

```bash
npm install @kgdiem/components
```

## Usage

Import the components and styles into your project.

```tsx
import { Button, Input } from "@kgdiem/components";
import "@kgdiem/components/styles.css";

<Button>Click me</Button>
<Input placeholder="Enter your name" />
```

## Theming

Semantic colors are exposed as Tailwind utilities (`bg-primary`, `text-textMuted`, etc.) backed by CSS custom properties. Override the variables and every component that uses those tokens updates automatically — no fork required.

### Quick start: change primary and brand

Import the library styles, then set `--components-color-*` on `:root`:

```css
/* src/index.css */
@import "tailwindcss";
@import "@kgdiem/components/styles.css";

@layer base {
  :root {
    --components-color-primary: rgb(100 80 200);
    --components-color-brand: rgb(67 56 202);
  }
}
```

Any valid CSS color works — `rgb()`, hex, `oklch()`, etc.:

```css
:root {
  --components-color-primary: #6450c8;
  --components-color-brand: oklch(0.55 0.2 280);
}
```

### Example: full primary palette

Buttons and inputs use the full primary scale (base, hover, active, subtle). Override the related tokens together for a coherent look:

```css
@layer base {
  :root {
    /* base action color */
    --components-color-primary: rgb(79 70 229);
    --components-color-primaryHover: rgb(67 56 202);
    --components-color-primaryActive: rgb(55 48 163);

    /* tinted backgrounds for tertiary buttons, selected list items, etc. */
    --components-color-primarySubtle: rgb(238 242 255);
    --components-color-primaryMuted: rgb(199 210 254);

    /* focus rings on inputs, buttons, and controls */
    --components-color-focus: rgb(79 70 229);
  }
}
```

### Example: dark app shell

Override surface and text tokens for a dark layout while keeping your brand primary:

```css
@layer base {
  :root {
    --components-color-bg: rgb(15 23 42);
    --components-color-surface: rgb(30 41 59);
    --components-color-surfaceMuted: rgb(51 65 85);
    --components-color-text: rgb(248 250 252);
    --components-color-textMuted: rgb(148 163 184);
    --components-color-textSubtle: rgb(100 116 139);
    --components-color-border: rgb(71 85 105);
    --components-color-borderSubtle: rgb(51 65 85);

    /* keep your brand primary unchanged, or override it too */
    --components-color-primary: rgb(56 189 248);
  }
}
```

### Example: scoped override

Set variables on a container to theme a section without affecting the rest of the app:

```css
.marketing-preview {
  --components-color-primary: rgb(220 38 38);
  --components-color-brand: rgb(185 28 28);
}
```

```tsx
<div className="marketing-preview">
  <Button>Uses the red palette inside this container only</Button>
</div>
```

### Available color tokens

Each token maps to a CSS variable named `--components-color-{token}`:

| Group                | Tokens                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Background & surface | `bg`, `surface`, `surfaceRaised`, `surfaceMuted`                                                       |
| Text                 | `text`, `textMuted`, `textSubtle`, `textInverse`                                                       |
| Border               | `border`, `borderSubtle`, `borderStrong`                                                               |
| Primary              | `primary`, `primaryHover`, `primaryActive`, `primarySubtle`, `primaryMuted`                            |
| Semantic             | `success`, `successSubtle`, `warning`, `warningSubtle`, `danger`, `dangerSubtle`, `info`, `infoSubtle` |
| Other                | `focus`, `brand`                                                                                       |

Defaults and helpers are exported from `@kgdiem/components/tokens`:

```ts
import {
  COMPONENTS_COLOR_TOKENS,
  componentsColorVar,
} from "@kgdiem/components/tokens";

componentsColorVar("primary"); // "--components-color-primary"
COMPONENTS_COLOR_TOKENS.primary; // "15 118 150" (default RGB channels)
```

Opacity modifiers (`focus:ring-focus/25`, `text-textInverse/80`) work with overridden colors — Tailwind applies them via `color-mix()` against the same CSS variables.

### Compile Tailwind yourself

Use `@kgdiem/components/theme.css` instead of `styles.css` when your app compiles Tailwind and you only need the token definitions:

```css
@import "tailwindcss";
@import "@kgdiem/components/theme.css";

@layer base {
  :root {
    --components-color-primary: rgb(100 80 200);
  }
}
```

### Build-time overrides (Tailwind preset)

If you extend Tailwind with the library preset, merge token values at build time with `createComponentsPreset()`:

```js
import { createComponentsPreset } from "@kgdiem/components/tailwind-config";

export default {
  presets: [
    createComponentsPreset({
      colors: {
        primary: "100 80 200",
        brand: "rgb(67 56 202)",
      },
    }),
  ],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

Pass RGB channels (`100 80 200`) or a full `rgb(...)` value. Omitted tokens keep the default CSS-variable-backed values, so runtime overrides still work for those tokens.
