import * as S from "./style";
import TodayScheduleCanlendarIcon from "@src/assets/icons/todaySchedule/todayScheduleCanlendar.png";
import { Suspense } from "react";
import TodayScheduleList from "./TodayScheduleList";
import TodayScheduleListFallbackLoader from "@src/components/common/FallbackLoader/TodayScheduleList";
import CardTitle from "@src/components/common/CardTitle";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@src/components/common/ErrorFallback";

const TodaySchedule = () => {
  return (
    <S.TodayScheduleContainer>
      <CardTitle
        title="오늘의 일정"
        titleIcon={TodayScheduleCanlendarIcon}
        redirectURL={"http://dodam.b1nd.com/schedule"}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<TodayScheduleListFallbackLoader />}>
          <TodayScheduleList />
        </Suspense>
      </ErrorBoundary>
    </S.TodayScheduleContainer>
  );
};

export default TodaySchedule;
