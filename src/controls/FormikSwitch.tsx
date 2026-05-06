import { useField } from "formik";

import { Switch, type SwitchProps } from "./Switch";

export type FormikSwitchProps = Omit<SwitchProps, "checked" | "name" | "onChange"> & {
  name: string;
  onChange?: (checked: boolean) => void;
};

export function FormikSwitch({ name, onChange, ...props }: FormikSwitchProps) {
  const [field, , helpers] = useField<boolean>({ name, type: "checkbox" });

  return (
    <Switch
      {...props}
      checked={Boolean(field.value)}
      name={name}
      onChange={(checked) => {
        helpers.setValue(checked);
        onChange?.(checked);
      }}
    />
  );
}
