import {
  Combobox as HeadlessCombobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import type { InputHTMLAttributes } from "react";
import { useMemo, useState } from "react";

import { mergeClasses } from "@utils/mergeClasses";

type ComboboxAccessibilityProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "aria-label" | "aria-labelledby" | "aria-describedby"
>;

export type ComboboxOptionItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ComboboxProps = ComboboxAccessibilityProps & {
  className?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string | null) => void;
  options: ComboboxOptionItem[];
  placeholder?: string;
  value?: string | null;
};

const INPUT_CLASSES =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-colors duration-150 placeholder:text-textMuted focus:border-focus focus:outline-none focus:ring-[3px] focus:ring-focus/25 disabled:cursor-not-allowed disabled:bg-surfaceMuted disabled:opacity-50";

const OPTIONS_CLASSES =
  "mt-1 w-[var(--input-width)] rounded-md border border-border bg-surfaceRaised p-1 shadow-lg empty:invisible focus:outline-none";

const OPTION_CLASSES =
  "cursor-pointer rounded-sm px-2 py-1.5 text-sm text-text transition-colors duration-100 data-[focus]:bg-surfaceMuted data-[selected]:bg-primarySubtle data-[selected]:text-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export function Combobox({
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
}: ComboboxProps) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  return (
    <HeadlessCombobox
      disabled={disabled}
      immediate
      name={name}
      value={value}
      onChange={onChange}
      onClose={() => setQuery("")}
    >
      <ComboboxInput
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={mergeClasses(INPUT_CLASSES, className)}
        id={id}
        displayValue={(selectedValue: string) =>
          options.find((option) => option.value === selectedValue)?.label ?? ""
        }
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ComboboxOptions anchor="bottom start" className={OPTIONS_CLASSES}>
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.value}
            disabled={option.disabled}
            value={option.value}
            className={OPTION_CLASSES}
          >
            {option.label}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
}
