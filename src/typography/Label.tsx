import type { ComponentPropsWithoutRef, ElementType } from "react";
import { mergeClasses } from "@utils/mergeClasses";

type LabelElement = "label" | "legend";

export type LabelProps<T extends LabelElement = "label"> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const BASE_LABEL_CLASSES = "text-sm font-medium text-text";

export function Label<T extends LabelElement = "label">({
  as,
  className,
  ...props
}: LabelProps<T>) {
  const Component = (as ?? "label") as ElementType;

  return <Component className={mergeClasses(BASE_LABEL_CLASSES, className)} {...props} />;
}
