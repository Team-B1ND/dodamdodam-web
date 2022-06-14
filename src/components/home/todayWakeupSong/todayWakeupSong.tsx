import { FcHeadset } from "react-icons/fc";
import useTodayWakeupSong from "../../../hooks/todayWakeupSong/useTodayWakeupSong";
import dataCheck from "../../../util/data/check/dataCheck";
import CardTitle from "../../common/cardTitle/cardTitle";
import { TodayWakeupSongContainer, TodayWakeupSongItemWrap } from "./style";
import TodayWakeupSongItem from "./todayWakeupSongItem/todayWakeupSongItem";

const TodayWakeupSong = () => {
  const { todayAllowWakeupSongs } = useTodayWakeupSong();

  return (
    <TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={<FcHeadset />}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
      {dataCheck.voidCheck(todayAllowWakeupSongs) ? (
        <>승인된 기상송이 없습니다.</>
      ) : (
        <TodayWakeupSongItemWrap>
          {todayAllowWakeupSongs.slice(0, 2).map((wakeupSong) => (
            <TodayWakeupSongItem wakeupSongData={wakeupSong} />
          ))}
        </TodayWakeupSongItemWrap>
      )}
    </TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
