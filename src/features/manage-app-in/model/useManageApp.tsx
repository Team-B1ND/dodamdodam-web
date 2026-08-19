import {
  useDeleteAppMutation,
  useUpdateAppVisibilityMutation,
} from "@/entities/app/mutations";
import { Dialog, useOverlay } from "@b1nd/dodam-design-system/components";

export const useManageApp = () => {
  const overlay = useOverlay();
  const { mutate: updateAppVisibility, isPending: isUpdatingVisibility } =
    useUpdateAppVisibilityMutation();
  const { mutate: deleteApp, isPending: isDeleting } = useDeleteAppMutation();

  const openDeleteDialog = (appId: string, appName: string) => {
    overlay.open(({ close, exit, isOpen }) => (
      <Dialog
        description="삭제한 앱은 복구할 수 없어요."
        onClose={close}
        onExited={exit}
        open={isOpen}
        title={`${appName} 앱을 삭제할까요?`}
      >
        <Dialog.FilledButton
          disabled={isDeleting}
          onClick={close}
          role="assistive"
        >
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          disabled={isDeleting}
          onClick={() => deleteApp(appId, { onSuccess: close })}
          role="negative"
        >
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return {
    isDeleting,
    isUpdatingVisibility,
    openDeleteDialog,
    updateAppVisibility,
  };
};
