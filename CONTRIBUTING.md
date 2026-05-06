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
