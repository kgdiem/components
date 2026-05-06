import { Input as HeadlessInput } from "@headlessui/react";
import type { InputHTMLAttributes } from "react";
import { mergeClasses } from "../utils/mergeClasses";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
};

const BASE_INPUT_CLASSES =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text shadow-sm transition-colors duration-150 placeholder:text-textMuted focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/25 disabled:cursor-not-allowed disabled:opacity-50";

export function Input({ className, ...props }: InputProps) {
  return <HeadlessInput className={mergeClasses(BASE_INPUT_CLASSES, className)} {...props} />;
}
