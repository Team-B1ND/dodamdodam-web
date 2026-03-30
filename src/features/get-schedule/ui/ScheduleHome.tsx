import { colors } from "@b1nd/dodam-design-system/colors";
import { Calendar, ChevronRight } from "@b1nd/dodam-design-system/icons";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import useGetScheduleByDate from "../model/useGetScheduleByDate";

dayjs.locale("ko");

const ScheduleHome = () => {
  const { groupedSchedules } = useGetScheduleByDate();
  const entries = Object.entries(groupedSchedules);

  return (
    <aside className="w-full bg-background-surface rounded-large p-4 max-h-60 flex flex-col gap-4">
      <div className="w-full flex items-center">
        <Calendar color={colors.text.primary} size={24} />
        <p className="text-text-primary text-headline font-bold">일정</p>
        <div className="flex-1" />
        <Link to="/schedule">
          <ChevronRight color={colors.text.primary} size={16} pointer />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {entries.length === 0 ? (
          <p className="text-caption1 text-text-tertiary">일정이 없습니다.</p>
        ) : (
          entries.map(([date, schedules]) => (
            <div key={date}>
              <div className="flex items-end gap-1">
                <p className="text-heading2 font-extrabold">
                  {dayjs(date).format("D일")}
                </p>
                <p className="text-label text-text-tertiary">
                  {dayjs(date).format("dddd")}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                {schedules.map((item) => (
                  <div key={item.id} className="flex items-center gap-1.5">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: item.backgroundColor }}
                    />
                    <span className="text-caption1 text-text-secondary truncate">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

ScheduleHome.Skeleton = () => {
  return (
    <aside className="w-full bg-background-surface rounded-large p-4 max-h-60 flex flex-col gap-4">
      <div className="w-full flex items-center">
        <Calendar color={colors.text.primary} size={24} />
        <p className="text-text-primary text-headline font-bold">일정</p>
        <div className="flex-1" />
        <Link to="/schedule">
          <ChevronRight color={colors.text.primary} size={16} pointer />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx}>
            <div className="flex items-end gap-1">
              <div className="skeleton w-10 h-6 rounded-small" />
              <div className="skeleton w-10 h-4 rounded-small" />
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="skeleton w-[40%] h-4 rounded-small" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ScheduleHome;
