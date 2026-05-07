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
import { Button, Input } from "kdesign";
```

### Tailwind Extension

To extend your Tailwind config with the design tokens:

```js
import kdesignTailwindPreset from "kdesign/tailwind-config";

export default {
  presets: [kdesignTailwindPreset],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

### Testing

To run the tests, run `npm run test`.

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
