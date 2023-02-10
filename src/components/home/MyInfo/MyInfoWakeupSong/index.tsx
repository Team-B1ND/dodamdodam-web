import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import { Suspense } from "react";
import MyInfoWakeupSongList from "./MyInfoWakeupSongList";
import { MyInfoWakeupSongContainer } from "./style";

const MyInfoWakeupSong = () => {
  return (
    <MyInfoWakeupSongContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <MyInfoWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoWakeupSongContainer>
  );
};

export default MyInfoWakeupSong;
