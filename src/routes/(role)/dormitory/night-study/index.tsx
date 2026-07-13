import AttendanceTable from "@/features/manage-night-study-applications/ui/AttendanceTable";
import BanManagementTable from "@/features/manage-night-study-applications/ui/BanManagementTable";
import PersonalApplicationsTable from "@/features/manage-night-study-applications/ui/PersonalApplicationsTable";
import ProjectApplicationsTable from "@/features/manage-night-study-applications/ui/ProjectApplicationsTable";
import NightStudyTotalTable from "@/features/manage-night-study-applications/ui/NightStudyTotalTable";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(role)/dormitory/night-study/")({
  component: RouteComponent,
});

type MainTab = "personal" | "project" | "total" | "attendance" | "ban";

function RouteComponent() {
  const isMobile = useIsMobile();
  const [mainSegment, setMainSegment] = useState<SegmentedButtonData[]>([
    { text: "일반 심자", value: "personal", isActive: true },
    { text: "프로젝트", value: "project", isActive: false },
    { text: "인원 조회", value: "total", isActive: false },
    { text: "출석 체크", value: "attendance", isActive: false },
    { text: "심자정지", value: "ban", isActive: false },
  ]);
  const [mainTab, setMainTab] = useState<MainTab>("personal");

  return (
    <div className={`h-[98%] large-container flex flex-col gap-4 min-w-0 ${isMobile ? "" : "w-full"}`}>
      <SegmentedButton
        data={mainSegment}
        setData={setMainSegment}
        onBlockClick={(v) => setMainTab(v as MainTab)}
        width="30rem"
      />

      {mainTab === "personal" && (
        <QueryBoundary pendingFallback={<PersonalApplicationsTable.Skeleton />}>
          <PersonalApplicationsTable />
        </QueryBoundary>
      )}
      {mainTab === "project" && (
        <QueryBoundary pendingFallback={<ProjectApplicationsTable.Skeleton />}>
          <ProjectApplicationsTable />
        </QueryBoundary>
      )}
      {mainTab === "total" && (
        <QueryBoundary pendingFallback={<NightStudyTotalTable.Skeleton />}>
          <NightStudyTotalTable />
        </QueryBoundary>
      )}
      {mainTab === "attendance" && <AttendanceTable />}
      {mainTab === "ban" && <BanManagementTable />}
    </div>
  );
}
