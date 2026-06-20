import { Input as HeadlessInput } from "@headlessui/react";
import { X } from "lucide-react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { mergeClasses } from "@utils/mergeClasses";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "prefix"
> & {
  className?: string;
  clearable?: boolean;
  onClear?: () => void;
  prefix?: ReactNode;
  postfix?: ReactNode;
};

const BASE_INPUT_CLASSES =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-colors duration-150 placeholder:text-textMuted focus:border-focus focus:outline-none focus:ring-[3px] focus:ring-focus/25 disabled:cursor-not-allowed disabled:bg-surfaceMuted disabled:opacity-50";

const CLEARABLE_INPUT_CLASSES = "pr-9";

const FIELD_CLASSES =
  "flex w-full items-center gap-2.5 rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-colors duration-150 focus-within:border-focus focus-within:ring-[3px] focus-within:ring-focus/25";

const FIELD_DISABLED_CLASSES = "cursor-not-allowed bg-surfaceMuted opacity-50";

const BARE_INPUT_CLASSES =
  "min-w-0 flex-1 bg-transparent text-text placeholder:text-textMuted focus:outline-none disabled:cursor-not-allowed";

const AFFIX_CLASSES = "flex shrink-0 items-center text-textSubtle";

const CLEAR_BUTTON_CLASSES =
  "absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-sm p-0.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 disabled:pointer-events-none";

const INLINE_CLEAR_BUTTON_CLASSES =
  "inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 disabled:pointer-events-none";

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
  postfix,
  prefix,
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

  const clearButton = showClearButton ? (
    <button
      aria-label="Clear"
      className={CLEAR_BUTTON_CLASSES}
      disabled={disabled}
      onClick={handleClear}
      type="button"
    >
      <X aria-hidden className="size-4" />
    </button>
  ) : null;

  const hasAffix = prefix != null || postfix != null;

  if (!hasAffix) {
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
        {clearButton}
      </div>
    );
  }

  return (
    <div
      className={mergeClasses(
        FIELD_CLASSES,
        disabled ? FIELD_DISABLED_CLASSES : undefined,
        className,
      )}
    >
      {prefix != null ? <span className={AFFIX_CLASSES}>{prefix}</span> : null}
      <HeadlessInput
        className={BARE_INPUT_CLASSES}
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      />
      {showClearButton ? (
        <button
          aria-label="Clear"
          className={INLINE_CLEAR_BUTTON_CLASSES}
          disabled={disabled}
          onClick={handleClear}
          type="button"
        >
          <X aria-hidden className="size-4" />
        </button>
      ) : null}
      {postfix != null ? <span className={AFFIX_CLASSES}>{postfix}</span> : null}
    </div>
  );
}
