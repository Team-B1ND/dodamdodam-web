import Apply from "./apply/apply";
import Banner from "./banner/banner";
import Meal from "./meal/meal";
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
          <Column>
            <Row>
              <TodaySchedule />
              <Apply />
            </Row>
            <Banner />
          </Column>
          <MyInfo />
        </Row>
        <Row>
          <TodayWakeupSong />
          <Meal />
          <Column>
            <Point />
          </Column>
        </Row>
      </Column>
    </>
  );
};

export default Home;
