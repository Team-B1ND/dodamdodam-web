import { useGetProjectNightStudyQuery } from "@/entities/night-study/queries";
import NightStudyItem from "./NightStudyItem";

const ProjectNightStudyList = () => {
  const { data } = useGetProjectNightStudyQuery();

  return (
    <div className="w-full flex flex-col gap-2.5">
      {data.data.length ? (
        data.data.map((nightStudy) => (
          <NightStudyItem
            data={nightStudy}
            key={nightStudy.id}
            projectNightStudy
          />
        ))
      ) : (
        <p className="py-8 text-center text-border-normal">
          심자 신청 내역이 없어요.
        </p>
      )}
    </div>
  );
};

ProjectNightStudyList.Skeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {Array.from({ length: 2 }).map((_, idx) => (
        <NightStudyItem.Skeleton key={idx} />
      ))}
    </div>
  );
};

export default ProjectNightStudyList;
