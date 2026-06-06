import { useField } from "formik";

import { FileUpload, type FileUploadProps } from "./FileUpload";
import type { FileControlValue } from "./fileControlUtils";

export type FormikFileUploadProps = Omit<FileUploadProps, "name" | "onChange" | "value"> & {
  name: string;
  onChange?: (value: FileControlValue) => void;
};

export function FormikFileUpload({ name, onChange, ...props }: FormikFileUploadProps) {
  const [field, , helpers] = useField<FileControlValue>(name);

  return (
    <FileUpload
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
