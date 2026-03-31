import { FilledButton } from "@b1nd/dodam-design-system/components";
import { getErrorMessage } from "@/shared/utils/get-error-message";

interface Props {
  title?: string;
  error?: unknown;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

const ErrorFallback = ({
  title = "문제가 발생했어요.",
  error,
  description,
  retryLabel = "다시 시도",
  onRetry,
  isRetrying = false,
  className = "",
}: Props) => {
  return (
    <div
      className={`flex relative w-full min-h-60 flex-col items-center justify-center gap-3 rounded-large bg-background-surface p-6 text-center ${className}`}
    >
      <div className="flex flex-col gap-0.5">
        <strong className="text-text-primary text-heading1">{title}</strong>
        <p className="text-sm leading-6 text-text-secondary">
          {description ?? getErrorMessage(error)}
        </p>
      </div>

      {onRetry && (
        <FilledButton onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? "다시 시도 중.." : retryLabel}
        </FilledButton>
      )}
      <a
        href="https://b1nd.com"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 text-caption2 text-brand-primary"
      >
        문제가 계속 발생한다면 알려주세요!
      </a>
    </div>
  );
};

export default ErrorFallback;
