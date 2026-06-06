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
        component: componentDescription,
      },
    },
  };
}
