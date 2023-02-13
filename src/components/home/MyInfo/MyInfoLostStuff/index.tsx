import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import { Suspense } from "react";
import MyInfoLostStuffList from "./MyInfoLostStuffList";
import { MyInfoLostStuffContainer } from "./style";
import MyInfoLostStuffListFallbackLoader from "../../../../components/common/FallbackLoader/MyInfoLostStuffList";

const MyInfoLostStuff = () => {
  return (
    <MyInfoLostStuffContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<MyInfoLostStuffListFallbackLoader />}>
          <MyInfoLostStuffList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoLostStuffContainer>
  );
};

export default MyInfoLostStuff;
