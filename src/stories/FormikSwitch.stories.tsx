import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import { FormikSwitch } from "../controls/FormikSwitch";
import "../index.css";

const meta = {
  title: "Controls/Formik/Switch",
  component: FormikSwitch,
  tags: ["autodocs"],
  args: {
    name: "enabled",
    label: "Enable notifications",
    disabled: false,
  },
} satisfies Meta<typeof FormikSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialEnabled = true) {
  return (
    <Formik initialValues={{ enabled: initialEnabled }} onSubmit={() => undefined}>
      <Form>
        <FormikSwitch {...args} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args),
};

export const Off: Story = {
  render: (args) => renderInFormik(args, false),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args),
};
