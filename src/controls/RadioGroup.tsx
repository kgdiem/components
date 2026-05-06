import {
  Field,
  Label,
  Radio,
  RadioGroup as HeadlessRadioGroup,
} from "@headlessui/react";

import { mergeClasses } from "../utils/mergeClasses";

export type RadioGroupOption = {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
};

export type RadioGroupProps = {
  className?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  options: RadioGroupOption[];
  value?: string;
};

const GROUP_CLASSES = "flex flex-col gap-2";

const FIELD_CLASSES =
  "flex cursor-pointer items-start gap-2 rounded-md border border-border bg-surface p-2 text-text transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

const RADIO_CLASSES =
  "mt-0.5 flex size-4 items-center justify-center rounded-full border border-border bg-white transition-colors duration-150 data-[checked]:border-primary data-[checked]:bg-primary";

const RADIO_DOT_CLASSES = "size-2 rounded-full bg-white";

const LABEL_CLASSES = "text-sm";
const DESCRIPTION_CLASSES = "text-xs text-textMuted";

export function RadioGroup({
  className,
  disabled,
  name,
  onChange,
  options,
  value,
}: RadioGroupProps) {
  return (
    <HeadlessRadioGroup
      className={mergeClasses(GROUP_CLASSES, className)}
      disabled={disabled}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <Field key={option.value} className={FIELD_CLASSES} disabled={option.disabled}>
          <Radio value={option.value} className={RADIO_CLASSES}>
            <span aria-hidden="true" className={RADIO_DOT_CLASSES} />
          </Radio>
          <div className="flex flex-col gap-0.5">
            <Label className={LABEL_CLASSES}>{option.label}</Label>
            {option.description ? (
              <span className={DESCRIPTION_CLASSES}>{option.description}</span>
            ) : null}
          </div>
        </Field>
      ))}
    </HeadlessRadioGroup>
  );
}
