import { Suspense } from "react";
import MyInfoWakeupSongList from "./MyInfoWakeupSongList";
import MyInfoWakeupSongListFallback from "@src/components/common/FallbackLoader/MyInfoWakeupSongList";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@src/components/common/ErrorFallback";
import styled from "styled-components";
import { Flex } from "@src/style/flex";

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

const MyInfoWakeupSongContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $flexDirection: "column" })}
`;
