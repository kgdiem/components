import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form, Formik } from "formik";

import componentDocs from "../controls/FormikCombobox.md?raw";
import { FormikCombobox } from "../controls/FormikCombobox";
import { withComponentDocs } from "./storyDocs";

const options = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta = {
  title: "Controls/Formik/Combobox",
  component: FormikCombobox,
  tags: ["autodocs"],
  parameters: withComponentDocs(componentDocs),
  args: {
    name: "status",
    options,
    placeholder: "Search status",
    disabled: false,
  },
} satisfies Meta<typeof FormikCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderInFormik(args: Story["args"], initialStatus = "draft") {
  return (
    <Formik initialValues={{ status: initialStatus }} onSubmit={() => undefined}>
      <Form>
        <FormikCombobox {...args} />
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
  render: (args) => renderInFormik(args, "approved"),
};
