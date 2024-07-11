import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ApplyPassForm from "./ApplyPassForm";
import { LoadingText } from "../style";
import styled from "styled-components";
import { Flex } from "@src/style/flex";

const ApplyPass = () => {
  return (
    <ApplyPassContainer>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<LoadingText>로딩중...</LoadingText>}>
          <ApplyPassForm />
        </Suspense>
      </ErrorBoundary>
    </ApplyPassContainer>
  );
};

export default ApplyPass;

const ApplyPassContainer = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $flexDirection: "column" })}
`;
