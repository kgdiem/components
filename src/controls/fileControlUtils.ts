export type FileControlValue = File | File[] | null;

export function filesFromFileList(fileList: FileList | null, multiple: boolean): FileControlValue {
  if (!fileList || fileList.length === 0) {
    return multiple ? [] : null;
  }

  if (multiple) {
    return Array.from(fileList);
  }

  return fileList[0] ?? null;
}

export function appendFiles(
  current: FileControlValue,
  incoming: FileList | null,
): File[] {
  const nextFiles = filesFromFileList(incoming, true);

  if (!Array.isArray(nextFiles)) {
    return Array.isArray(current) ? current : [];
  }

  const existing = Array.isArray(current) ? current : [];

  return [...existing, ...nextFiles];
}

export function formatFileSelection(value: FileControlValue | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "";
    }

    if (value.length === 1) {
      return value[0].name;
    }

    return `${value.length} files selected`;
  }

  return value.name;
}

export function fileSelectionCount(value: FileControlValue | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }

  if (Array.isArray(value)) {
    return value.length;
  }

  return 1;
}

export function getSelectedFiles(value: FileControlValue | undefined): File[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export function formatFileSelectionTooltip(files: File[]): string {
  return files.map((file) => file.name).join(", ");
}
