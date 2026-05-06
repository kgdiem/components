import { useField } from "formik";

import { Input, type InputProps } from "./Input";

export type FormikInputProps = Omit<InputProps, "name" | "onChange" | "value"> & {
  name: string;
};

export function FormikInput({ name, ...props }: FormikInputProps) {
  const [field] = useField<string>(name);

  return <Input {...props} {...field} name={name} />;
}
