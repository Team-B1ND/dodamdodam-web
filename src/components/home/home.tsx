import MyInfo from "./myInfo/myInfo";
import Notice from "./notice/notice";
import StudyRoom from "./studyRoom/studyRoom";
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
              <StudyRoom />
            </Row>
          </Column>
          <MyInfo />
        </Row>
      </Column>
    </>
  );
};

export default Home;
