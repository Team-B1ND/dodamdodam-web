import PersonalWeekendStudyForm from "@/features/manage-weekend-study/ui/PersonalWeekendStudyForm";
import ProjectWeekendStudyForm from "@/features/manage-weekend-study/ui/ProjectWeekendStudyForm";
import {
  MyPersonalWeekendStudyList,
  MyProjectWeekendStudyList,
  MyWeekendStudyListSkeleton,
} from "@/features/manage-weekend-study/ui/MyWeekendStudyList";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/weekend-study/")({
  component: RouteComponent,
});

type Page = "personal" | "project";

function RouteComponent() {
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    { text: "개별 자습", value: "personal", isActive: true },
    { text: "실 대여", value: "project", isActive: false },
  ]);
  const [page, setPage] = useState<Page>("personal");

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-start">
      <div className="flex-1 min-w-0 w-full min-h-125 bg-background-surface rounded-large p-5 flex flex-col gap-4">
        <SegmentedButton
          data={segment}
          setData={setSegment}
          onBlockClick={(value) => setPage(value as Page)}
          width="15rem"
        />
        {page === "personal" ? (
          <PersonalWeekendStudyForm />
        ) : (
          <ProjectWeekendStudyForm />
        )}
      </div>
      <div className="w-full lg:w-80 shrink-0 px-5 py-4 bg-background-surface rounded-large flex flex-col gap-4">
        <h1 className="text-headline font-bold">
          {page === "personal" ? "My 주말 자습 신청" : "My 주말 실 대여 신청"}
        </h1>
        <QueryBoundary pendingFallback={<MyWeekendStudyListSkeleton />}>
          {page === "personal" ? (
            <MyPersonalWeekendStudyList />
          ) : (
            <MyProjectWeekendStudyList />
          )}
        </QueryBoundary>
      </div>
    </div>
  );
}
