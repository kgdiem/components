import { Upload } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";

import { Text } from "../typography/Text";
import { mergeClasses } from "@utils/mergeClasses";

import {
  appendFiles,
  type FileControlValue,
  filesFromFileList,
  getSelectedFiles,
} from "./fileControlUtils";
import { FileSelectionSummary } from "./FileSelectionSummary";

type DropzoneBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "multiple" | "onChange" | "type" | "value"
> & {
  className?: string;
  description?: string;
  label?: string;
  onBlur?: () => void;
};

export type DropzoneProps = DropzoneBaseProps & {
  multiple?: boolean;
  onChange?: (value: FileControlValue) => void;
  value?: FileControlValue;
};

const DROPZONE_CLASSES =
  "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-surface px-4 py-8 text-center shadow-sm transition-colors duration-150 hover:border-focus hover:bg-surfaceMuted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/25 disabled:cursor-not-allowed disabled:opacity-50";

const ACTIVE_DROPZONE_CLASSES = "border-focus bg-primarySubtle";

const FILE_LIST_CLASSES = "mt-3 flex w-full flex-col gap-1 text-left";

export function Dropzone({
  accept,
  className,
  description,
  disabled,
  id,
  label = "Drag files here or browse",
  multiple = false,
  name,
  onBlur,
  onChange,
  value,
  ...props
}: DropzoneProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const updateValue = (fileList: FileList | null) => {
    if (multiple) {
      onChange?.(appendFiles(value ?? [], fileList));
      return;
    }

    onChange?.(filesFromFileList(fileList, false));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.files);
    event.target.value = "";
  };

  const handleBrowse = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    setDragActive(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (disabled) {
      return;
    }

    updateValue(event.dataTransfer.files);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowse();
    }
  };

  return (
    <div className={className}>
      <div
        aria-disabled={disabled || undefined}
        className={mergeClasses(
          DROPZONE_CLASSES,
          dragActive ? ACTIVE_DROPZONE_CLASSES : undefined,
        )}
        onClick={handleBrowse}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <Upload aria-hidden className="mb-2 size-6 text-textMuted" />
        <Text as="span" className="font-medium" variant="bodySm">
          {label}
        </Text>
        {description ? (
          <Text as="span" className="mt-1" variant="muted">
            {description}
          </Text>
        ) : null}
      </div>
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
      {getSelectedFiles(value).length > 0 ? (
        <div className={FILE_LIST_CLASSES}>
          <FileSelectionSummary value={value} />
        </div>
      ) : null}
    </div>
  );
}
