import { Field, Label, Switch as HeadlessSwitch } from "@headlessui/react";
import type { ButtonHTMLAttributes } from "react";

import { mergeClasses } from "@utils/mergeClasses";

type SwitchAccessibilityProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "aria-label" | "aria-labelledby" | "aria-describedby"
>;

export type SwitchProps = SwitchAccessibilityProps & {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onChange?: (checked: boolean) => void;
};

const WRAPPER_CLASSES = "inline-flex items-center gap-2";

const SWITCH_CLASSES =
  "group inline-flex h-6 w-11 items-center rounded-full bg-surfaceMuted p-1 transition-colors duration-150 data-[checked]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

const HANDLE_CLASSES =
  "size-4 rounded-full bg-surface shadow-sm transition-transform duration-150 group-data-[checked]:translate-x-5";

const LABEL_CLASSES = "text-sm text-text";

export function Switch({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  checked,
  className,
  disabled,
  id,
  label,
  name,
  onChange,
}: SwitchProps) {
  return (
    <Field className={mergeClasses(WRAPPER_CLASSES, className)}>
      <HeadlessSwitch
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={checked}
        className={SWITCH_CLASSES}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
      >
        <span aria-hidden="true" className={HANDLE_CLASSES} />
      </HeadlessSwitch>
      {label ? <Label className={LABEL_CLASSES}>{label}</Label> : null}
    </Field>
  );
}
