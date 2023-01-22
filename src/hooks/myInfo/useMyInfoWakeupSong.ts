import { useEffect, useState } from "react";
import { useGetMyWakeupSongs } from "../../queries/wakeupSong/wakeupSong.query";
import { WakeupSong } from "../../types/wakeupSong/wakeupSong.type";

const useMyInfoWakeupSong = () => {
  const { data: myAppliedWakeupSongsData, isLoading } = useGetMyWakeupSongs({
    staleTime: 10000,
    cacheTime: 1000 * 60 * 10,
  });

  const [notApprovedWakeupSongs, setNotApprovedWakeupSongs] = useState<
    WakeupSong[]
  >([]);

  useEffect(() => {
    if (myAppliedWakeupSongsData) {
      setNotApprovedWakeupSongs(
        myAppliedWakeupSongsData.data.filter(
          (wakeupSong) => wakeupSong.status === "PENDING"
        )
      );
    }
  }, [myAppliedWakeupSongsData]);

  return { notApprovedWakeupSongs, isLoading };
};

export default useMyInfoWakeupSong;
