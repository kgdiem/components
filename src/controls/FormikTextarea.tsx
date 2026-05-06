import { useField } from "formik";

import { Textarea, type TextareaProps } from "./Textarea";

export type FormikTextareaProps = Omit<TextareaProps, "name" | "onChange" | "value"> & {
  name: string;
};

export function FormikTextarea({ name, ...props }: FormikTextareaProps) {
  const [field] = useField<string>(name);

  return <Textarea {...props} {...field} name={name} />;
}
