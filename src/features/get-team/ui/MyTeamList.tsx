import { useGetMyTeamsQuery } from "@/entities/team/queries";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MyTeamList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyTeamsQuery();
  const teams = data.pages.flatMap((page) => page.data.content);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="small-container flex flex-col gap-4">
      <h1 className="text-headline font-bold">소속된 팀</h1>
      {teams.length ? (
        teams.map((team) => (
          <div key={team.publicId} className="flex items-center gap-4">
            <span className="text-headline font-medium">{team.name}</span>
            <div className="flex-1" />
            <FilledButton
              role="negative"
              size="small"
              display="inline"
              disabled
            >
              탈퇴
            </FilledButton>
          </div>
        ))
      ) : (
        <p className="py-4 text-center text-text-tertiary">
          소속된 팀이 없어요.
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};

MyTeamList.Skeleton = () => {
  return (
    <div className="small-container flex flex-col gap-4">
      <div className="w-24 h-7 rounded-extrasmall skeleton" />
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-10 flex items-center justify-between">
          <div className="w-16 h-6 rounded-extrasmall skeleton" />
          <div className="w-14 h-10 rounded-small skeleton" />
        </div>
      ))}
    </div>
  );
};

export default MyTeamList;
