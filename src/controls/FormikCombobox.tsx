import { useField } from "formik";

import { Combobox, type ComboboxProps } from "./Combobox";

export type FormikComboboxProps = Omit<ComboboxProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: string | undefined) => void;
};

export function FormikCombobox({ name, onChange, ...props }: FormikComboboxProps) {
  const [field, , helpers] = useField<string | undefined>(name);

  return (
    <Combobox
      {...props}
      name={name}
      value={field.value}
      onChange={(value) => {
        const normalizedValue = value ?? undefined;
        helpers.setValue(normalizedValue);
        onChange?.(normalizedValue);
      }}
    />
  );
}
