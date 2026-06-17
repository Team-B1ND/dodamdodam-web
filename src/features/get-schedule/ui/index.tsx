import ScheduleCalendar from "@/features/get-schedule/ui/ScheduleCalendar";
import ScheduleList from "@/features/get-schedule/ui/ScheduleList";
import useGetScheduleByDate from "@/features/get-schedule/model/useGetScheduleByDate";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import AddScheduleDialog from "./AddScheduleDialog";
import { useState } from "react";

const Schedule = () => {
  const { data: me } = useGetMe();
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const {
    currentMonth,
    monthLabel,
    scheduleEvents,
    groupedSchedules,
    isFetching,
    isMonthTransitionPending,
    moveMonth,
  } = useGetScheduleByDate();

  const isLoading = isFetching || isMonthTransitionPending;
  const isManager = me.roles.includes("TEACHER") || me.roles.includes("ADMIN");

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      <div
        className={`w-full transition-opacity ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <ScheduleCalendar
          currentMonth={currentMonth}
          monthLabel={monthLabel}
          scheduleEvents={scheduleEvents}
          moveMonth={moveMonth}
        />
      </div>
      {isLoading ? (
        <ScheduleList.Skeleton />
      ) : (
        <aside className="flex flex-col gap-4 w-full md:w-80">
          <ScheduleList groupedSchedules={groupedSchedules} />
          {isManager && (
            <>
              {!isAddPanelOpen && (
                <FilledButton
                  role="primary"
                  size="medium"
                  display="fill"
                  onClick={() => setIsAddPanelOpen(true)}
                >
                  일정 추가
                </FilledButton>
              )}
              <AddScheduleDialog
                isOpen={isAddPanelOpen}
                onClose={() => setIsAddPanelOpen(false)}
              />
            </>
          )}
        </aside>
      )}
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
      <ScheduleList.Skeleton />
    </div>
  );
};

export default Schedule;
