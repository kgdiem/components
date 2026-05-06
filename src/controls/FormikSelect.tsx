import { useField } from "formik";

import { Select, type SelectProps } from "./Select";

export type FormikSelectProps = Omit<SelectProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: string) => void;
};

export function FormikSelect({ name, onChange, ...props }: FormikSelectProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <Select
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
