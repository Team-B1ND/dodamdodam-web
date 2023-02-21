import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import MyInfoLostStuffList from "./MyInfoLostStuffList";
import { MyInfoLostStuffContainer } from "./style";
import MyInfoLostStuffListFallbackLoader from "@src/components/common/FallbackLoader/MyInfoLostStuffList";
import ErrorFallback from "@src/components/common/ErrorFallback";

const MyInfoLostStuff = () => {
  return (
    <MyInfoLostStuffContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MyInfoLostStuffListFallbackLoader />}>
          <MyInfoLostStuffList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoLostStuffContainer>
  );
};

export default MyInfoLostStuff;
