import CardTitle from "../../common/CardTitle";
import * as S from "./style";
import TodayScheduleCanlendarIcon from "../../../assets/icons/todaySchedule/todayScheduleCanlendar.png";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import { Suspense } from "react";
import TodayScheduleList from "./TodayScheduleList";
import TodayScheduleListFallbackLoader from "../../../components/common/FallbackLoader/TodayScheduleList";

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
