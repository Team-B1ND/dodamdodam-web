import { useGetTodaySchedule } from "../../queries/schedule/schedule.query";
import { useEffect, useState } from "react";
import { Schedule } from "../../types/schedule/schedule.type";

const useTodaySchedule = () => {
  const { data, isLoading } = useGetTodaySchedule();

  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    if (!isLoading && data) {
      const todayScheduleData = data.data;

      setTodaySchedules(todayScheduleData);
    }
  }, [data, isLoading]);

  return { todaySchedules };
};

export default useTodaySchedule;
