import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikInput.md?raw";
import { FormikInput } from "../controls/FormikInput";
import { withComponentDocs } from "./storyDocs";

const meta = {
  title: "Controls/Formik/Input",
  component: FormikInput,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    name: "email",
    placeholder: "name@company.com",
    disabled: false,
    type: "email",
  },
} satisfies Meta<typeof FormikInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialEmail = "user@example.com") {
  return (
    <Formik initialValues={{ email: initialEmail }} onSubmit={() => undefined}>
      <Form>
        <FormikInput {...args} name={args?.name ?? "email"} />
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

export const Clearable: Story = {
  args: {
    clearable: true,
    placeholder: "Search by name or description",
    type: "search",
  },
  render: (args) => renderInFormik(args),
};
