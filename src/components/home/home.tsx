import Apply from "./apply/apply";
import MyInfo from "./myInfo/myInfo";
import Notice from "./notice/notice";
import { Column, Row } from "./style";
import TodaySchedule from "./todaySchedule/todaySchedule";

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
          </Column>
          <MyInfo />
        </Row>
      </Column>
    </>
  );
};

export default Home;
