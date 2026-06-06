import { useField } from "formik";

import { PasswordInput, type PasswordInputProps } from "./PasswordInput";

export type FormikPasswordInputProps = Omit<
  PasswordInputProps,
  "name" | "onChange" | "value"
> & {
  name: string;
};

export function FormikPasswordInput({ name, ...props }: FormikPasswordInputProps) {
  const [field] = useField<string>(name);

  return <PasswordInput {...props} {...field} name={name} />;
}
