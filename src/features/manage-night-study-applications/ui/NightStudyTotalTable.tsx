import { useGetNightStudyTotalQuery } from "@/entities/night-study/queries";
import type {
  NightStudyGenderCount,
  NightStudyTotal,
  NightStudyFloorTotal,
  NightStudyGradeTotal,
} from "@/entities/night-study/types";
import { Dropdown, Table, type TableKey } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const FLOOR_TABLE_KEYS: TableKey[] = [
  ["층", "FULL"],
  ["남", "160px"],
  ["녀", "160px"],
  ["총인원", "160px"],
];

const PERIOD_ITEMS = [
  { name: "심자 1", value: "1" },
  { name: "심자 2", value: "2" },
];

type Group = "floor" | "grade";

const GROUP_ITEMS = [
  { name: "층별", value: "floor" },
  { name: "학년별", value: "grade" },
];

const GRADE_TABLE_KEYS: TableKey[] = [
  ["학년", "FULL"],
  ["남", "160px"],
  ["녀", "160px"],
  ["총인원", "160px"],
];

type PeriodKey = "period1" | "period2";

const combineCounts = (
  personal?: NightStudyGenderCount,
  project?: NightStudyGenderCount,
): NightStudyGenderCount => ({
  male: (personal?.male ?? 0) + (project?.male ?? 0),
  female: (personal?.female ?? 0) + (project?.female ?? 0),
});

const getFloorCount = (data: NightStudyTotal, period: PeriodKey, floor: number) =>
  combineCounts(
    data.personal[period].floors.find((item) => item.floor === floor),
    data.project[period].floors.find((item) => item.floor === floor),
  );

const getGradeCount = (data: NightStudyTotal, period: PeriodKey, grade: number) =>
  combineCounts(
    data.personal[period].grades.find((item) => item.grade === grade),
    data.project[period].grades.find((item) => item.grade === grade),
  );

const sumCounts = (items: (NightStudyFloorTotal | NightStudyGradeTotal)[]) =>
  items.reduce(
    (total, item) => combineCounts(total, item),
    { male: 0, female: 0 },
  );

const getTotalCount = (data: NightStudyTotal, period: PeriodKey, group: "floors" | "grades") =>
  sumCounts([...data.personal[period][group], ...data.project[period][group]]);

const createRow = (label: string, count: NightStudyGenderCount) => {
  const { male, female } = count;

  return [label, `${male}명`, `${female}명`, `${male + female}명`];
};

const NightStudyTotalTable = () => {
  const { data } = useGetNightStudyTotalQuery();
  const [period, setPeriod] = useState<1 | 2>(1);
  const [group, setGroup] = useState<Group>("floor");
  const periodKey: PeriodKey = period === 1 ? "period1" : "period2";
  const floors = Array.from(
    new Set([
      ...data.data.personal[periodKey].floors.map(({ floor }) => floor),
      ...data.data.project[periodKey].floors.map(({ floor }) => floor),
    ]),
  ).sort((a, b) => a - b);
  const grades = Array.from(
    new Set([
      ...data.data.personal[periodKey].grades.map(({ grade }) => grade),
      ...data.data.project[periodKey].grades.map(({ grade }) => grade),
    ]),
  ).sort((a, b) => a - b);

  const rows =
    group === "floor"
      ? [
          ...floors.map((floor) =>
            createRow(`${floor}층`, getFloorCount(data.data, periodKey, floor)),
          ),
          createRow("전체", getTotalCount(data.data, periodKey, "floors")),
        ]
      : [
          ...grades.map((grade) =>
            createRow(`${grade}학년`, getGradeCount(data.data, periodKey, grade)),
          ),
          createRow("전체", getTotalCount(data.data, periodKey, "grades")),
        ];

  return (
    <div className="flex flex-col grow min-w-0 overflow-y-auto">
      <div className="flex justify-end gap-2 mb-3 shrink-0">
        <Dropdown
          items={GROUP_ITEMS}
          value={group}
          onSelectedItemChange={(item) => setGroup(item.value as Group)}
        />
        <Dropdown
          items={PERIOD_ITEMS}
          value={String(period)}
          onSelectedItemChange={(item) => setPeriod(Number(item.value) as 1 | 2)}
        />
      </div>
      <div className="overflow-x-auto min-w-0">
        <div className="min-w-140">
          <Table
            keys={group === "grade" ? GRADE_TABLE_KEYS : FLOOR_TABLE_KEYS}
            data={rows}
          />
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
