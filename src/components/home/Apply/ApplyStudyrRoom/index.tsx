import { Suspense } from "react";
import ErrorBoundary from "@src/components/common/ErrorBoundary";
import ApplyStudyRoomForm from "./ApplyStudyRoomForm";
import ApplyStudyRoomVoid from "./ApplyStudyRoomVoid";
import * as S from "./style";

const ApplyStudyRoom = () => {
  return (
    <S.ApplyStudyRoomContainer>
      <ErrorBoundary fallback={<ApplyStudyRoomVoid />}>
        <Suspense fallback={<ApplyStudyRoomVoid />}>
          <ApplyStudyRoomForm />
        </Suspense>
      </ErrorBoundary>
    </S.ApplyStudyRoomContainer>
  );
};

export default ApplyStudyRoom;
