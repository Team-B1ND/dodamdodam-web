import { Container, ErrorComment, RefetchButton } from "./style";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Container>
      <ErrorComment>오류가 발생했습니다.</ErrorComment>
      <RefetchButton onClick={() => resetErrorBoundary()}>
        다시 시도
      </RefetchButton>
    </Container>
  );
};

export default ErrorFallback;
