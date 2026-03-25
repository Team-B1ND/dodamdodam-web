import type { NightStudyStatus } from "@/entities/night-study/types";
import PersonalNightStudyForm from "@/features/manage-night-study/ui/PersonalNightStudyForm";
import PersonalNightStudyList from "@/features/manage-night-study/ui/PersonalNightStudyList";
import ProjectNightStudyForm from "@/features/manage-night-study/ui/ProjectNightStudyForm";
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
  const [statusSegment, setStatusSegment] = useState<SegmentedButtonData[]>([
    {
      text: "대기중",
      value: "PENDING",
      isActive: true,
    },
    {
      text: "승인됨",
      value: "ALLOWED",
      isActive: false,
    },
    {
      text: "거절됨",
      value: "REJECTED",
      isActive: false,
    },
  ]);
  const [status, setStatus] = useState("PENDING");
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
        <div className="w-full flex flex-col gap-2.5">
          <SegmentedButton
            data={statusSegment}
            setData={setStatusSegment}
            width="100%"
            onBlockClick={setStatus}
          />
          <div className="w-full overflow-y-scroll">
            {page === "personal" ? (
              <Suspense fallback={<PersonalNightStudyList.Skeleton />}>
                <PersonalNightStudyList status={status as NightStudyStatus} />
              </Suspense>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
