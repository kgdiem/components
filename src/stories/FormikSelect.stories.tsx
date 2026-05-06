import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import { FormikSelect } from "../controls/FormikSelect";
import "../index.css";

const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta = {
  title: "Controls/Formik/Select",
  component: FormikSelect,
  tags: ["autodocs"],
  args: {
    name: "status",
    options,
    placeholder: "Choose status",
    disabled: false,
  },
} satisfies Meta<typeof FormikSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialStatus = "draft") {
  return (
    <Formik initialValues={{ status: initialStatus }} onSubmit={() => undefined}>
      <Form>
        <FormikSelect {...args} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args),
};

export const Placeholder: Story = {
  render: (args) => renderInFormik(args, ""),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args, "approved"),
};
