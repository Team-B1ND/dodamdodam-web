import CardTitle from "../../common/cardTitle/cardTitle";
import { TodayScheduleContainer } from "./style";
import { FcCalendar } from "react-icons/fc";

const TodaySchedule = () => {
  return (
    <TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={<FcCalendar />}
        redirectURL={"http://legacy.b1nd.com/schedule"}
      />
    </TodayScheduleContainer>
  );
};

export default TodaySchedule;
