import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikPasswordInput.md?raw";
import { FormikPasswordInput } from "../controls/FormikPasswordInput";
import "../index.css";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Formik/PasswordInput",
  component: FormikPasswordInput,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    name: "password",
    placeholder: "Enter password",
    disabled: false,
    autoComplete: "current-password",
  },
} satisfies Meta<typeof FormikPasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialPassword = "secret-password") {
  return (
    <Formik initialValues={{ password: initialPassword }} onSubmit={() => undefined}>
      <Form>
        <FormikPasswordInput {...args} name={args?.name ?? "password"} />
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
