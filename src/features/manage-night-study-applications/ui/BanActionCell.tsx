import { FilledButton } from "@b1nd/dodam-design-system/components";

interface Props {
  isBanned: boolean;
  onBan: () => void;
  onUnban: () => void;
  isDeleting: boolean;
}

const BanActionCell = ({ isBanned, onBan, onUnban, isDeleting }: Props) => {
  if (isBanned) {
    return (
      <FilledButton
        role="assistive"
        size="small"
        display="inline"
        disabled={isDeleting}
        onClick={onUnban}
      >
        정지 해제
      </FilledButton>
    );
  }

  return (
    <FilledButton role="negative" size="small" display="inline" onClick={onBan}>
      정지
    </FilledButton>
  );
};

export default BanActionCell;
