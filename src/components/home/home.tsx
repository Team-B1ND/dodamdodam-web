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
          <TodaySchedule />
        </Row>
      </Column>
      <MyInfo />
    </>
  );
};

export default Home;
