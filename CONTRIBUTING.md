## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run storybook`

### Windows

It is recommended to use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install) to run the application.

## Development

### Build Library

To build the publishable library output in `dist/`, run `npm run build`.

### Package Usage

The package is published with ESM/CJS entry points and named exports, so consumers can import only what they use:

```ts
import { Button, Input } from "@kgdiem/components";
```

### Tailwind Extension

Semantic color tokens ship as a Tailwind preset and as CSS theme variables.

**Runtime overrides** — set `--components-color-*` variables after importing styles (see README *Theming*).

**Build-time overrides** — merge token values into the preset:

```js
import { createComponentsPreset } from "@kgdiem/components/tailwind-config";

export default {
  presets: [
    createComponentsPreset({
      colors: {
        primary: "100 80 200",
      },
    }),
  ],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

The default preset (`componentsTailwindPreset`) references CSS variables so runtime and build-time overrides can be combined.

### Testing

To run the tests, run `npm run test`.

### Component Documentation

Public components are documented in two places that must stay aligned:

1. A Storybook story in `src/stories`
2. A co-located Markdown doc beside the component source, linked from `COMPONENTS.md`

When you add a new public component, add both the story and the Markdown doc. When you change component behavior, update the story and the corresponding Markdown doc in the same PR.

Each component Markdown doc should use these sections in order:

1. `# ComponentName` — title for GitHub browsing; Storybook strips this heading to avoid duplicate titles
2. `## What is it?`
3. `## Import`
4. `## When to use it`
5. `## Key props and composition`
6. `## Common patterns`
7. `## Accessibility and behavior notes`
8. `## Related components`

Wire the doc into Storybook with `withComponentDocs()` from `src/stories/storyDocs.ts`.

## Releasing

This package uses [Changesets](https://github.com/changesets/changesets).

1. Add a release note file in your PR:
   ```bash
   npm run changeset
   ```
2. Push your PR. CI enforces a changeset check.
3. Merge to `main`. GitHub Actions will:
   - update versions and changelog
   - create release commit/tag via Changesets
   - publish to npm
   - build/upload an npm tarball artifact
   - deploy Storybook to Cloudflare Pages after publish

Local git hooks (via Husky) run lint/tests on every commit, and block pushes to `main` unless the pushed commits include a `.changeset/*.md` file (excluding `README.md`).
