import DevEventBanner from "../common/DevEventBanner";
import Apply from "./Apply";
import Banner from "./Banner";
import DevEvents from "./DevEvents";
import Meal from "./Meal";
import MyInfo from "./MyInfo";
import Notice from "./Notice";
import Point from "./Point";
import { Column, Row } from "./style";
import TodaySchedule from "./TodaySchedule";
import TodayWakeupSong from "./TodayWakeupSong";

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
        <DevEventBanner />
        <DevEvents />
      </Column>
    </>
  );
};

export default Home;
