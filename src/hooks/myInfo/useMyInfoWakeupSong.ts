import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useGetMyWakeupSongs } from "../../querys/wakeupSong/wakeupSong.query";
import { profileAtom } from "../../store/profile/profileStore";
import { WakeupSong } from "../../types/wakeupSong/wakeupSong.type";

const useMyInfoWakeupSong = () => {
  const profileData = useRecoilValue(profileAtom);

  const { data: myAppliedWakeupSongsData, isLoading } = useGetMyWakeupSongs(
    { userId: profileData.id },
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
