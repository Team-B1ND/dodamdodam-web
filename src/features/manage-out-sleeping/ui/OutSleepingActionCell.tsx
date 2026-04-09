import type { OutSleepingStatus } from "@/entities/out-sleeping/types";
import {
  FilledButton,
} from "@b1nd/dodam-design-system/components";
import { useManageOutSleeping } from "@/features/manage-out-sleeping/model/useManageOutSleeping";

interface Props {
  publicId: string;
  status: OutSleepingStatus;
}

const OutSleepingActionCell = ({ publicId, status }: Props) => {
  const {
    allowOutSleeping,
    openDenyDialog,
    revertOutSleeping,
    isAllowing,
    isReverting,
  } = useManageOutSleeping();

  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-2">
        <FilledButton
          role="primary"
          size="small"
          display="inline"
          disabled={isAllowing}
          onClick={() => allowOutSleeping(publicId)}
        >
          승인
        </FilledButton>
        <FilledButton
          role="negative"
          size="small"
          display="inline"
          onClick={() => openDenyDialog(publicId)}
        >
          거절
        </FilledButton>
      </div>
    );
  }

  return (
    <FilledButton
      role="assistive"
      size="small"
      display="inline"
      disabled={isReverting}
      onClick={() => revertOutSleeping(publicId)}
    >
      되돌리기
    </FilledButton>
  );
};

export default OutSleepingActionCell;
