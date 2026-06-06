import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikTextarea.md?raw";
import { FormikTextarea } from "../controls/FormikTextarea";
import "../index.css";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Formik/Textarea",
  component: FormikTextarea,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    name: "notes",
    placeholder: "Write your notes",
    rows: 4,
    disabled: false,
  },
} satisfies Meta<typeof FormikTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialNotes = "Initial note body") {
  return (
    <Formik initialValues={{ notes: initialNotes }} onSubmit={() => undefined}>
      <Form>
        <FormikTextarea {...args} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args),
};

export const Empty: Story = {
  render: (args) => renderInFormik(args, ""),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args),
};
