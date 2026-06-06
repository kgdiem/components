import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikFileUpload.md?raw";
import { FormikFileUpload } from "../controls/FormikFileUpload";
import "../index.css";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Formik/FileUpload",
  component: FormikFileUpload,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    name: "attachment",
    buttonLabel: "Choose file",
    disabled: false,
  },
} satisfies Meta<typeof FormikFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(
  args: Story["args"],
  initialValues: { attachment: File | null; attachments: File[] },
) {
  return (
    <Formik initialValues={initialValues} onSubmit={() => undefined}>
      <Form>
        <FormikFileUpload {...args} name={args?.name ?? "attachment"} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args, { attachment: null, attachments: [] }),
};

export const Multiple: Story = {
  args: {
    buttonLabel: "Choose files",
    multiple: true,
    name: "attachments",
  },
  render: (args) => renderInFormik(args, { attachment: null, attachments: [] }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args, { attachment: null, attachments: [] }),
};
