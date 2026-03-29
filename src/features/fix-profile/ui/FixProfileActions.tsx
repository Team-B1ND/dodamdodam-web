import { FilledButton } from "@b1nd/dodam-design-system/components";

interface Props {
  onClose: () => void;
  onComplete: () => void;
  completeButtonText: string;
  isCompleteDisabled: boolean;
}

const FixProfileActions = ({
  onClose,
  onComplete,
  completeButtonText,
  isCompleteDisabled,
}: Props) => {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      <FilledButton onClick={onClose} role="assistive">
        취소
      </FilledButton>
      <FilledButton onClick={onComplete} disabled={isCompleteDisabled}>
        {completeButtonText}
      </FilledButton>
    </div>
  );
};

export default FixProfileActions;
