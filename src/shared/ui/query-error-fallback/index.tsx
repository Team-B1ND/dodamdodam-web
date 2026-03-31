import ErrorFallback from "@/shared/ui/error-fallback";

interface Props {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
  title?: string;
  className?: string;
}

const QueryErrorFallback = ({
  error,
  onRetry,
  isRetrying = false,
  title = "요청을 불러오지 못했어요",
  className,
}: Props) => {
  return (
    <ErrorFallback
      title={title}
      error={error}
      onRetry={onRetry}
      isRetrying={isRetrying}
      className={className}
    />
  );
};

export default QueryErrorFallback;
