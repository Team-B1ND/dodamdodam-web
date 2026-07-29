import { useGetTeamsQuery } from "@/entities/team/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const TeamList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetTeamsQuery();
  const teams = data.pages.flatMap((page) => page.data.content);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="large-container w-full flex-1 flex flex-col gap-4">
      <h1 className="text-headline font-bold">팀 목록</h1>
      {teams.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-5">
          {teams.map((team) => (
            <article
              key={team.publicId}
              className="min-w-0 flex flex-col gap-2"
            >
              {team.imageUrl ? (
                <img
                  src={team.imageUrl}
                  alt={`${team.name} 팀 이미지`}
                  className="w-full aspect-square rounded-large object-cover"
                />
              ) : (
                <div className="w-full aspect-square rounded-large bg-fill-primary" />
              )}
              <div className="px-1">
                <h2 className="text-headline font-bold">{team.name}</h2>
                <p className="truncate text-body1">{team.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-text-tertiary">팀이 없어요.</p>
      )}
      <div ref={ref} />
    </section>
  );
};

TeamList.Skeleton = () => {
  return (
    <section className="large-container w-full flex-1 flex flex-col gap-4">
      <div className="w-20 h-7 rounded-extrasmall skeleton" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="w-full aspect-square rounded-large skeleton" />
            <div className="w-16 h-6 rounded-extrasmall skeleton" />
            <div className="w-full h-5 rounded-extrasmall skeleton" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamList;
