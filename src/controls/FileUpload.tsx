import { useId, useRef, type ChangeEvent, type InputHTMLAttributes } from "react";

import { Button } from "../components/Button";
import { mergeClasses } from "@utils/mergeClasses";

import { FileSelectionSummary } from "./FileSelectionSummary";
import {
  type FileControlValue,
  filesFromFileList,
} from "./fileControlUtils";

type FileUploadBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "multiple" | "onChange" | "type" | "value"
> & {
  buttonLabel?: string;
  className?: string;
  onBlur?: () => void;
};

export type FileUploadProps = FileUploadBaseProps & {
  multiple?: boolean;
  onChange?: (value: FileControlValue) => void;
  value?: FileControlValue;
};

const WRAPPER_CLASSES = "flex flex-wrap items-center gap-3";

export function FileUpload({
  accept,
  buttonLabel = "Choose file",
  className,
  disabled,
  id,
  multiple = false,
  name,
  onBlur,
  onChange,
  value,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(filesFromFileList(event.target.files, multiple));
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={mergeClasses(WRAPPER_CLASSES, className)}>
      <input
        {...props}
        accept={accept}
        className="hidden"
        disabled={disabled}
        id={inputId}
        multiple={multiple || undefined}
        name={name}
        onBlur={onBlur}
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <Button disabled={disabled} onClick={handleButtonClick} type="button" variant="secondary">
        {buttonLabel}
      </Button>
      <FileSelectionSummary value={value} />
    </div>
  );
}
