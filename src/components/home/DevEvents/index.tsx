import { DevEventsContainer } from "./style";
import { Suspense } from "react";
import ErrorBoundary from "../../../components/common/ErrorBoundary";
import DevEventList from "./DevEventList";

const DevEvents = () => {
  return (
    <DevEventsContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <DevEventList />
        </Suspense>
      </ErrorBoundary>
    </DevEventsContainer>
  );
};

export default DevEvents;
