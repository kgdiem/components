import { useField } from "formik";

import { Listbox, type ListboxProps } from "./Listbox";

export type FormikListboxProps = Omit<ListboxProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: string) => void;
};

export function FormikListbox({ name, onChange, ...props }: FormikListboxProps) {
  const [field, , helpers] = useField<string>(name);

  return (
    <Listbox
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
