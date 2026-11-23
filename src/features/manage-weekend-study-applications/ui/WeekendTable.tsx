import type { ReactNode } from "react";

export interface WeekendTableColumn {
  label: ReactNode;
  /** CSS width. 비우면 남은 공간을 채워요. */
  width?: string;
  align?: "left" | "right" | "center";
}

export interface WeekendTableRow {
  key: string;
  cells: ReactNode[];
  className?: string;
  onClick?: () => void;
}

interface Props {
  columns: WeekendTableColumn[];
  rows: WeekendTableRow[];
  rowHeight?: number;
  minWidth?: string;
  emptyText?: string;
}

const ALIGN_CLASS = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

/**
 * DS Table은 행 단위 스타일(출결 색상 등)을 지정할 수 없어서,
 * 같은 헤더·셀 스타일을 유지한 채 행 className을 받을 수 있게 만든 테이블이에요.
 */
const WeekendTable = ({
  columns,
  rows,
  rowHeight = 48,
  minWidth = "40rem",
  emptyText = "신청 내역이 없어요.",
}: Props) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse" style={{ minWidth }}>
      <thead>
        <tr className="border-b border-border-normal">
          {columns.map((column, idx) => (
            <th
              key={idx}
              className={`h-11 px-3 text-label font-bold text-text-secondary whitespace-nowrap ${ALIGN_CLASS[column.align ?? "left"]}`}
              style={{ width: column.width }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.key}
            className={`${row.className ?? ""} ${row.onClick ? "cursor-pointer hover:bg-fill-primary" : ""}`}
            onClick={row.onClick}
            style={{ height: rowHeight }}
          >
            {row.cells.map((cell, idx) => (
              <td
                key={idx}
                className={`px-3 text-body1 whitespace-nowrap ${ALIGN_CLASS[columns[idx]?.align ?? "left"]}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {rows.length === 0 && (
      <p className="py-12 text-center text-body1 text-text-tertiary">
        {emptyText}
      </p>
    )}
  </div>
);

WeekendTable.Skeleton = ({
  columns,
  count = 6,
  rowHeight = 48,
}: {
  columns: WeekendTableColumn[];
  count?: number;
  rowHeight?: number;
}) => (
  <div className="w-full flex flex-col">
    <div className="h-11 border-b border-border-normal" />
    {Array.from({ length: count }).map((_, idx) => (
      <div
        key={idx}
        className="flex items-center gap-6 px-3"
        style={{ height: rowHeight }}
      >
        {columns.map((_, cIdx) => (
          <div key={cIdx} className="skeleton h-4 flex-1 rounded-small" />
        ))}
      </div>
    ))}
  </div>
);

export default WeekendTable;
