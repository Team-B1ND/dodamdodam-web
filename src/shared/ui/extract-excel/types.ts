import type * as ExcelJS from "exceljs";

export type ExcelCellValue = string | number | boolean | Date | null | undefined;

export type ExcelRowData = Record<string, ExcelCellValue>;

export interface ExcelColumn<Row extends ExcelRowData = ExcelRowData> {
  header: string;
  key?: keyof Row & string;
  value?: (row: Row) => ExcelCellValue;
  width?: number;
}

export interface ExcelSheet<Row extends ExcelRowData = ExcelRowData> {
  name: string;
  data: Row[];
  columns?: ExcelColumn<Row>[];
}

export interface ExcelStyleOptions {
  headerFillColor?: string;
  borderColor?: string;
  minColumnWidth?: number;
  maxColumnWidth?: number;
}

export interface CreateExcelWorkbookOptions<Row extends ExcelRowData = ExcelRowData> {
  sheets: ExcelSheet<Row>[];
  style?: ExcelStyleOptions;
}

export interface DownloadExcelFileOptions<Row extends ExcelRowData = ExcelRowData> {
  data: Row[];
  fileName: string;
  sheetName?: string;
  columns?: ExcelColumn<Row>[];
  separateByGrade?: boolean;
  groupBy?: (row: Row) => string;
  getSheetName?: (groupName: string) => string;
  style?: ExcelStyleOptions;
}

export type ExcelWorkbook = ExcelJS.Workbook;
