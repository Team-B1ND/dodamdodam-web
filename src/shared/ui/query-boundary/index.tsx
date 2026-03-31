import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";
import ErrorBoundary from "@/shared/ui/error-boundary";
import QueryErrorFallback from "@/shared/ui/query-error-fallback";

interface Props {
  children: ReactNode;
  pendingFallback: ReactNode;
  errorTitle?: string;
  errorClassName?: string;
}

const QueryBoundary = ({
  children,
  pendingFallback,
  errorTitle,
  errorClassName,
}: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={({ error, reset: resetBoundary }) => (
            <QueryErrorFallback
              error={error}
              title={errorTitle}
              className={errorClassName}
              onRetry={() => {
                reset();
                resetBoundary();
              }}
            />
          )}
        >
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryBoundary;
