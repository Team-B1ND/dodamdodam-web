import BanManagementTable from "@/features/manage-night-study-applications/ui/BanManagementTable";
import PersonalApplicationsTable from "@/features/manage-night-study-applications/ui/PersonalApplicationsTable";
import ProjectApplicationsTable from "@/features/manage-night-study-applications/ui/ProjectApplicationsTable";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/dormitory/night-study/")({
  component: RouteComponent,
});

type MainTab = "personal" | "project" | "ban";

function RouteComponent() {
  const [mainSegment, setMainSegment] = useState<SegmentedButtonData[]>([
    { text: "일반 심자", value: "personal", isActive: true },
    { text: "프로젝트", value: "project", isActive: false },
    { text: "심자정지", value: "ban", isActive: false },
  ]);
  const [mainTab, setMainTab] = useState<MainTab>("personal");

  return (
    <div className="w-full h-full bg-background-surface rounded-large p-5 flex flex-col gap-4">
      <SegmentedButton
        data={mainSegment}
        setData={setMainSegment}
        onBlockClick={(v) => setMainTab(v as MainTab)}
      />

      {mainTab === "personal" && (
        <Suspense fallback={<PersonalApplicationsTable.Skeleton />}>
          <PersonalApplicationsTable />
        </Suspense>
      )}
      {mainTab === "project" && (
        <Suspense fallback={<ProjectApplicationsTable.Skeleton />}>
          <ProjectApplicationsTable />
        </Suspense>
      )}
      {mainTab === "ban" && <BanManagementTable />}
    </div>
  );
}
