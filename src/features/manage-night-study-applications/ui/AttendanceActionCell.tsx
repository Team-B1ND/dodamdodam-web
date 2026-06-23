import { FilledButton } from "@b1nd/dodam-design-system/components";

interface Props {
  attended: boolean;
  disabled: boolean;
  onAttend: () => void;
  onRevert: () => void;
}

const AttendanceActionCell = ({
  attended,
  disabled,
  onAttend,
  onRevert,
}: Props) => {
  if (attended) {
    return (
      <FilledButton
        role="assistive"
        size="small"
        display="inline"
        disabled={disabled}
        onClick={onRevert}
      >
        되돌리기
      </FilledButton>
    );
  }

  return (
    <FilledButton
      role="primary"
      size="small"
      display="inline"
      disabled={disabled}
      onClick={onAttend}
    >
      출석 확인
    </FilledButton>
  );
};

export default AttendanceActionCell;
