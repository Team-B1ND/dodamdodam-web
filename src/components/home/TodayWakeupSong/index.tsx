import CardTitle from "../../common/CardTitle";
import * as S from "./style";

import TodayWakeupSongHeadPhoneIcon from "../../../assets/icons/todayWakeupSong/todayWakeupSongHeadPhone.png";
import { Suspense } from "react";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import TodayWakeupSongList from "./TodayWakeupSongList";

const TodayWakeupSong = () => {
  return (
    <S.TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={TodayWakeupSongHeadPhoneIcon}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <TodayWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </S.TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
