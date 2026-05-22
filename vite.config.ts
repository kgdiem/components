/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(dirname, "./src/utils"),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(dirname, "src/index.ts"),
        styles: path.resolve(dirname, "src/styles.ts"),
      },
      name: "KDesign",
    },
    rollupOptions: {
      treeshake: true,
      external: [
        /^react(?:\/|$)/,
        /^react-dom(?:\/|$)/,
        "formik",
        "@headlessui/react",
        "lucide-react",
      ],
      output: [
        {
          format: "es",
          exports: "named",
          dir: path.resolve(dirname, "dist"),
          preserveModules: true,
          preserveModulesRoot: path.resolve(dirname, "src"),
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "styles[extname]",
        },
        {
          format: "cjs",
          exports: "named",
          dir: path.resolve(dirname, "dist"),
          preserveModules: true,
          preserveModulesRoot: path.resolve(dirname, "src"),
          entryFileNames: "[name].cjs",
          chunkFileNames: "[name].cjs",
          assetFileNames: "styles[extname]",
        },
      ],
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,tsx}"],
          environment: "node",
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
