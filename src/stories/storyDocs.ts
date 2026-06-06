type StoryDocsDescription = {
  component?: string;
  story?: string;
};

type StoryDocsParameters = {
  docs?: {
    description?: StoryDocsDescription;
  };
  [key: string]: unknown;
};

function stripLeadingComponentTitle(markdown: string): string {
  return markdown.replace(/^#\s+.+\r?\n(?:\r?\n)?/, "");
}

export function withComponentDocs(
  componentDescription: string,
  parameters: StoryDocsParameters = {},
): StoryDocsParameters {
  return {
    ...parameters,
    docs: {
      ...parameters.docs,
      description: {
        ...parameters.docs?.description,
        component: stripLeadingComponentTitle(componentDescription),
      },
    },
  };
}
