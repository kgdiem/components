import { useField } from "formik";

import { RadioGroup, type RadioGroupProps } from "./RadioGroup";

export type FormikRadioGroupProps = Omit<RadioGroupProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: string) => void;
};

export function FormikRadioGroup({ name, onChange, ...props }: FormikRadioGroupProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <RadioGroup
      {...props}
      name={name}
      value={field.value}
      onChange={(value) => {
        helpers.setValue(value);
        onChange?.(value);
      }}
    />
  );
}
