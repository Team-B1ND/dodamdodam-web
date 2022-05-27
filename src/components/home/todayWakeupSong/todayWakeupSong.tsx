import { FcHeadset } from "react-icons/fc";
import useTodayWakeupSong from "../../../hooks/todayWakeupSong/useTodayWakeupSong";
import CardTitle from "../../common/cardTitle/cardTitle";
import { TodayWakeupSongContainer } from "./style";

const TodayWakeupSong = () => {
  const { data } = useTodayWakeupSong();

  console.log(data);
  return (
    <TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={<FcHeadset />}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
    </TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
