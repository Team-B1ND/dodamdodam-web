import { useGetTodayScheduleQuery } from "../../queries/schedule/schedule.query";
import { useEffect, useState } from "react";
import { Schedule } from "../../types/schedule/schedule.type";

const useTodaySchedule = () => {
  const { data: serverTodayScheduleData, isLoading } =
    useGetTodayScheduleQuery();

  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    if (!isLoading && serverTodayScheduleData) {
      const todayScheduleData = serverTodayScheduleData.data;

      setTodaySchedules(todayScheduleData);
    }
  }, [serverTodayScheduleData, isLoading]);

  return { todaySchedules };
};

export default useTodaySchedule;
