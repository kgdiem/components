import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { mergeClasses } from "../utils/mergeClasses";

type StackedListProps = ComponentPropsWithoutRef<"ul">;

export const StackedList = forwardRef<HTMLUListElement, StackedListProps>(function StackedList(
  { className, ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      role="list"
      className={mergeClasses("divide-y divide-gray-100 dark:divide-white/5", className)}
      {...props}
    />
  );
});

type StackedListItemProps = ComponentPropsWithoutRef<"li">;

export const StackedListItem = forwardRef<HTMLLIElement, StackedListItemProps>(function StackedListItem(
  { className, ...props },
  ref,
) {
  return <li ref={ref} className={mergeClasses("py-5", className)} {...props} />;
});
