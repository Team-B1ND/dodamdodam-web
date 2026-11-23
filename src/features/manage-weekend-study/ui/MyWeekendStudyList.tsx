import {
  useGetMyPersonalWeekendStudyQuery,
  useGetMyProjectWeekendStudyQuery,
} from "@/entities/weekend-study/queries";
import type {
  PersonalWeekendStudy,
  ProjectWeekendStudy,
} from "@/entities/weekend-study/types";
import WeekendStudyItem from "./WeekendStudyItem";

const List = ({
  items,
}: {
  items: (PersonalWeekendStudy | ProjectWeekendStudy)[];
}) => (
  <div className="w-full flex flex-col gap-2.5">
    {items.length ? (
      items.map((item) => <WeekendStudyItem key={item.id} data={item} />)
    ) : (
      <p className="py-8 text-center text-border-normal">
        주말 자습 신청 내역이 없어요.
      </p>
    )}
  </div>
);

export const MyPersonalWeekendStudyList = () => {
  const { data } = useGetMyPersonalWeekendStudyQuery();
  return <List items={data.data} />;
};

export const MyProjectWeekendStudyList = () => {
  const { data } = useGetMyProjectWeekendStudyQuery();
  return <List items={data.data} />;
};

export const MyWeekendStudyListSkeleton = () => (
  <div className="w-full flex flex-col gap-2.5">
    {Array.from({ length: 2 }).map((_, idx) => (
      <WeekendStudyItem.Skeleton key={idx} />
    ))}
  </div>
);
