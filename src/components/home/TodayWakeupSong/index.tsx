import TodayWakeupSongHeadPhoneIcon from "@src/assets/icons/todayWakeupSong/todayWakeupSongHeadPhone.png";
import { Suspense } from "react";
import TodayWakeupSongList from "./TodayWakeupSongList";
import TodayWakeupSongListFallback from "@src/components/common/FallbackLoader/TodayWakeupSongList";
import CardTitle from "@src/components/common/CardTitle";
import ErrorFallback from "@src/components/common/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { Flex } from "@src/style/flex";

const TodayWakeupSong = () => {
  return (
    <TodayWakeupSongContainer>
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
    </TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;

const TodayWakeupSongContainer = styled.div`
  width: 280px;
  height: 326px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
  ${Flex({ $flexDirection: "column", $alignItems: "center" })}
`;
