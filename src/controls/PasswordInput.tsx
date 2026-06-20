import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";
import type { MouseEvent } from "react";

import { Input, type InputProps } from "./Input";

export type PasswordInputProps = Omit<InputProps, "type" | "prefix" | "postfix">;

const TOGGLE_BUTTON_CLASSES =
  "inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 disabled:pointer-events-none";

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

  const toggle = (
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
  );

  return (
    <Input
      {...props}
      className={className}
      disabled={disabled}
      id={inputId}
      name={name}
      onChange={onChange}
      postfix={toggle}
      type={visible ? "text" : "password"}
      value={value}
    />
  );
}
