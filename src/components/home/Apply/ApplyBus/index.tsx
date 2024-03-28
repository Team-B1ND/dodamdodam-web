import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ApplyBusForm from "./ApplyBusForm";
import * as S from "./style";
import { LoadingText } from "../style";

const ApplyBus = () => {
  return (
    <S.ApplyBusContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<LoadingText>로딩중...</LoadingText>}>
          <ApplyBusForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyBusContainer>
  );
};

export default ApplyBus;
