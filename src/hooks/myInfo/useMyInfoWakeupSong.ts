import { useMemo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import WakeupSongRepository from "../../repository/wakeupSong/wakeupSong.repository";
import { profileAtom } from "../../store/profile/profileStore";

const useMyInfoWakeupSong = () => {
  const profileData = useRecoilValue(profileAtom);

  const { data, isLoading } = useQuery("wakeupSong/getMyWakeupSongs", () =>
    WakeupSongRepository.getMyWakeupSongs({ userId: profileData.id })
  );

  const notApprovedWakeupSongs = useMemo(() => {
    return data?.data.videos.filter((wakeupSong) => wakeupSong.isAllow === 0);
  }, [data]);

  return { notApprovedWakeupSongs, isLoading };
};

export default useMyInfoWakeupSong;
