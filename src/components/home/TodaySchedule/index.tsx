import CardTitle from "../../common/CardTitle";
import * as S from "./style";

import useTodaySchedule from "../../../hooks/todaySchedule/useTodaySchedule";
import dataCheck from "../../../util/check/dataCheck";
import TodayScheduleItem from "./TodayScheduleItem";
import TodayScheduleCanlendarIcon from "../../../assets/icons/todaySchedule/todayScheduleCanlendar.png";

const TodaySchedule = () => {
  const { todaySchedules } = useTodaySchedule();

  return (
    <S.TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={TodayScheduleCanlendarIcon}
        redirectURL={"http://dodam.b1nd.com/schedule"}
      />
      {dataCheck.voidCheck(todaySchedules) ? (
        <S.TodayScheduleVoidText>오늘 일정이 없습니다</S.TodayScheduleVoidText>
      ) : (
        <S.TodayScheduleItemWrap>
          {todaySchedules.map((todaySchedule) => (
            <TodayScheduleItem data={todaySchedule} key={todaySchedule.id} />
          ))}
        </S.TodayScheduleItemWrap>
      )}
    </S.TodayScheduleContainer>
  );
};

export default TodaySchedule;
