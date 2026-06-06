import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikDropzone.md?raw";
import { FormikDropzone } from "../controls/FormikDropzone";
import "../index.css";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Formik/Dropzone",
  component: FormikDropzone,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    description: "PDF or PNG up to 10MB",
    disabled: false,
    label: "Drag files here or browse",
    name: "upload",
  },
} satisfies Meta<typeof FormikDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(
  args: Story["args"],
  initialValues: { upload: File | null; uploads: File[] },
) {
  return (
    <Formik initialValues={initialValues} onSubmit={() => undefined}>
      <Form>
        <FormikDropzone {...args} name={args?.name ?? "upload"} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args, { upload: null, uploads: [] }),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    name: "uploads",
  },
  render: (args) => renderInFormik(args, { upload: null, uploads: [] }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args, { upload: null, uploads: [] }),
};
