import { useGetTodayWakeupSong } from "../../querys/wakeupSong/wakeupSong.query";
import dateTransform from "../../util/date/dateTransform";

const useTodayWakeupSong = () => {
  const todayDate = dateTransform.hyphen().split("-");
  const { data } = useGetTodayWakeupSong({
    year: todayDate[0],
    month: todayDate[1],
    date: todayDate[2],
  });

  return { data };
};

export default useTodayWakeupSong;
