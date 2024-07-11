import { Suspense } from "react";
import DevEventList from "./DevEventList";
import DevEventListFallbackLoader from "@src/components/common/FallbackLoader/DevEventList";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { Flex } from "@src/style/flex";

const DevEvents = () => {
  return (
    <DevEventsContainer>
      <ErrorBoundary fallback={<></>}>
        <Suspense fallback={<DevEventListFallbackLoader />}>
          <DevEventList />
        </Suspense>
      </ErrorBoundary>
    </DevEventsContainer>
  );
};

export default DevEvents;

const DevEventsContainer = styled.div`
  width: 100%;
  ${Flex({ $gap: "16px", $flexWrap: "wrap" })}
`;
