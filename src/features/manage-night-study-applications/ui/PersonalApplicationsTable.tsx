import type { ApplicationTableFilters, NightStudyStatus } from "@/entities/night-study/types";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Dropdown } from "@b1nd/dodam-design-system/components";
import { MagnifyingGlass } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Suspense, useState } from "react";
import {
  GRADE_FILTER_ITEMS,
  ROOM_FILTER_ITEMS,
  STATUS_FILTER_ITEMS,
} from "../constants/application-filter-items";
import { PERSONAL_TABLE_KEYS } from "../constants/personal-table-keys";
import PersonalSkeletonRows from "./PersonalSkeletonRows";
import PersonalTableData from "./PersonalTableData";

const PersonalApplicationsTable = () => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<NightStudyStatus | undefined>(undefined);
  const [grade, setGrade] = useState<number | undefined>(undefined);
  const [room, setRoom] = useState<number | undefined>(undefined);

  const debouncedKeyword = useDebounce(keyword);

  const filters: ApplicationTableFilters = {
    keyword: debouncedKeyword || undefined,
    status,
    grade,
    room,
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden grow">
      <div className="flex flex-wrap flex-row items-center justify-between shrink-0 gap-3 max-md:flex-col max-md:items-start">
        <div className="flex items-center gap-3 h-12 bg-fill-primary rounded-small px-3">
          <MagnifyingGlass size={24} color={colors.text.placeholder} />
          <input
            className="flex-1 bg-transparent outline-none text-headline text-text-primary placeholder:text-text-placeholder"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Dropdown
            items={STATUS_FILTER_ITEMS}
            value={status ?? ""}
            onSelectedItemChange={(item) =>
              setStatus(item.value === "" ? undefined : item.value as NightStudyStatus)
            }
          />
          <Dropdown
            items={GRADE_FILTER_ITEMS}
            value={grade !== undefined ? String(grade) : ""}
            onSelectedItemChange={(item) =>
              setGrade(item.value === "" ? undefined : Number(item.value))
            }
          />
          <Dropdown
            items={ROOM_FILTER_ITEMS}
            value={room !== undefined ? String(room) : ""}
            onSelectedItemChange={(item) =>
              setRoom(item.value === "" ? undefined : Number(item.value))
            }
          />
        </div>
      </div>

      <Suspense fallback={<PersonalSkeletonRows count={8} />}>
        <PersonalTableData key={`${debouncedKeyword}-${status}-${grade}-${room}`} {...filters} />
      </Suspense>
    </div>
  );
};


PersonalApplicationsTable.Skeleton = () => (
  <div className="flex flex-col gap-3 overflow-y-auto grow items-start">
    <div className="flex items-center justify-between w-full shrink-0 gap-3">
      <div className="flex items-center gap-3 h-12 bg-fill-primary rounded-small px-3 w-100">
        <MagnifyingGlass size={24} color={colors.text.placeholder} />
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="skeleton h-12 w-28 rounded-medium" />
        <div className="skeleton h-12 w-28 rounded-medium" />
        <div className="skeleton h-12 w-28 rounded-medium" />
      </div>
    </div>
    <div className="overflow-x-auto w-full">
      <div className="min-w-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="text-left px-3 text-text-secondary border-t border-border-normal"
                style={{ height: 32, width: "40px" }}
              />
              {PERSONAL_TABLE_KEYS.map(([label, width], i) => (
                <th
                  key={`${String(label)}-${i}`}
                  className="text-left px-3 text-text-secondary border-t border-border-normal"
                  style={{ height: 32, width: width === "FULL" ? undefined : width }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <PersonalSkeletonRows count={8} />
      </div>
    </div>
  </div>
);

export default PersonalApplicationsTable;
