import { Input as HeadlessInput } from "@headlessui/react";
import { X } from "lucide-react";
import type { ChangeEvent, InputHTMLAttributes, MouseEvent } from "react";
import { mergeClasses } from "@utils/mergeClasses";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
  clearable?: boolean;
  onClear?: () => void;
};

const BASE_INPUT_CLASSES =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text shadow-sm transition-colors duration-150 placeholder:text-textMuted focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/25 disabled:cursor-not-allowed disabled:opacity-50";

const CLEARABLE_INPUT_CLASSES = "pr-9";

const CLEAR_BUTTON_CLASSES =
  "absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-sm p-0.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 disabled:pointer-events-none";

function hasInputValue(value: InputHTMLAttributes<HTMLInputElement>["value"]): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  return String(value).length > 0;
}

export function Input({
  className,
  clearable = false,
  disabled,
  name,
  onChange,
  onClear,
  value,
  ...props
}: InputProps) {
  const showClearButton = clearable && hasInputValue(value) && !disabled;

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onClear?.();

    if (onChange) {
      onChange({
        target: { name, value: "" },
        currentTarget: { name, value: "" },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  const input = (
    <HeadlessInput
      className={mergeClasses(
        BASE_INPUT_CLASSES,
        clearable ? CLEARABLE_INPUT_CLASSES : undefined,
        className,
      )}
      disabled={disabled}
      name={name}
      onChange={onChange}
      value={value}
      {...props}
    />
  );

  if (!clearable) {
    return input;
  }

  return (
    <div className="relative">
      {input}
      {showClearButton ? (
        <button
          aria-label="Clear"
          className={CLEAR_BUTTON_CLASSES}
          disabled={disabled}
          onClick={handleClear}
          type="button"
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
