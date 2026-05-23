import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import type { ButtonHTMLAttributes } from "react";

import { mergeClasses } from "@utils/mergeClasses";

type SelectAccessibilityProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "aria-label" | "aria-labelledby" | "aria-describedby"
>;

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = SelectAccessibilityProps & {
  className?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
};

const BUTTON_CLASSES =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-left text-sm text-text shadow-sm transition-colors duration-150 focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/25 disabled:cursor-not-allowed disabled:opacity-50";

const OPTIONS_CLASSES =
  "mt-1 w-[var(--button-width)] rounded-md border border-border bg-surface p-1 shadow-lg focus:outline-none";

const OPTION_CLASSES =
  "cursor-pointer rounded-sm px-2 py-1.5 text-sm text-text transition-colors duration-100 data-[focus]:bg-surfaceMuted data-[selected]:bg-primarySubtle data-[selected]:text-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export function Select({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  disabled,
  id,
  name,
  onChange,
  options,
  placeholder = "Select an option",
  value,
}: SelectProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Listbox disabled={disabled} name={name} value={value} onChange={onChange}>
      <ListboxButton
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={mergeClasses(BUTTON_CLASSES, className)}
        id={id}
      >
        {selectedOption?.label ?? placeholder}
      </ListboxButton>
      <ListboxOptions anchor="bottom start" className={OPTIONS_CLASSES}>
        {options.map((option) => (
          <ListboxOption
            key={option.value}
            disabled={option.disabled}
            value={option.value}
            className={OPTION_CLASSES}
          >
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
