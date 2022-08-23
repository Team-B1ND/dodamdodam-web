import { useGetMyMember } from "../../querys/member/member.query";
import { useEffect, useState } from "react";
import { useGetMyWakeupSongs } from "../../querys/wakeupSong/wakeupSong.query";
import { WakeupSong } from "../../types/wakeupSong/wakeupSong.type";

const useMyInfoWakeupSong = () => {
  const myMemberData = useGetMyMember().data?.data;

  const { data: myAppliedWakeupSongsData, isLoading } = useGetMyWakeupSongs(
    { userId: String(myMemberData?.id) },
    { staleTime: 10000, cacheTime: 1000 * 60 * 10 }
  );

  const [notApprovedWakeupSongs, setNotApprovedWakeupSongs] = useState<
    WakeupSong[]
  >([]);

  useEffect(() => {
    if (myAppliedWakeupSongsData) {
      setNotApprovedWakeupSongs(
        myAppliedWakeupSongsData.data.videos.filter(
          (wakeupSong) => wakeupSong.isAllow === 0
        )
      );
    }
  }, [myAppliedWakeupSongsData]);

  return { notApprovedWakeupSongs, isLoading };
};

export default useMyInfoWakeupSong;
