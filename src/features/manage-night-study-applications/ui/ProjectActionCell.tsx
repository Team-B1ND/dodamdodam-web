import type { NightStudyStatus } from "@/entities/night-study/types";
import { FilledButton } from "@b1nd/dodam-design-system/components";

interface Props {
  status: NightStudyStatus;
  onAllow: () => void;
  onReject: () => void;
  onPending: () => void;
  onAssignRoom: () => void;
  isAllowing: boolean;
  isPendingRevert: boolean;
}

const ProjectActionCell = ({
  status,
  onAllow,
  onReject,
  onPending,
  onAssignRoom,
  isAllowing,
  isPendingRevert,
}: Props) => {
  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-2">
        <FilledButton
          role="primary"
          size="small"
          display="inline"
          disabled={isAllowing}
          onClick={onAllow}
        >
          승인
        </FilledButton>
        <FilledButton role="negative" size="small" display="inline" onClick={onReject}>
          거절
        </FilledButton>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <FilledButton
        role="assistive"
        size="small"
        display="inline"
        disabled={isPendingRevert}
        onClick={onPending}
      >
        되돌리기
      </FilledButton>
      <FilledButton role="primary" size="small" display="inline" onClick={onAssignRoom}>
        랩실 지정
      </FilledButton>
    </div>
  );
};

export default ProjectActionCell;
