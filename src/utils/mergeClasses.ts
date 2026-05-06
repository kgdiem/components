export const mergeClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");
