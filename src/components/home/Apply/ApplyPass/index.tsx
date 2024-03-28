import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as S from "./style";
import ApplyPassForm from "./ApplyPassForm";
import { LoadingText } from "../style";

const ApplyPass = () => {
  return (
    <S.ApplyPassContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<LoadingText>로딩중...</LoadingText>}>
          <ApplyPassForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyPassContainer>
  );
};

export default ApplyPass;
