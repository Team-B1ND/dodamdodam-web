import DevEventBanner from "../common/DevEventBanner";
import Apply from "./Apply";
import Banner from "./Banner";
import DevEvents from "./DevEvents";
import Meal from "./Meal";
import MyInfo from "./MyInfo";
import Point from "./Point";
import * as S from "./style";
import TodaySchedule from "./TodaySchedule";
import TodayWakeupSong from "./TodayWakeupSong";

const Home = () => {
  return (
    <S.Container>
      <S.Column>
        <S.Row>
          <S.Column>
            <S.Row>
              <TodaySchedule />
              <Apply />
            </S.Row>
            <Banner />
          </S.Column>
          <MyInfo />
        </S.Row>
        <S.Row>
          <TodayWakeupSong />
          <Meal />
          <S.Column>
            <Point />
          </S.Column>
        </S.Row>
        <DevEventBanner />
        <DevEvents />
      </S.Column>
    </S.Container>
  );
};

export default Home;
