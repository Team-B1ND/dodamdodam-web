import { useGetPersonalNightStudyQuery } from "@/entities/night-study/queries";
import type { NightStudyStatus } from "@/entities/night-study/types";
import NightStudyItem from "./NightStudyItem";

interface Props {
  status: NightStudyStatus;
}

const PersonalNightStudyList = ({ status }: Props) => {
  const { data } = useGetPersonalNightStudyQuery(status as NightStudyStatus);
  const nightStudies = data.pages.flatMap((page) => page.data.content);

  return (
    <div className="w-full flex flex-col gap-2.5">
      {nightStudies.length ? (
        nightStudies.map((nightStudy) => (
          <NightStudyItem data={nightStudy} key={nightStudy.id} />
        ))
      ) : (
        <p className="py-8 text-center text-border-normal">심자 신청 내역이 없어요.</p>
      )}
    </div>
  );
};

PersonalNightStudyList.Skeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <NightStudyItem.Skeleton key={idx} />
      ))}
    </div>
  );
};

export default PersonalNightStudyList;
