import { useGetMyWakeupSongsQuery } from "../../../../../queries/wakeupSong/wakeupSong.query";
import dataCheck from "../../../../../util/check/dataCheck";
import MyInfoItemVoid from "../../MyInfoItemVoid";
import MyInfoWakeupSongItem from "../MyInfoWakeupSongItem";

const MyInfoWakeupSongList = () => {
  const { data: serverMyWakeupSongData } = useGetMyWakeupSongsQuery({
    suspense: true,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
  });

  return (
    <>
      {serverMyWakeupSongData &&
      dataCheck.voidCheck(serverMyWakeupSongData.data) ? (
        <MyInfoItemVoid
          title="기상송 신청내역이 없습니다."
          subTitle="신청하시면 생활이 윤택해질 거에요!"
        />
      ) : (
        <>
          {serverMyWakeupSongData?.data
            .filter((wakeupSong) => wakeupSong.status === "PENDING")
            .map((wakeupSong) => (
              <MyInfoWakeupSongItem
                wakeupSongData={wakeupSong}
                key={wakeupSong.id}
              />
            ))}
        </>
      )}
    </>
  );
};

export default MyInfoWakeupSongList;
