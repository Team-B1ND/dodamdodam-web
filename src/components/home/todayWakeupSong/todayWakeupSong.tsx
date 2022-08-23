import useTodayWakeupSong from "../../../hooks/todayWakeupSong/useTodayWakeupSong";
import dataCheck from "../../../util/data/check/dataCheck";
import CardTitle from "../../common/cardTitle/cardTitle";
import {
  TodayWakeupSongContainer,
  TodayWakeupSongItemWrap,
  TodayWakeupSongVoidText,
} from "./style";
import TodayWakeupSongItem from "./todayWakeupSongItem/todayWakeupSongItem";
import { FcHeadset } from "@react-icons/all-files/fc/FcHeadset";

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
        <TodayWakeupSongVoidText>
          승인된 기상송이 없습니다.
        </TodayWakeupSongVoidText>
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
