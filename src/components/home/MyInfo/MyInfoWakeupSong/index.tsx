import ErrorBoundary from "@src/components/common/ErrorBoundary";
import { Suspense } from "react";
import MyInfoWakeupSongList from "./MyInfoWakeupSongList";
import { MyInfoWakeupSongContainer } from "./style";
import MyInfoWakeupSongListFallback from "@src/components/common/FallbackLoader/MyInfoWakeupSongList";

const MyInfoWakeupSong = () => {
  return (
    <MyInfoWakeupSongContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<MyInfoWakeupSongListFallback />}>
          <MyInfoWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoWakeupSongContainer>
  );
};

export default MyInfoWakeupSong;
