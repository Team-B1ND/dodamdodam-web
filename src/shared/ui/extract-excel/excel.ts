import * as ExcelJS from "exceljs";
import type {
  CreateExcelWorkbookOptions,
  DownloadExcelFileOptions,
  ExcelCellValue,
  ExcelColumn,
  ExcelRowData,
  ExcelSheet,
  ExcelStyleOptions,
} from "./types";

const DEFAULT_SHEET_NAME = "Sheet1";
const EXCEL_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const DEFAULT_STYLE: Required<ExcelStyleOptions> = {
  headerFillColor: "EBEBEB",
  borderColor: "FF000000",
  minColumnWidth: 10,
  maxColumnWidth: 50,
};

const getCellValue = <Row extends ExcelRowData>(
  row: Row,
  column: ExcelColumn<Row>,
): ExcelCellValue => {
  if (column.value) {
    return column.value(row);
  }

  if (column.key) {
    return row[column.key];
  }

  return row[column.header];
};

const resolveColumns = <Row extends ExcelRowData>(
  data: Row[],
  columns?: ExcelColumn<Row>[],
): ExcelColumn<Row>[] => {
  if (columns && columns.length > 0) {
    return columns;
  }

  const firstRow = data[0];

  if (!firstRow) {
    return [];
  }

  return Object.keys(firstRow).map((key) => ({
    header: key,
    key,
  }));
};

const applyBorder = (
  cell: ExcelJS.Cell,
  borderColor: string,
) => {
  cell.border = {
    top: { style: "thin", color: { argb: borderColor } },
    left: { style: "thin", color: { argb: borderColor } },
    bottom: { style: "thin", color: { argb: borderColor } },
    right: { style: "thin", color: { argb: borderColor } },
  };
};

const normalizeWorksheetName = (name: string, fallback: string) => {
  const trimmedName = name.trim();
  const safeName = (trimmedName || fallback).replace(/[\\/?*[\]:]/g, " ");

  return safeName.slice(0, 31);
};

const getUniqueWorksheetName = (workbook: ExcelJS.Workbook, name: string) => {
  let suffix = 1;
  let worksheetName = name;

  while (workbook.worksheets.some((worksheet) => worksheet.name === worksheetName)) {
    suffix += 1;

    const suffixText = ` ${suffix}`;
    worksheetName = `${name.slice(0, 31 - suffixText.length)}${suffixText}`;
  }

  return worksheetName;
};

const appendStyledWorksheet = <Row extends ExcelRowData>(
  workbook: ExcelJS.Workbook,
  sheet: ExcelSheet<Row>,
  styleOptions?: ExcelStyleOptions,
) => {
  const style = { ...DEFAULT_STYLE, ...styleOptions };
  const worksheetName = getUniqueWorksheetName(
    workbook,
    normalizeWorksheetName(sheet.name, DEFAULT_SHEET_NAME),
  );
  const worksheet = workbook.addWorksheet(worksheetName);
  const columns = resolveColumns(sheet.data, sheet.columns);

  if (columns.length === 0) {
    return worksheet;
  }

  worksheet.addRow(columns.map((column) => column.header));

  sheet.data.forEach((row) => {
    worksheet.addRow(columns.map((column) => getCellValue(row, column) ?? ""));
  });

  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: style.headerFillColor },
    };
    cell.font = {
      bold: true,
      size: 12,
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    applyBorder(cell, style.borderColor);
  });

  for (let rowIndex = 2; rowIndex <= sheet.data.length + 1; rowIndex += 1) {
    const row = worksheet.getRow(rowIndex);

    for (let colIndex = 1; colIndex <= columns.length; colIndex += 1) {
      const cell = row.getCell(colIndex);

      applyBorder(cell, style.borderColor);
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }
  }

  worksheet.columns.forEach((column, index) => {
    const excelColumn = columns[index];

    if (!excelColumn) {
      return;
    }

    const maxValueLength = sheet.data.reduce((maxLength, row) => {
      const valueLength = String(getCellValue(row, excelColumn) ?? "").length;

      return Math.max(maxLength, valueLength);
    }, excelColumn.header.length);

    column.width =
      excelColumn.width ??
      Math.min(
        Math.max(maxValueLength + 2, style.minColumnWidth),
        style.maxColumnWidth,
      );
  });

  return worksheet;
};

const getGradeFromStudentNumber = (row: ExcelRowData) => {
  const studentNumber = String(row["학번"] ?? "");

  return studentNumber.charAt(0) || "미분류";
};

const getDefaultGradeGroupName = (row: ExcelRowData) => {
  const grade = getGradeFromStudentNumber(row);

  return grade === "3" ? "2" : grade;
};

const getDefaultGradeSheetName = (groupName: string) => {
  if (groupName === "1") {
    return "1학년";
  }

  if (groupName === "2") {
    return "2, 3학년";
  }

  return "학년 미확인";
};

const groupRows = <Row extends ExcelRowData>(
  rows: Row[],
  groupBy: (row: Row) => string,
) => {
  return rows.reduce<Record<string, Row[]>>((groups, row) => {
    const groupName = groupBy(row);

    groups[groupName] = [...(groups[groupName] ?? []), row];

    return groups;
  }, {});
};

export const createExcelWorkbook = <Row extends ExcelRowData>({
  sheets,
  style,
}: CreateExcelWorkbookOptions<Row>) => {
  const workbook = new ExcelJS.Workbook();

  sheets.forEach((sheet) => {
    appendStyledWorksheet(workbook, sheet, style);
  });

  return workbook;
};

export const createExcelSheets = <Row extends ExcelRowData>({
  data,
  sheetName = DEFAULT_SHEET_NAME,
  columns,
  separateByGrade = false,
  groupBy,
  getSheetName,
}: Omit<DownloadExcelFileOptions<Row>, "fileName" | "style">): ExcelSheet<Row>[] => {
  if (!separateByGrade && !groupBy) {
    return [{ name: sheetName, data, columns }];
  }

  const rowsByGroup = groupRows(
    data,
    groupBy ?? ((row) => getDefaultGradeGroupName(row)),
  );
  const resolveSheetName = getSheetName ?? getDefaultGradeSheetName;

  return Object.keys(rowsByGroup)
    .sort()
    .map((groupName) => ({
      name: resolveSheetName(groupName),
      data: rowsByGroup[groupName] ?? [],
      columns,
    }));
};

export const downloadWorkbook = async (
  workbook: ExcelJS.Workbook,
  fileName: string,
) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: EXCEL_MIME_TYPE,
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();

  window.URL.revokeObjectURL(url);
};

export const downloadExcelFile = async <Row extends ExcelRowData>({
  data,
  fileName,
  sheetName,
  columns,
  separateByGrade,
  groupBy,
  getSheetName,
  style,
}: DownloadExcelFileOptions<Row>) => {
  if (data.length === 0) {
    throw new Error("다운로드할 데이터가 없습니다.");
  }

  const sheets = createExcelSheets({
    data,
    sheetName,
    columns,
    separateByGrade,
    groupBy,
    getSheetName,
  });

  if (sheets.length === 0) {
    throw new Error("엑셀 시트를 생성할 데이터가 없습니다.");
  }

  const workbook = createExcelWorkbook({
    sheets,
    style,
  });

  await downloadWorkbook(workbook, fileName);
};
