import { composeStories, setProjectAnnotations } from "@storybook/react-vite";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import preview from "../../.storybook/preview";

type StoryModule = {
  default: unknown;
  [key: string]: unknown;
};

setProjectAnnotations(preview);

const storyModules = import.meta.glob<StoryModule>("./*.stories.{ts,tsx}", {
  eager: true,
});

describe("storybook SSR harness", () => {
  it("discovers Storybook story modules", () => {
    expect(Object.keys(storyModules).length).toBeGreaterThan(0);
  });

  for (const [modulePath, moduleExports] of Object.entries(storyModules)) {
    const storyPath = modulePath.replace("./", "");
    const stories = composeStories(moduleExports);
    const storyEntries = Object.entries(stories);

    it(`${storyPath} exposes at least one story`, () => {
      expect(storyEntries.length).toBeGreaterThan(0);
    });

    for (const [storyName, Story] of storyEntries) {
      it(`${storyPath} > ${storyName} renders with SSR`, () => {
        expect(() => renderToStaticMarkup(<Story />)).not.toThrow();
      });
    }
  }
});
