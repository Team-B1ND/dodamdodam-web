import CardTitle from "../../common/cardTitle/cardTitle";
import {
  TodayScheduleContainer,
  TodayScheduleItemWrap,
  TodayScheduleVoidText,
} from "./style";
import useTodaySchedule from "../../../hooks/todaySchedule/useTodaySchedule";
import dataCheck from "../../../util/check/dataCheck";
import TodayScheduleItem from "./todayScheduleItem/todayScheduleItem";
import TodayScheduleCanlendarIcon from "../../../assets/icons/todaySchedule/todayScheduleCanlendar.png";

const TodaySchedule = () => {
  const { todaySchedules } = useTodaySchedule();

  return (
    <TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={TodayScheduleCanlendarIcon}
        redirectURL={"http://dodam.b1nd.com/schedule"}
      />
      {dataCheck.voidCheck(todaySchedules) ? (
        <TodayScheduleVoidText>오늘 일정이 없습니다</TodayScheduleVoidText>
      ) : (
        <TodayScheduleItemWrap>
          {todaySchedules.map((todaySchedule) => (
            <TodayScheduleItem data={todaySchedule} key={todaySchedule.id} />
          ))}
        </TodayScheduleItemWrap>
      )}
    </TodayScheduleContainer>
  );
};

export default TodaySchedule;
