import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { useGetMyWakeupSongs } from "../../querys/wakeupSong/wakeupSong.query";
import { profileAtom } from "../../store/profile/profileStore";

const useMyInfoWakeupSong = () => {
  const profileData = useRecoilValue(profileAtom);

  const { data, isLoading } = useGetMyWakeupSongs(
    { userId: profileData.id },
    { staleTime: 10000, cacheTime: 1000 * 60 * 10 }
  );

  const notApprovedWakeupSongs = useMemo(() => {
    return data?.data.videos.filter((wakeupSong) => wakeupSong.isAllow === 0);
  }, [data]);

  return { notApprovedWakeupSongs, isLoading };
};

export default useMyInfoWakeupSong;
