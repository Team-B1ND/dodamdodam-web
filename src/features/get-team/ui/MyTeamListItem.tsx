import {
  useDeleteTeamMutation,
  useLeaveTeamMutation,
} from "@/entities/team/mutations";
import { useGetTeamMembersQuery } from "@/entities/team/queries";
import type { Team } from "@/entities/team/types";
import {
  Dialog,
  FilledButton,
  useOverlay,
} from "@b1nd/dodam-design-system/components";

interface MyTeamListItemProps {
  team: Team;
}

const MyTeamListItem = ({ team }: MyTeamListItemProps) => {
  const { open } = useOverlay();
  const { data: membersData } = useGetTeamMembersQuery(team.publicId);
  const { mutateAsync: leaveTeam, isPending: isLeaving } =
    useLeaveTeamMutation();
  const { mutateAsync: deleteTeam, isPending: isDeleting } =
    useDeleteTeamMutation();
  const isOwner = membersData.data.some((member) => member.isOwner);
  const isPending = isLeaving || isDeleting;

  const openLeaveDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title={
          isOwner
            ? `${team.name} 팀을 삭제할까요?`
            : `${team.name} 팀에서 탈퇴할까요?`
        }
        description={
          isOwner
            ? "팀을 삭제 후 다시 참여하려면 팀을 생성해야 해요."
            : "탈퇴 후 다시 참여하려면 팀의 초대가 필요해요."
        }
        onClose={close}
        onExited={exit}
      >
        <Dialog.FilledButton
          role="assistive"
          disabled={isPending}
          onClick={close}
        >
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          role="negative"
          disabled={isPending}
          onClick={async () => {
            await (isOwner
              ? deleteTeam(team.publicId)
              : leaveTeam(team.publicId));
            close();
          }}
        >
          {isOwner
            ? isDeleting
              ? "삭제 중..."
              : "삭제"
            : isLeaving
              ? "탈퇴 중..."
              : "탈퇴"}
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-headline font-medium">{team.name}</span>
      <div className="flex-1" />
      <FilledButton
        role="negative"
        size="small"
        display="inline"
        disabled={isPending}
        onClick={openLeaveDialog}
      >
        {isOwner ? "삭제" : "탈퇴"}
      </FilledButton>
    </div>
  );
};

export default MyTeamListItem;
