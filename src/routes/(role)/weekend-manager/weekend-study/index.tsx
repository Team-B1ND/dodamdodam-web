import { useGetMeQuery } from "@/entities/user/queries";
import AttendanceRecordTable from "@/features/manage-weekend-study-applications/ui/AttendanceRecordTable";
import AttendanceCheckTable from "@/features/manage-weekend-study-applications/ui/AttendanceCheckTable";
import HeadcountTable from "@/features/manage-weekend-study-applications/ui/HeadcountTable";
import RoomManagement from "@/features/manage-weekend-study-applications/ui/RoomManagement";
import ProjectRentalTable from "@/features/manage-weekend-study-applications/ui/ProjectRentalTable";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(role)/weekend-manager/weekend-study/")({
  component: RouteComponent,
});

type Tab = "attendance" | "rental" | "headcount" | "room" | "record";

const TABS: SegmentedButtonData[] = [
  { text: "출석 체크", value: "attendance", isActive: true },
  { text: "실 대여", value: "rental", isActive: false },
  { text: "인원 조회", value: "headcount", isActive: false },
  { text: "실 관리", value: "room", isActive: false },
  { text: "출석 기록", value: "record", isActive: false },
];

/**
 * 탭이 5개라 좁은 화면에서 칸이 줄어들면 글자가 두 줄로 꺾여요.
 * 글자는 한 줄로 고정하고 최소 너비를 둬서, 그보다 좁으면 감싼 영역에서 가로로 스크롤돼요.
 */
const TAB_CONTAINER_STYLE = { minWidth: "30rem" };
const TAB_ITEM_STYLE = { whiteSpace: "nowrap" as const };

function RouteComponent() {
  const { data: meData, isPending, isError } = useGetMeQuery();
  const [tabs, setTabs] = useState(TABS);
  const [tab, setTab] = useState<Tab>("attendance");

  if (isPending) {
    return <div className="large-container h-16 skeleton" />;
  }

  if (isError || !meData?.data.roles.includes("WEEKEND_MANAGER")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="large-container w-full min-w-0 flex flex-col gap-4">
      <div className="w-full max-w-140 overflow-x-auto">
        <SegmentedButton
          data={tabs}
          setData={setTabs}
          onBlockClick={(value) => setTab(value as Tab)}
          width="100%"
          containerCustomStyle={TAB_CONTAINER_STYLE}
          itemCustomStyle={TAB_ITEM_STYLE}
        />
      </div>
      {tab === "attendance" && <AttendanceCheckTable />}
      {tab === "rental" && <ProjectRentalTable />}
      {tab === "headcount" && <HeadcountTable />}
      {tab === "room" && <RoomManagement />}
      {tab === "record" && <AttendanceRecordTable />}
    </div>
  );
}
