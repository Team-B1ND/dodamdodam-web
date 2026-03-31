import { logout } from "@/widgets/sidebar/model/api";
import { Dialog } from "@b1nd/dodam-design-system/components";

interface Props {
  onClose: () => void;
  moveToLogin: () => Promise<void>;
}

const LogoutDialog = ({ onClose, moveToLogin }: Props) => {

  return (
    <Dialog
      open
      title="정말 로그아웃할까요?"
      description="다시 로그인해야 해요."
      closeOnDimmerClick
      onClose={onClose}
    >
      <Dialog.FilledButton role="primary" onClick={onClose}>
        닫기
      </Dialog.FilledButton>
      <Dialog.FilledButton
        role="assistive"
        onClick={() => {
          logout();
          onClose();
          moveToLogin();
        }}
      >
        로그아웃
      </Dialog.FilledButton>
    </Dialog>
  );
};

export default LogoutDialog;
