import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { ChevronDown } from "lucide-react";

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
  prefix?: ReactNode;
  value?: string;
};

const BUTTON_CLASSES =
  "flex w-full items-center gap-2.5 rounded-md border border-border bg-surface px-4 py-3 text-left text-sm text-text transition-colors duration-150 focus:border-focus focus:outline-none focus:ring-[3px] focus:ring-focus/25 disabled:cursor-not-allowed disabled:bg-surfaceMuted disabled:opacity-50";

const PREFIX_CLASSES = "flex shrink-0 items-center text-textSubtle";

const OPTIONS_CLASSES =
  "mt-1 w-[var(--button-width)] rounded-md border border-border bg-surfaceRaised p-1 shadow-lg focus:outline-none";

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
  prefix,
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
        {prefix != null ? <span className={PREFIX_CLASSES}>{prefix}</span> : null}
        <span className="min-w-0 flex-1 truncate">
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown aria-hidden className="size-4 shrink-0" />
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
