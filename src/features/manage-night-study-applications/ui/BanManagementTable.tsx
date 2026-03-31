import { useDebounce } from "@/shared/hooks/useDebounce";
import QueryBoundary from "@/shared/ui/query-boundary";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { useState } from "react";
import { BAN_TABLE_KEYS } from "../constants/ban-table-keys";
import BanSkeletonRows from "./BanSkeletonRows";
import BanStudentList from "./BanStudentList";
import { colors } from "@b1nd/dodam-design-system/colors";

const BanManagementTable = () => {
  const [keyword, setKeyword] = useState("");
  const query = useDebounce(keyword);

  return (
    <div className="flex items-start flex-col gap-3 overflow-hidden grow">
      <div className="flex items-center gap-3 h-12 bg-fill-primary rounded-small px-3">
        <MagnifyingGlass size={24} color={colors.text.placeholder} />
        <input
          className="flex-1 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
          placeholder="검색어를 입력하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto flex-1 w-full min-h-0 min-w-0 scrollbar">
        <div className="min-w-120">
          <QueryBoundary pendingFallback={<BanManagementTable.Skeleton />}>
            <BanStudentList keyword={query} />
          </QueryBoundary>
        </div>
      </div>
    </div>
  );
};

BanManagementTable.Skeleton = () => (
  <>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {BAN_TABLE_KEYS.map(([label, width], i) => (
            <th
              key={`${label}-${i}`}
              className="text-left px-3 text-text-secondary border-t border-border-normal"
              style={{
                height: 32,
                width: width === "FULL" ? undefined : width,
              }}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
    </table>
    <BanSkeletonRows count={8} />
  </>
);

export default BanManagementTable;
