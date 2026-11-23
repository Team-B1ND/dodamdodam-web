import { useGetMeQuery } from "@/entities/user/queries";
import AttendanceCheckTable from "@/features/manage-weekend-study-applications/ui/AttendanceCheckTable";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(role)/weekend-manager/weekend-study/")({
  component: RouteComponent,
});

type Tab = "attendance";

const TABS: SegmentedButtonData[] = [
  { text: "출석 체크", value: "attendance", isActive: true },
];

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
        />
      </div>
      {tab === "attendance" && <AttendanceCheckTable />}
    </div>
  );
}
