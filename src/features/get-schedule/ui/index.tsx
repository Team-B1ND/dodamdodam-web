import ScheduleCalendar from "@/features/get-schedule/ui/ScheduleCalendar";
import ScheduleList from "@/features/get-schedule/ui/ScheduleList";
import useGetScheduleByDate from "@/features/get-schedule/model/useGetScheduleByDate";

const Schedule = () => {
  const {
    currentMonth,
    monthLabel,
    scheduleEvents,
    groupedSchedules,
    moveMonth,
  } = useGetScheduleByDate();

  return (
    <div className="w-full flex flex-col xl:flex-row gap-4 items-start">
      <ScheduleCalendar
        currentMonth={currentMonth}
        monthLabel={monthLabel}
        scheduleEvents={scheduleEvents}
        moveMonth={moveMonth}
      />
      <ScheduleList groupedSchedules={groupedSchedules} />
    </div>
  );
};

Schedule.Skeleton = () => {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-4">
      <div className="large-container flex-1 flex flex-col gap-4">
        <div className="w-40 h-8 rounded-extrasmall skeleton" />
        <div className="w-full h-96 rounded-small skeleton" />
      </div>
      <div className="large-container w-full xl:w-88 flex flex-col gap-3">
        <div className="w-24 h-7 rounded-extrasmall skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
      </div>
    </div>
  );
};

export default Schedule;
