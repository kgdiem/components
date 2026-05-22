import { useField } from "formik";

import { Input, type InputProps } from "./Input";

export type FormikInputProps = Omit<InputProps, "name" | "onChange" | "value" | "onClear"> & {
  name: string;
};

export function FormikInput({ name, clearable, ...props }: FormikInputProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <Input
      {...props}
      {...field}
      clearable={clearable}
      name={name}
      onClear={clearable ? () => helpers.setValue("") : undefined}
    />
  );
}
