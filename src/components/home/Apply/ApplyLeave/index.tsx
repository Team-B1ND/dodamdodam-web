import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ApplyLeaveForm from "./ApplyLeaveForm";
import * as S from "./style";

const ApplyLeave = () => {
  return (
    <S.ApplyLeaveContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <ApplyLeaveForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyLeaveContainer>
  );
};

export default ApplyLeave;
