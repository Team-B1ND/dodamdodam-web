import * as S from "./style";

import TodayWakeupSongHeadPhoneIcon from "@src/assets/icons/todayWakeupSong/todayWakeupSongHeadPhone.png";
import { Suspense } from "react";
import ErrorBoundary from "@src/components/common/ErrorBoundary";
import TodayWakeupSongList from "./TodayWakeupSongList";
import TodayWakeupSongListFallback from "@src/components/common/FallbackLoader/TodayWakeupSongList";
import CardTitle from "@src/components/common/CardTitle";

const TodayWakeupSong = () => {
  return (
    <S.TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={TodayWakeupSongHeadPhoneIcon}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<TodayWakeupSongListFallback />}>
          <TodayWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </S.TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
