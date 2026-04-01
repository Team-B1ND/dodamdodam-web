import ScheduleCalendar from "@/features/get-schedule/ui/ScheduleCalendar";
import ScheduleList from "@/features/get-schedule/ui/ScheduleList";
import useGetScheduleByDate from "@/features/get-schedule/model/useGetScheduleByDate";

const Schedule = () => {
  const {
    currentMonth,
    monthLabel,
    scheduleEvents,
    groupedSchedules,
    isFetching,
    isMonthTransitionPending,
    moveMonth,
  } = useGetScheduleByDate();

  return (
    <div
      className={`w-full flex flex-col md:flex-row gap-8 items-start transition-opacity ${
        isFetching || isMonthTransitionPending ? "opacity-50" : "opacity-100"
      }`}
    >
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
    <div className="flex max-md:flex-col gap-4">
      <div className="large-container w-full flex flex-col gap-4">
        <div className="w-40 h-8 rounded-extrasmall skeleton" />
        <div className="w-full h-140 rounded-small skeleton" />
      </div>
      <div className="large-container w-80 max-md:w-full flex flex-col gap-3">
        <div className="w-24 h-7 rounded-extrasmall skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
        <div className="w-full h-20 rounded-small skeleton" />
      </div>
    </div>
  );
};

export default Schedule;
