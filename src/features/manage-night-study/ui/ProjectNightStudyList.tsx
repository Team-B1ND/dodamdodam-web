import { useGetProjectNightStudyQuery } from "@/entities/night-study/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NightStudyItem from "./NightStudyItem";

const ProjectNightStudyList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProjectNightStudyQuery();
  const nightStudies = data.pages.flatMap((page) => page.data.content);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      {nightStudies.length ? (
        nightStudies.map((nightStudy) => (
          <NightStudyItem data={nightStudy} key={nightStudy.id} projectNightStudy />
        ))
      ) : (
        <p className="py-8 text-center text-border-normal">심자 신청 내역이 없어요.</p>
      )}
      <div ref={ref} />
    </div>
  );
};

ProjectNightStudyList.Skeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <NightStudyItem.Skeleton key={idx} />
      ))}
    </div>
  );
};

export default ProjectNightStudyList;
