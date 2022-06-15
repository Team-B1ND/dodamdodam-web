import MyInfo from "./myInfo/myInfo";
import Notice from "./notice/notice";
import Point from "./point/point";
import { Column, Row } from "./style";
import TodaySchedule from "./todaySchedule/todaySchedule";
import TodayWakeupSong from "./todayWakeupSong/todayWakeupSong";

const Home = () => {
  return (
    <>
      <Notice />
      <Column>
        <Row>
          <TodaySchedule />
          <MyInfo />
        </Row>
        <Row>
          <TodayWakeupSong />
          <Point />
        </Row>
      </Column>
    </>
  );
};

export default Home;
