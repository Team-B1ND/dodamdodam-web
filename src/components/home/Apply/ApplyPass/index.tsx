import { Suspense } from "react";
import ErrorBoundary from "@src/components/common/ErrorBoundary";
import * as S from "./style";
import ApplyPassForm from "./ApplyPassForm";

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
