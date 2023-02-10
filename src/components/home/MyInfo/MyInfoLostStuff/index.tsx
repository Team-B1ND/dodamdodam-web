import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import { Suspense } from "react";
import MyInfoLostStuffList from "./MyInfoLostStuffList";
import { MyInfoLostStuffContainer } from "./style";

const MyInfoLostStuff = () => {
  return (
    <MyInfoLostStuffContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중</>}>
          <MyInfoLostStuffList />
        </Suspense>
      </ErrorBoundary>
    </MyInfoLostStuffContainer>
  );
};

export default MyInfoLostStuff;
