import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import "../index.css";
import { Combobox } from "../controls/Combobox";
import { Input } from "../controls/Input";
import { RadioGroup } from "../controls/RadioGroup";
import { Select } from "../controls/Select";
import { Switch } from "../controls/Switch";
import { Textarea } from "../controls/Textarea";
import { Vertical } from "../structures/Vertical";
import { Label } from "../typography/Label";

const selectOptions = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "In Review" },
  { value: "approved", label: "Approved" },
];

const comboboxOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "operations", label: "Operations" },
];

const meta = {
  title: "Typography/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Field label",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  args: {
    children: "Email",
    htmlFor: "field-email",
  },
  render: (args) => (
    <Vertical className="max-w-sm gap-2">
      <Label {...args} />
      <Input id="field-email" name="email" type="email" placeholder="you@example.com" />
    </Vertical>
  ),
};

export const WithTextarea: Story = {
  args: {
    children: "Message",
    htmlFor: "field-message",
  },
  render: (args) => (
    <Vertical className="max-w-sm gap-2">
      <Label {...args} />
      <Textarea id="field-message" name="message" rows={4} placeholder="Write your message" />
    </Vertical>
  ),
};

export const WithSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("draft");

    return (
      <Vertical className="max-w-sm gap-2">
        <Label htmlFor="field-status">Status</Label>
        <Select
          id="field-status"
          options={selectOptions}
          placeholder="Choose status"
          value={value}
          onChange={setValue}
        />
      </Vertical>
    );
  },
};

export const WithCombobox: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("engineering");

    return (
      <Vertical className="max-w-sm gap-2">
        <Label htmlFor="field-department">Department</Label>
        <Combobox
          id="field-department"
          options={comboboxOptions}
          placeholder="Search departments"
          value={value}
          onChange={setValue}
        />
      </Vertical>
    );
  },
};

export const WithSwitch: Story = {
  render: () => (
    <Vertical className="max-w-sm gap-2">
      <Label htmlFor="field-alerts">Email alerts</Label>
      <Switch checked id="field-alerts" onChange={() => undefined} />
    </Vertical>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <fieldset className="m-0 flex max-w-sm flex-col gap-2 border-0 p-0">
      <Label as="legend">Notification method</Label>
      <RadioGroup
        options={[
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" },
        ]}
        value="email"
        onChange={() => undefined}
      />
    </fieldset>
  ),
};

export const FormFields: Story = {
  render: () => {
    const [status, setStatus] = useState<string | undefined>("draft");
    const [department, setDepartment] = useState<string | null>("engineering");

    return (
      <Vertical className="max-w-sm gap-4">
        <Vertical className="gap-2">
          <Label htmlFor="form-email">Email</Label>
          <Input id="form-email" name="email" type="email" placeholder="you@example.com" />
        </Vertical>
        <Vertical className="gap-2">
          <Label htmlFor="form-message">Message</Label>
          <Textarea id="form-message" name="message" rows={3} placeholder="Optional note" />
        </Vertical>
        <Vertical className="gap-2">
          <Label htmlFor="form-status">Status</Label>
          <Select
            id="form-status"
            options={selectOptions}
            placeholder="Choose status"
            value={status}
            onChange={setStatus}
          />
        </Vertical>
        <Vertical className="gap-2">
          <Label htmlFor="form-department">Department</Label>
          <Combobox
            id="form-department"
            options={comboboxOptions}
            placeholder="Search departments"
            value={department}
            onChange={setDepartment}
          />
        </Vertical>
      </Vertical>
    );
  },
};
