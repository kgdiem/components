import {
  Textarea as HeadlessTextarea,
} from "@headlessui/react";
import type { TextareaHTMLAttributes } from "react";
import { mergeClasses } from "../utils/mergeClasses";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  className?: string;
};

const BASE_TEXTAREA_CLASSES =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-text transition-colors duration-150 placeholder:text-textMuted focus:border-focus focus:outline-none focus:ring-[3px] focus:ring-focus/25 disabled:cursor-not-allowed disabled:bg-surfaceMuted disabled:opacity-50";

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <HeadlessTextarea className={mergeClasses(BASE_TEXTAREA_CLASSES, className)} {...props} />
  );
}
