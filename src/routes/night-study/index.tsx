import BanStatus from "@/features/manage-night-study/ui/BanStatus";
import PersonalNightStudyForm from "@/features/manage-night-study/ui/PersonalNightStudyForm";
import PersonalNightStudyList from "@/features/manage-night-study/ui/PersonalNightStudyList";
import ProjectNightStudyForm from "@/features/manage-night-study/ui/ProjectNightStudyForm";
import ProjectNightStudyList from "@/features/manage-night-study/ui/ProjectNightStudyList";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/night-study/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    {
      text: "개인",
      value: "personal",
      isActive: true,
    },
    {
      text: "프로젝트",
      value: "project",
      isActive: false,
    },
  ]);
  const [page, setPage] = useState("personal");

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-1 w-full bg-background-surface rounded-large p-5 flex flex-col gap-4">
        <SegmentedButton
          data={segment}
          setData={setSegment}
          onBlockClick={setPage}
        />
        {page === "personal" ? (
          <PersonalNightStudyForm />
        ) : (
          <ProjectNightStudyForm />
        )}
      </div>
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <QueryBoundary pendingFallback={null}>
          <BanStatus />
        </QueryBoundary>
        <div className="w-full p-5 bg-background-surface rounded-large flex flex-col gap-4 items-start">
          <h1 className="text-headline font-bold">
            My {page === "personal" ? "개인" : "프로젝트"} 심자 신청
          </h1>
          <div className="w-full overflow-y-scroll">
            {page === "personal" ? (
              <QueryBoundary pendingFallback={<PersonalNightStudyList.Skeleton />}>
                <PersonalNightStudyList />
              </QueryBoundary>
            ) : (
              <QueryBoundary pendingFallback={<ProjectNightStudyList.Skeleton />}>
                <ProjectNightStudyList />
              </QueryBoundary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
