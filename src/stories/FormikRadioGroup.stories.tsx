import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import { FormikRadioGroup } from "../controls/FormikRadioGroup";
import "../index.css";

const options = [
  {
    value: "email",
    label: "Email",
    description: "Receive updates through email notifications.",
  },
  {
    value: "sms",
    label: "SMS",
    description: "Receive text message alerts.",
  },
  {
    value: "push",
    label: "Push",
    description: "Receive mobile push notifications.",
    disabled: true,
  },
];

const meta = {
  title: "Controls/Formik/RadioGroup",
  component: FormikRadioGroup,
  tags: ["autodocs"],
  args: {
    name: "channel",
    options,
    disabled: false,
  },
} satisfies Meta<typeof FormikRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialChannel = "email") {
  return (
    <Formik initialValues={{ channel: initialChannel }} onSubmit={() => undefined}>
      <Form>
        <FormikRadioGroup {...args} />
      </Form>
    </Formik>
  );
}

export const Default: Story = {
  render: (args) => renderInFormik(args),
};

export const Unselected: Story = {
  render: (args) => renderInFormik(args, ""),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => renderInFormik(args),
};
