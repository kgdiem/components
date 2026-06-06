import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import type { MouseEvent } from "react";

import { Input, type InputProps } from "./Input";
import { mergeClasses } from "@utils/mergeClasses";

export type PasswordInputProps = Omit<InputProps, "type">;

const TOGGLE_BUTTON_CLASSES =
  "absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-sm p-0.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 disabled:pointer-events-none";

export function PasswordInput({
  className,
  disabled,
  id,
  name,
  onChange,
  value,
  ...props
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisible((current) => !current);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        className={mergeClasses("pr-9", className)}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={onChange}
        type={visible ? "text" : "password"}
        value={value}
      />
      <button
        aria-controls={inputId}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className={TOGGLE_BUTTON_CLASSES}
        disabled={disabled}
        onClick={handleToggle}
        type="button"
      >
        {visible ? (
          <EyeOff aria-hidden className="size-4" />
        ) : (
          <Eye aria-hidden className="size-4" />
        )}
      </button>
    </div>
  );
}
