import useMyInfoWakeupSong from "../../../../hooks/myInfo/useMyInfoWakeupSong";
import MyInfoWakeupSongItem from "./myInfoWakeupSongItem/myInfoWakeupSongItem";
import { MyInfoWakeupSongContainer } from "./style";

const MyInfoWakeupSong = () => {
  const { notApprovedWakeupSongs, isLoading } = useMyInfoWakeupSong();

  return (
    <MyInfoWakeupSongContainer>
      {!isLoading && notApprovedWakeupSongs && (
        <>
          {notApprovedWakeupSongs.map((wakeupSong) => (
            <MyInfoWakeupSongItem
              wakeupSongData={wakeupSong}
              key={wakeupSong.idx}
            />
          ))}
        </>
      )}
    </MyInfoWakeupSongContainer>
  );
};

export default MyInfoWakeupSong;
