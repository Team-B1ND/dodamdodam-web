import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ApplyBusForm from "./ApplyBusForm";
import * as S from "./style";

const ApplyBus = () => {
  return (
    <S.ApplyBusContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<>로딩중...</>}>
          <ApplyBusForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyBusContainer>
  );
};

export default ApplyBus;
