import type { ScheduleEvent } from "@/entities/schedule/types";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

interface Props {
  groupedSchedules: Record<string, ScheduleEvent[]>;
}

const ScheduleList = ({ groupedSchedules }: Props) => {
  const entries = Object.entries(groupedSchedules);

  return (
    <aside className="w-full md:w-80 bg-background-surface rounded-large p-4 max-h-52 flex flex-col">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {entries.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-caption1 text-text-tertiary">
            일정이 없어요.
          </div>
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

ScheduleList.Skeleton = () => {
  return (
    <aside className="w-full md:w-80 bg-background-surface rounded-large p-4 max-h-52 flex flex-col">
      <div className="flex flex-col gap-3">
        <div className="w-24 h-7 rounded-extrasmall skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
      </div>
    </aside>
  );
};

export default ScheduleList;
