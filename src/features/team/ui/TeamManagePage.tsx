import { useGetTeamMembersQuery, useGetTeamsQuery } from "@/entities/team/queries";
import { useGetMeSuspenseQuery } from "@/entities/user/queries";
import { useUpdateTeam } from "@/features/team/model/useUpdateTeam";
import {
  Dialog,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { useNavigate } from "@tanstack/react-router";
import TeamForm, { type TeamFormValues } from "./TeamForm";

interface TeamManagePageProps {
  publicId: string;
}

const TeamManagePage = ({ publicId }: TeamManagePageProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const { data: teamsData } = useGetTeamsQuery();
  const { data: membersData } = useGetTeamMembersQuery(publicId);
  const { data: meData } = useGetMeSuspenseQuery();
  const { submit, isPending } = useUpdateTeam();
  const team = teamsData.pages
    .flatMap((page) => page.data.content)
    .find((item) => item.publicId === publicId);
  const currentMember = membersData.data.find(
    (member) => member.isAccept && member.userId === meData.data.publicId,
  );
  const initialMembers = membersData.data.map((member) => ({
    publicId: member.userId,
    name: member.name,
    profileImage: member.profileImage,
    student: member.student,
  }));
  const lockedMemberIds = initialMembers.map(({ publicId }) => publicId);

  if (!team) {
    return (
      <section className="large-container flex min-h-60 w-full items-center justify-center">
        <p className="text-body1 text-text-tertiary">
          팀 정보를 찾을 수 없어요.
        </p>
      </section>
    );
  }

  if (!currentMember?.isOwner) {
    return (
      <section className="large-container flex min-h-60 w-full items-center justify-center">
        <p className="text-body1 text-text-tertiary">
          팀을 수정할 권한이 없어요.
        </p>
      </section>
    );
  }

  const openUpdateConfirmDialog = (values: TeamFormValues) => {
    overlay.open(({ close, exit, isOpen, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };

      setDimClickHandler(onClose);

      return (
        <Dialog
          description="수정된 내용은 즉시 팀 페이지에 반영돼요."
          open={isOpen}
          title="정말로 수정하시겠어요?"
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
              const isUpdated = await submit({
                publicId,
                name: values.name,
                description: values.description,
                currentImageUrl: team.imageUrl,
                image: values.image,
                members: values.members
                  .filter(
                    ({ publicId: memberId }) =>
                      !lockedMemberIds.includes(memberId),
                  )
                  .map(({ publicId: memberId }) => memberId),
              });

              if (!isUpdated) return;

              onClose();
              await navigate({
                to: "/team/$publicId",
                params: { publicId },
              });
            }}
            role="primary"
          >
            {isPending ? "수정 중..." : "확인"}
          </Dialog.FilledButton>
        </Dialog>
      );
    });
  };

  return (
    <TeamForm
      initialValues={{
        name: team.name,
        description: team.description ?? "",
        imageUrl: team.imageUrl,
        members: initialMembers,
      }}
      isPending={isPending}
      lockedMemberIds={lockedMemberIds}
      mode="edit"
      onBack={() =>
        navigate({
          to: "/team/$publicId",
          params: { publicId },
        })
      }
      onSubmit={openUpdateConfirmDialog}
    />
  );
};

TeamManagePage.Skeleton = () => (
  <section className="flex min-h-full w-full flex-col gap-5 rounded-large bg-background-surface p-5 sm:p-8">
    <div className="skeleton h-7 w-20 rounded-extrasmall" />
    {Array.from({ length: 3 }).map((_, index) => (
      <div className="flex flex-col gap-2" key={index}>
        <div className="skeleton h-4 w-20 rounded-extrasmall" />
        <div className="skeleton h-12 w-full rounded-small" />
        <div className="skeleton h-3 w-48 rounded-extrasmall" />
      </div>
    ))}
    <div className="skeleton min-h-80 flex-1 rounded-medium" />
  </section>
);

export default TeamManagePage;
