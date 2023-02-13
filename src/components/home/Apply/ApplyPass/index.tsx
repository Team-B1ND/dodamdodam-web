import { Suspense } from "react";
import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import ApplyPassForm from "./ApplyPassForm";
import * as S from "./style";

const ApplyPass = () => {
  return (
    <S.ApplyPassContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <ApplyPassForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyPassContainer>
  );
};

export default ApplyPass;
