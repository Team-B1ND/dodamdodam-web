import {
  useAllowOutSleepingMutation,
  useDenyOutSleepingMutation,
  useRevertOutSleepingMutation,
} from "@/entities/out-sleeping/mutations";
import type { OutSleepingStatus } from "@/entities/out-sleeping/types";
import {
  FilledButton,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import OutSleepingDenyDialog from "./OutSleepingDenyDialog";

interface Props {
  publicId: string;
  status: OutSleepingStatus;
}

const OutSleepingActionCell = ({ publicId, status }: Props) => {
  const { open } = useOverlay();

  const { mutate: allow, isPending: isAllowing } = useAllowOutSleepingMutation();
  const { mutate: deny, isPending: isDenying } = useDenyOutSleepingMutation();
  const { mutate: revert, isPending: isReverting } = useRevertOutSleepingMutation();

  const handleDeny = () => {
    open(({ close, exit, isOpen }) => (
      <OutSleepingDenyDialog
        isOpen={isOpen}
        isPending={isDenying}
        onClose={() => {
          close();
          exit();
        }}
        onConfirm={(reason) => {
          deny(
            { publicId, denyReason: reason },
            {
              onSettled: () => {
                close();
                exit();
              },
            },
          );
        }}
      />
    ));
  };

  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-2">
        <FilledButton
          role="primary"
          size="small"
          display="inline"
          disabled={isAllowing}
          onClick={() => allow(publicId)}
        >
          승인
        </FilledButton>
        <FilledButton
          role="negative"
          size="small"
          display="inline"
          onClick={handleDeny}
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
      onClick={() => revert(publicId)}
    >
      되돌리기
    </FilledButton>
  );
};

export default OutSleepingActionCell;
