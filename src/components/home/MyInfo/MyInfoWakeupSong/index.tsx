import { Suspense } from "react";
import MyInfoWakeupSongList from "./MyInfoWakeupSongList";
import { MyInfoWakeupSongContainer } from "./style";
import MyInfoWakeupSongListFallback from "@src/components/common/FallbackLoader/MyInfoWakeupSongList";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@src/components/common/ErrorFallback";

const MyInfoWakeupSong = () => {
  return (
    <MyInfoWakeupSongContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MyInfoWakeupSongListFallback />}>
          <MyInfoWakeupSongList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoWakeupSongContainer>
  );
};

export default MyInfoWakeupSong;
