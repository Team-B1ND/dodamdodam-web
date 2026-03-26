import PersonalNightStudyForm from "@/features/manage-night-study/ui/PersonalNightStudyForm";
import PersonalNightStudyList from "@/features/manage-night-study/ui/PersonalNightStudyList";
import ProjectNightStudyForm from "@/features/manage-night-study/ui/ProjectNightStudyForm";
import ProjectNightStudyList from "@/features/manage-night-study/ui/ProjectNightStudyList";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";

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
    <div className="w-full h-full flex gap-8 items-start">
      <div className="flex-1 bg-background-surface rounded-large p-5 flex flex-col gap-4">
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
      <div className="w-90 p-5 bg-background-surface rounded-large flex flex-col gap-4 items-start max-h-full">
        <h1 className="text-headline font-bold">
          My {page === "personal" ? "개인" : "프로젝트"} 심자 신청
        </h1>
        <div className="w-full overflow-y-scroll">
          {page === "personal" ? (
            <Suspense fallback={<PersonalNightStudyList.Skeleton />}>
              <PersonalNightStudyList />
            </Suspense>
          ) : (
            <Suspense fallback={<ProjectNightStudyList.Skeleton />}>
              <ProjectNightStudyList />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
