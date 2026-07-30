import { useLeaveTeamMutation } from "@/entities/team/mutations";
import { useGetTeamMembersQuery, useGetTeamsQuery } from "@/entities/team/queries";
import { useGetMeSuspenseQuery } from "@/entities/user/queries";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import {
  Avatar,
  Dialog,
  FilledButton,
  IconButton,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { ChevronLeft } from "@b1nd/dodam-design-system/icons";
import { useNavigate } from "@tanstack/react-router";

interface TeamDetailPageProps {
  publicId: string;
}

const TeamDetailPage = ({ publicId }: TeamDetailPageProps) => {
  const navigate = useNavigate();
  const overlay = useOverlay();
  const { data: teamsData } = useGetTeamsQuery();
  const { data: membersData } = useGetTeamMembersQuery(publicId);
  const { data: meData } = useGetMeSuspenseQuery();
  const { mutateAsync: leaveTeam, isPending: isLeaving } =
    useLeaveTeamMutation();
  const team = teamsData.pages
    .flatMap((page) => page.data.content)
    .find((item) => item.publicId === publicId);
  const members = membersData.data.filter((member) => member.isAccept);
  const owner = members.find((member) => member.isOwner);
  const currentMember = members.find(
    (member) => member.userId === meData.data.publicId,
  );
  const ownerLabel = owner
    ? `${parseStudentId(
        owner.student.grade,
        owner.student.room,
        owner.student.number,
      )}${owner.name}`
    : "정보 없음";

  const openLeaveDialog = () => {
    if (!team) return;

    overlay.open(({ close, exit, isOpen }) => (
      <Dialog
        description="탈퇴 후 다시 참여하려면 팀의 초대가 필요해요."
        onClose={close}
        onExited={exit}
        open={isOpen}
        title={`${team.name} 팀에서 탈퇴할까요?`}
      >
        <Dialog.FilledButton
          disabled={isLeaving}
          onClick={close}
          role="assistive"
        >
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          disabled={isLeaving}
          onClick={async () => {
            try {
              await leaveTeam(publicId);
              close();
              await navigate({ to: "/team" });
            } catch {
              // 오류 안내는 mutation에서 처리합니다.
            }
          }}
          role="negative"
        >
          {isLeaving ? "탈퇴 중..." : "탈퇴"}
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  if (!team) {
    return (
      <section className="large-container flex min-h-60 w-full items-center justify-center">
        <p className="text-body1 text-text-tertiary">
          팀 정보를 찾을 수 없어요.
        </p>
      </section>
    );
  }

  return (
    <section className="large-container flex w-full flex-col gap-4">
      <IconButton
        icon={<ChevronLeft />}
        iconSize={24}
        onClick={() => navigate({ to: "/team" })}
        size={40}
      />

      <div className="flex flex-col gap-5 p-0 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="truncate text-title1 font-extrabold text-text-primary">
              {team.name}
            </h1>
            <p className="text-heading1 text-text-primary">
              {team.description || "팀 소개가 없어요."}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex gap-2">
              {currentMember && (
                <FilledButton
                  onClick={openLeaveDialog}
                  role="negative"
                  size="medium"
                >
                  탈퇴하기
                </FilledButton>
              )}
            </div>
            <p className="text-label font-medium text-text-primary">
              팀장: {ownerLabel}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border-normal" />

        <div className="flex w-full flex-col gap-1 sm:w-40">
          <h2 className="text-body1 font-bold text-text-secondary">멤버</h2>
          {members.length ? (
            members.map((member) => (
              <div
                className="flex h-12 items-center gap-2 rounded-extrasmall py-3"
                key={member.userId}
              >
                {member.profileImage ? (
                  <img
                    alt={`${member.name}의 프로필 사진`}
                    className="size-9 rounded-full object-cover"
                    src={member.profileImage}
                  />
                ) : (
                  <Avatar size={36} />
                )}
                <div className="flex min-w-0 flex-col font-medium">
                  <p className="truncate text-label text-text-primary">
                    {member.name}
                  </p>
                  <p className="text-caption2 text-text-secondary">
                    {member.student.grade}-{member.student.room}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-label text-text-tertiary">
              가입한 멤버가 없어요.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

TeamDetailPage.Skeleton = () => (
  <section className="large-container flex w-full flex-col gap-4">
    <div className="skeleton size-6 rounded-extrasmall" />
    <div className="flex flex-col gap-5 p-0 sm:p-5">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-12 w-32 rounded-extrasmall" />
          <div className="skeleton h-7 w-64 max-w-full rounded-extrasmall" />
        </div>
        <div className="hidden flex-col items-end gap-3 sm:flex">
          <div className="flex gap-2">
            <div className="skeleton h-10 w-20 rounded-small" />
            <div className="skeleton h-10 w-20 rounded-small" />
          </div>
          <div className="skeleton h-5 w-32 rounded-extrasmall" />
        </div>
      </div>
      <div className="h-px w-full bg-border-normal" />
      <div className="flex flex-col gap-2">
        <div className="skeleton h-6 w-10 rounded-extrasmall" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="flex h-12 items-center gap-2" key={index}>
            <div className="skeleton size-9 rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="skeleton h-4 w-14 rounded-extrasmall" />
              <div className="skeleton h-3 w-8 rounded-extrasmall" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamDetailPage;
