import { useGetMyTeamsQuery } from "@/entities/team/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import MyTeamListItem from "./MyTeamListItem";

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
        teams.map((team) => <MyTeamListItem key={team.publicId} team={team} />)
      ) : (
        <p className="py-4 text-center text-body1 text-text-tertiary">
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
