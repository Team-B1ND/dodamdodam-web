import * as S from "./style";
import TodayScheduleCanlendarIcon from "@src/assets/icons/todaySchedule/todayScheduleCanlendar.png";
import ErrorBoundary from "@src/components/common/ErrorBoundary";
import { Suspense } from "react";
import TodayScheduleList from "./TodayScheduleList";
import TodayScheduleListFallbackLoader from "@src/components/common/FallbackLoader/TodayScheduleList";
import CardTitle from "@src/components/common/CardTitle";

const TodaySchedule = () => {
  return (
    <S.TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={TodayScheduleCanlendarIcon}
        redirectURL={"http://dodam.b1nd.com/schedule"}
      />
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<TodayScheduleListFallbackLoader />}>
          <TodayScheduleList />
        </Suspense>
      </ErrorBoundary>
    </S.TodayScheduleContainer>
  );
};

export default TodaySchedule;
