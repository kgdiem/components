import { describe, expect, it } from "vitest";

import { withComponentDocs } from "./storyDocs";

describe("withComponentDocs", () => {
  it("adds the component description to empty parameters", () => {
    expect(withComponentDocs("Component docs")).toEqual({
      docs: {
        description: {
          component: "Component docs",
        },
      },
    });
  });

  it("strips a leading H1 so Storybook does not duplicate the component title", () => {
    expect(
      withComponentDocs("# Box\n\n## What is it?\n\nBox docs."),
    ).toEqual({
      docs: {
        description: {
          component: "## What is it?\n\nBox docs.",
        },
      },
    });
  });

  it("preserves existing parameters while replacing the component description", () => {
    expect(
      withComponentDocs("New docs", {
        layout: "centered",
        docs: {
          description: {
            component: "Old docs",
            story: "Story notes",
          },
        },
      }),
    ).toEqual({
      layout: "centered",
      docs: {
        description: {
          component: "New docs",
          story: "Story notes",
        },
      },
    });
  });
});
