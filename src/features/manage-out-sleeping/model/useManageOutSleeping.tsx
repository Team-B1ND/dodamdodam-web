import {
  useAllowOutSleepingMutation,
  useDenyOutSleepingMutation,
  useRevertOutSleepingMutation,
} from "@/entities/out-sleeping/mutations";
import { useOverlay } from "@b1nd/dodam-design-system/components";
import OutSleepingDenyDialog from "@/features/manage-out-sleeping/ui/OutSleepingDenyDialog";

interface MutationCallbacks {
  onSuccess?: () => void;
}

interface DenyDialogProps {
  publicId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DenyDialog = ({ publicId, isOpen, onClose, onSuccess }: DenyDialogProps) => {
  const { mutate: deny, isPending } = useDenyOutSleepingMutation();

  return (
    <OutSleepingDenyDialog
      isOpen={isOpen}
      isPending={isPending}
      onClose={onClose}
      onConfirm={(reason) => {
        deny(
          { publicId, denyReason: reason },
          {
            onSuccess,
            onSettled: onClose,
          },
        );
      }}
    />
  );
};

export const useManageOutSleeping = () => {
  const overlay = useOverlay();

  const { mutate: allow, isPending: isAllowing } = useAllowOutSleepingMutation();
  const { mutate: revert, isPending: isReverting } = useRevertOutSleepingMutation();

  const allowOutSleeping = (publicId: string, callbacks?: MutationCallbacks) => {
    allow(publicId, { onSuccess: callbacks?.onSuccess });
  };

  const revertOutSleeping = (publicId: string, callbacks?: MutationCallbacks) => {
    revert(publicId, { onSuccess: callbacks?.onSuccess });
  };

  const openDenyDialog = (publicId: string, callbacks?: MutationCallbacks) => {
    overlay.open(({ close, exit, isOpen }) => {
      const onClose = () => {
        close();
        exit();
      };

      return (
        <DenyDialog
          publicId={publicId}
          isOpen={isOpen}
          onClose={onClose}
          onSuccess={callbacks?.onSuccess}
        />
      );
    });
  };

  return {
    allowOutSleeping,
    revertOutSleeping,
    openDenyDialog,
    isAllowing,
    isReverting,
  };
};
