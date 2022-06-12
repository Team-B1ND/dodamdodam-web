import { FcHeadset } from "react-icons/fc";
import useTodayWakeupSong from "../../../hooks/todayWakeupSong/useTodayWakeupSong";
import dataCheck from "../../../util/data/check/dataCheck";
import CardTitle from "../../common/cardTitle/cardTitle";
import { TodayWakeupSongContainer } from "./style";

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
        <div>있음</div>
      )}
    </TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
