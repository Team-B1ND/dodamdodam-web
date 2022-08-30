import CardTitle from "../../common/cardTitle/cardTitle";
import {
  TodayScheduleContainer,
  TodayScheduleItemWrap,
  TodayScheduleVoidText,
} from "./style";
import { FcCalendar } from "@react-icons/all-files/fc/FcCalendar";
import useTodaySchedule from "../../../hooks/todaySchedule/useTodaySchedule";
import dataCheck from "../../../util/check/dataCheck";
import TodayScheduleItem from "./todayScheduleItem/todayScheduleItem";

const TodaySchedule = () => {
  const { todaySchedules } = useTodaySchedule();

  return (
    <TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={<FcCalendar />}
        redirectURL={"http://legacy.b1nd.com/schedule"}
      />
      {dataCheck.voidCheck(todaySchedules) ? (
        <TodayScheduleVoidText>오늘 일정이 없습니다</TodayScheduleVoidText>
      ) : (
        <TodayScheduleItemWrap>
          {todaySchedules.map((todaySchedule) => (
            <TodayScheduleItem data={todaySchedule} />
          ))}
        </TodayScheduleItemWrap>
      )}
    </TodayScheduleContainer>
  );
};

export default TodaySchedule;
