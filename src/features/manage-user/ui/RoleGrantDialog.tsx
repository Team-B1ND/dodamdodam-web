import { Dialog } from "@b1nd/dodam-design-system/components";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import type { User } from "@/entities/user/types";

interface Props {
  application: Pick<User, "roles">;
  isOpen: boolean;
  onClose: () => void;
  onGrantRole: () => void;
  isGrantingRole?: boolean;
}

const RoleGrantDialog = ({
  application,
  isOpen,
  onClose,
  onGrantRole,
  isGrantingRole=false
}: Props) => {
  return (
    <Dialog
      open={isOpen}
      title={"역할 부여"}
      onClose={onClose}
      closeOnDimmerClick
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 text-body1">
          <FilledButton
            role={
              application.roles.includes("DORMITORY_MANAGER")
                ? "negative"
                : "primary"
            }
            onClick={() => {
              onGrantRole();
            }}
            disabled={isGrantingRole || application.roles.includes("DORMITORY_MANAGER")}
          >
            자치위원
          </FilledButton>
        </div>
        <Dialog.FilledButton role="assistive" onClick={onClose}>
          닫기
        </Dialog.FilledButton>
      </div>
    </Dialog>
  );
};

export default RoleGrantDialog;
