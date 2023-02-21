import { DevEventsContainer } from "./style";
import { Suspense } from "react";
import DevEventList from "./DevEventList";
import DevEventListFallbackLoader from "@src/components/common/FallbackLoader/DevEventList";
import { ErrorBoundary } from "react-error-boundary";

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
