import useMyInfoWakeupSong from "../../../../hooks/myInfo/useMyInfoWakeupSong";
import dataCheck from "../../../../util/data/check/dataCheck";
import MyInfoItemVoid from "../myInfoItemVoid/myInfoItemVoid";
import MyInfoWakeupSongItem from "./myInfoWakeupSongItem/myInfoWakeupSongItem";
import { MyInfoWakeupSongContainer } from "./style";

const MyInfoWakeupSong = () => {
  const { notApprovedWakeupSongs, isLoading } = useMyInfoWakeupSong();

  return (
    <MyInfoWakeupSongContainer>
      {!isLoading && notApprovedWakeupSongs && (
        <>
          {dataCheck.voidCheck(notApprovedWakeupSongs) ? (
            <MyInfoItemVoid
              title="신청내역이 없습니다."
              subTitle="신청하시면 생활이 윤택해질 거에요!"
            />
          ) : (
            <>
              {notApprovedWakeupSongs.map((wakeupSong) => (
                <MyInfoWakeupSongItem
                  wakeupSongData={wakeupSong}
                  key={wakeupSong.idx}
                />
              ))}
            </>
          )}
        </>
      )}
    </MyInfoWakeupSongContainer>
  );
};

export default MyInfoWakeupSong;
