import { useCreateTeam } from "@/features/team/model/useCreateTeam";
import {
  Dialog,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { useNavigate } from "@tanstack/react-router";
import TeamForm, { type TeamFormValues } from "./TeamForm";

const TeamCreatePage = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const { submit, isPending } = useCreateTeam();

  const openCreateConfirmDialog = (values: TeamFormValues) => {
    overlay.open(({ close, exit, isOpen, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };

      setDimClickHandler(onClose);

      return (
        <Dialog
          description="팀을 생성한 후 팀장의 권한이 부여됩니다."
          open={isOpen}
          title="팀을 생성하시겠어요?"
        >
          <Dialog.FilledButton
            disabled={isPending}
            onClick={onClose}
            role="assistive"
          >
            취소
          </Dialog.FilledButton>
          <Dialog.FilledButton
            disabled={isPending}
            onClick={async () => {
              if (!values.image) return;

              const isCreated = await submit({
                name: values.name,
                description: values.description,
                image: values.image,
                members: values.members.map(({ publicId }) => publicId),
              });

              if (!isCreated) return;

              onClose();
              await navigate({ to: "/team" });
            }}
            role="primary"
          >
            {isPending ? "생성 중..." : "확인"}
          </Dialog.FilledButton>
        </Dialog>
      );
    });
  };

  return (
    <TeamForm
      isPending={isPending}
      mode="create"
      onBack={() => navigate({ to: "/team" })}
      onSubmit={openCreateConfirmDialog}
    />
  );
};

export default TeamCreatePage;
