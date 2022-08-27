import { useEffect, useState } from "react";
import { useGetTodayWakeupSong } from "../../querys/wakeupSong/wakeupSong.query";
import { WakeupSong } from "../../types/wakeupSong/wakeupSong.type";
import dateTransform from "../../util/transform/dateTransform";

const useTodayWakeupSong = () => {
  const todayDate = dateTransform.hyphen().split("-");
  const todayAllowWakeupSongsData = useGetTodayWakeupSong(
    {
      year: todayDate[0],
      month: todayDate[1],
      date: todayDate[2],
    },
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }
  ).data?.data.allow;

  const [todayAllowWakeupSongs, setTodayAllowWakeupSongs] = useState<
    WakeupSong[]
  >([]);

  useEffect(() => {
    if (todayAllowWakeupSongsData) {
      setTodayAllowWakeupSongs(todayAllowWakeupSongsData);
    }
  }, [todayAllowWakeupSongsData]);

  return { todayAllowWakeupSongs };
};

export default useTodayWakeupSong;
