import { useField } from "formik";

import { Dropzone, type DropzoneProps } from "./Dropzone";
import type { FileControlValue } from "./fileControlUtils";

export type FormikDropzoneProps = Omit<DropzoneProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: FileControlValue) => void;
};

export function FormikDropzone({ name, onChange, ...props }: FormikDropzoneProps) {
  const [field, , helpers] = useField<FileControlValue>(name);

  return (
    <Dropzone
      {...props}
      name={name}
      onBlur={() => helpers.setTouched(true)}
      onChange={(nextValue) => {
        helpers.setValue(nextValue);
        onChange?.(nextValue);
      }}
      value={field.value}
    />
  );
}
