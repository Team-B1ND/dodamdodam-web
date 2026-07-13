import { useGetNightStudyTotalQuery } from "@/entities/night-study/queries";
import type { NightStudyFloorTotal } from "@/entities/night-study/types";
import {Dropdown, Table, type TableKey} from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const TABLE_KEYS: TableKey[] = [
  ["층", "FULL"],
  ["일반 심자", "160px"],
  ["프로젝트 심자", "160px"],
];

const PERIOD_ITEMS = [
  { name: "심자 1", value: "1" },
  { name: "심자 2", value: "2" },
];

const getFloorCount = (floors: NightStudyFloorTotal[], floor: number) =>
  floors.find((item) => item.floor === floor)?.count;

const NightStudyTotalTable = () => {
  const { data } = useGetNightStudyTotalQuery();
  const [period, setPeriod] = useState<1 | 2>(1);
  const floor2Count = getFloorCount(data.data.floors, 2);
  const floor3Count = getFloorCount(data.data.floors, 3);
  const periodKey = period === 1 ? "period1" : "period2";

  const rows = [
    ["2층", `${floor2Count?.[periodKey].personal ?? 0}명`, `${floor2Count?.[periodKey].project ?? 0}명`],
    ["3층", `${floor3Count?.[periodKey].personal ?? 0}명`, `${floor3Count?.[periodKey].project ?? 0}명`],
    [
      "전체",
      `${data.data.total[periodKey].personal}명`,
      `${data.data.total[periodKey].project}명`,
    ],
  ];

  return (
    <div className="flex flex-col grow min-w-0 overflow-y-auto">
      <div className="flex justify-end mb-3 shrink-0">
        <Dropdown
          items={PERIOD_ITEMS}
          value={String(period)}
          onSelectedItemChange={(item) => setPeriod(Number(item.value) as 1 | 2)}
        />
      </div>
      <div className="overflow-x-auto min-w-0">
        <div className="min-w-140">
          <Table keys={TABLE_KEYS} data={rows} />
        </div>
      </div>
    </div>
  );
};

NightStudyTotalTable.Skeleton = () => (
  <div className="flex flex-col grow min-w-0 overflow-y-auto">
    <div className="overflow-x-auto min-w-0">
      <div className="min-w-140 space-y-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="skeleton h-12 w-full rounded-small" />
        ))}
      </div>
    </div>
  </div>
);

export default NightStudyTotalTable;
