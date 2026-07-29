import type { User } from "@/entities/user/types";
import { useCreateTeam } from "@/features/team/model/useCreateTeam";
import { useDebounce } from "@/shared/hooks/useDebounce";
import QueryBoundary from "@/shared/ui/query-boundary";
import TeamFormField from "./TeamFormField";
import TeamMemberItem from "./TeamMemberItem";
import TeamMemberSearch from "./TeamMemberSearch";
import TeamMemberSearchSkeleton from "./TeamMemberSearchSkeleton";
import {
  Dialog,
  useOverlay,
  useToast,
} from "@b1nd/dodam-design-system/components";
import { useNavigate } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";

const TeamCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [keyword, setKeyword] = useState("");
  const [members, setMembers] = useState<User[]>([]);
  const overlay = useOverlay();
  const toast = useToast();
  const debouncedKeyword = useDebounce(keyword);
  const { submit, isPending } = useCreateTeam();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] ?? null);
  };

  const handleMember = (member: User) => {
    setMembers((previous) =>
      previous.some(({ publicId }) => publicId === member.publicId)
        ? previous.filter(({ publicId }) => publicId !== member.publicId)
        : [...previous, member],
    );
  };

  const isSelected = (memberId: string) =>
    members.some(({ publicId }) => publicId === memberId);

  const openCreateConfirmDialog = () => {
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
              if (!image) return;

              const isCreated = await submit({
                name,
                description,
                image,
                members: members.map(({ publicId }) => publicId),
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
    <section className="flex min-h-full w-full flex-col rounded-large bg-background-surface p-5 sm:p-8">
      <h1 className="text-heading1 font-bold text-text-primary">팀 생성</h1>

      <form
        className="mt-6 flex min-h-0 flex-1 flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim() || !description.trim() || !image) {
            toast.warning("필수 입력 필드를 모두 채워주세요.");
            return;
          }
          if (!members.length) {
            toast.warning("팀원을 선택해주세요.");
            return;
          }
          openCreateConfirmDialog();
        }}
      >
        <div className="flex flex-col gap-3">
          <TeamFormField
            helperText="9자 이하, 특수문자 & 숫자 가능"
            label="팀명"
            required
          >
            <input
              aria-label="팀명"
              className="h-12 w-full rounded-small border border-border-normal bg-background-surface px-4 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-brand-primary"
              maxLength={9}
              onChange={(event) => setName(event.target.value)}
              placeholder="개설할 팀 이름을 입력해주세요."
              required
              value={name}
            />
          </TeamFormField>

          <TeamFormField helperText="14자 이하" label="간략한 소개" required>
            <input
              aria-label="간략한 소개"
              className="h-12 w-full rounded-small border border-border-normal bg-background-surface px-4 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-brand-primary"
              maxLength={14}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="팀을 간략하게 소개해주세요. 팀 목록에 표시됩니다."
              required
              value={description}
            />
          </TeamFormField>

          <TeamFormField
            helperText="대표 사진 (로고 등) 을 첨부해주세요. 팀 목록에 표시됩니다."
            label="대표 사진"
            required
          >
            <label className="flex h-12 cursor-pointer items-center rounded-small border border-border-normal bg-background-surface px-4 text-body text-text-secondary focus-within:border-brand-primary">
              <span className={image ? "text-text-primary" : "text-text-tertiary"}>
                {image?.name ?? "파일 업로드"}
              </span>
              <input
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
                required
                type="file"
              />
            </label>
          </TeamFormField>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <p className="text-label font-medium text-text-primary">
            팀원 선택 <span className="text-status-error">*</span>
          </p>
          <div
            aria-required
            className="mt-2 grid min-h-[20rem] flex-1 grid-cols-1 gap-4 rounded-medium border border-border-normal p-3 md:grid-cols-2"
          >
            <div className="flex min-h-0 flex-col gap-3">
              <label className="sr-only" htmlFor="team-member-search">
                팀원 검색
              </label>
              <input
                className="h-10 w-full rounded-small border border-border-normal bg-background-surface px-3 text-label text-text-primary placeholder:text-text-tertiary focus-visible:border-brand-primary"
                id="team-member-search"
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="이름으로 검색"
                value={keyword}
              />
              <div className="scrollbar min-h-0 flex-1 overflow-y-auto rounded-small border border-border-normal">
                <QueryBoundary
                  errorClassName="min-h-full rounded-small"
                  errorTitle="학생 목록을 불러오지 못했어요"
                  pendingFallback={<TeamMemberSearchSkeleton />}
                >
                  <TeamMemberSearch
                    keyword={debouncedKeyword}
                    isSelected={isSelected}
                    onSelect={handleMember}
                  />
                </QueryBoundary>
              </div>
            </div>

            <div className="scrollbar min-h-0 overflow-y-auto rounded-small border border-border-normal">
              {members.length ? (
                <div className="py-2 pr-3">
                  {members.map((member) => (
                    <TeamMemberItem
                      key={member.publicId}
                      member={member}
                      onSelect={handleMember}
                      selected
                    />
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-label text-text-tertiary">
                  선택된 팀원이 없어요.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="h-10 rounded-small bg-fill-secondary px-4 text-label font-medium text-text-secondary focus-visible:ring-2 focus-visible:ring-brand-primary"
            onClick={() => navigate({ to: "/team" })}
            type="button"
          >
            돌아가기
          </button>
          <button
            className="h-10 rounded-small bg-brand-primary px-4 text-label font-medium text-static-white focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "생성 중..." : "만들기"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TeamCreatePage;
