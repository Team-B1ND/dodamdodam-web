import * as S from "./style";
import TodayWakeupSongHeadPhoneIcon from "@src/assets/icons/todayWakeupSong/todayWakeupSongHeadPhone.png";
import { Suspense } from "react";
import TodayWakeupSongList from "./TodayWakeupSongList";
import TodayWakeupSongListFallback from "@src/components/common/FallbackLoader/TodayWakeupSongList";
import CardTitle from "@src/components/common/CardTitle";
import ErrorFallback from "@src/components/common/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

const TodayWakeupSong = () => {
  return (
    <S.TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={TodayWakeupSongHeadPhoneIcon}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<TodayWakeupSongListFallback />}>
          <TodayWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </S.TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
