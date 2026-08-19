import {
  useAllowAppReleaseMutation,
  useDenyAppReleaseMutation,
} from "@/entities/app/mutations";
import ReleaseDenyDialog from "@/features/manage-app-in/ui/ReleaseDenyDialog";
import { useOverlay } from "@b1nd/dodam-design-system/components";

interface DenyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  releaseId: string;
}

const DenyDialog = ({ isOpen, onClose, releaseId }: DenyDialogProps) => {
  const { mutate: denyRelease, isPending } = useDenyAppReleaseMutation();

  return (
    <ReleaseDenyDialog
      isOpen={isOpen}
      isPending={isPending}
      onClose={onClose}
      onConfirm={(denyResult) => {
        denyRelease(
          { releaseId, denyResult },
          {
            onSettled: onClose,
          },
        );
      }}
    />
  );
};

export const useManageAppRelease = () => {
  const overlay = useOverlay();
  const { mutate: allowRelease, isPending: isAllowing } =
    useAllowAppReleaseMutation();

  const openDenyDialog = (releaseId: string) => {
    overlay.open(({ close, exit, isOpen }) => {
      const onClose = () => {
        close();
        exit();
      };

      return (
        <DenyDialog isOpen={isOpen} onClose={onClose} releaseId={releaseId} />
      );
    });
  };

  return {
    allowRelease,
    isAllowing,
    openDenyDialog,
  };
};
