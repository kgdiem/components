import { Text } from "../typography/Text";
import { mergeClasses } from "@utils/mergeClasses";

import {
  type FileControlValue,
  formatFileSelection,
  formatFileSelectionTooltip,
  getSelectedFiles,
} from "./fileControlUtils";

export type FileSelectionSummaryProps = {
  className?: string;
  value?: FileControlValue;
};

const DETAILS_CLASSES = "text-sm text-textMuted";

const SUMMARY_CLASSES =
  "cursor-pointer list-none marker:hidden [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1";

const FILE_LIST_CLASSES = "mt-1 flex flex-col gap-0.5 pl-0";

export function FileSelectionSummary({ className, value }: FileSelectionSummaryProps) {
  const files = getSelectedFiles(value);

  if (files.length === 0) {
    return null;
  }

  if (files.length === 1) {
    return (
      <Text as="span" className={className} variant="muted">
        {files[0].name}
      </Text>
    );
  }

  return (
    <details className={mergeClasses(DETAILS_CLASSES, className)}>
      <summary
        className={SUMMARY_CLASSES}
        title={formatFileSelectionTooltip(files)}
      >
        {formatFileSelection(value)}
      </summary>
      <ul className={FILE_LIST_CLASSES}>
        {files.map((file) => (
          <li key={`${file.name}-${file.lastModified}`}>
            <Text as="span" variant="muted">
              {file.name}
            </Text>
          </li>
        ))}
      </ul>
    </details>
  );
}
