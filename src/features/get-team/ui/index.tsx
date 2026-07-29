import QueryBoundary from "@/shared/ui/query-boundary";
import {
  FilledButton,
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import MyTeamList from "./MyTeamList";
import TeamInviteList from "./TeamInviteList";
import TeamList from "./TeamList";

const Team = () => {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    { text: "소속", value: "my", isActive: true },
    { text: "초대", value: "invite", isActive: false },
  ]);
  const [tab, setTab] = useState("my");

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <QueryBoundary pendingFallback={<TeamList.Skeleton />}>
        <TeamList />
      </QueryBoundary>
      <aside className="w-full lg:w-80 flex flex-col gap-4">
        <SegmentedButton
          data={segment}
          setData={setSegment}
          onBlockClick={setTab}
          width="100%"
        />
        {tab === "my" ? (
          <>
            <QueryBoundary pendingFallback={<MyTeamList.Skeleton />}>
              <MyTeamList />
            </QueryBoundary>
            <FilledButton
              role="primary"
              size="medium"
              display="fill"
              onClick={() => navigate({ to: "/team/create" })}
            >
              팀 만들기
            </FilledButton>
          </>
        ) : (
          <QueryBoundary pendingFallback={<TeamInviteList.Skeleton />}>
            <TeamInviteList />
          </QueryBoundary>
        )}
      </aside>
    </div>
  );
};

export default Team;
