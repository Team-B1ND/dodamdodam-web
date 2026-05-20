import { downloadExcelFile } from "./excel";
import type { DownloadExcelFileOptions, ExcelRowData } from "./types";
import type { ReactNode } from "react";

interface ExtractExcelDataProps<Row extends ExcelRowData = ExcelRowData>
  extends DownloadExcelFileOptions<Row> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onError?: (error: unknown) => void;
}

const ExtractExcelData = <Row extends ExcelRowData = ExcelRowData>({
  children = "다운로드",
  className,
  disabled = false,
  onError,
  ...downloadOptions
}: ExtractExcelDataProps<Row>) => {
  const handleDownload = async () => {
    try {
      await downloadExcelFile(downloadOptions);
    } catch (error) {
      onError?.(error);
      alert(error instanceof Error ? error.message : "Excel 파일 생성에 실패했습니다.");
    }
  };

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={handleDownload}
    >
      {children}
    </button>
  );
};

export {
  createExcelSheets,
  createExcelWorkbook,
  downloadExcelFile,
  downloadWorkbook,
} from "./excel";
export type {
  CreateExcelWorkbookOptions,
  DownloadExcelFileOptions,
  ExcelCellValue,
  ExcelColumn,
  ExcelRowData,
  ExcelSheet,
  ExcelStyleOptions,
  ExcelWorkbook,
} from "./types";

export default ExtractExcelData;
