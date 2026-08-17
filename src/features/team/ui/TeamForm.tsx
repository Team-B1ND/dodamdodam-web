import type { TeamSelectableMember } from "./TeamMemberItem";
import TeamFormField from "./TeamFormField";
import TeamMemberItem from "./TeamMemberItem";
import TeamMemberSearch from "./TeamMemberSearch";
import TeamMemberSearchSkeleton from "./TeamMemberSearchSkeleton";
import { useDebounce } from "@/shared/hooks/useDebounce";
import QueryBoundary from "@/shared/ui/query-boundary";
import { FilledButton, useToast } from "@b1nd/dodam-design-system/components";
import { useState, type ChangeEvent } from "react";

export interface TeamFormValues {
  name: string;
  description: string;
  image: File | null;
  members: TeamSelectableMember[];
}

interface TeamFormProps {
  initialValues?: Omit<TeamFormValues, "image"> & {
    imageUrl: string | null;
  };
  isPending: boolean;
  lockedMemberIds?: string[];
  mode: "create" | "edit";
  onBack: () => void;
  onSubmit: (values: TeamFormValues) => void;
}

const TeamForm = ({
  initialValues,
  isPending,
  lockedMemberIds = [],
  mode,
  onBack,
  onSubmit,
}: TeamFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [image, setImage] = useState<File | null>(null);
  const [keyword, setKeyword] = useState("");
  const [members, setMembers] = useState<TeamSelectableMember[]>(
    initialValues?.members ?? [],
  );
  const toast = useToast();
  const debouncedKeyword = useDebounce(keyword);
  const isEdit = mode === "edit";

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] ?? null);
  };

  const isLocked = (memberId: string) => lockedMemberIds.includes(memberId);
  const isSelected = (memberId: string) =>
    members.some(({ publicId }) => publicId === memberId);

  const handleMember = (member: TeamSelectableMember) => {
    if (isLocked(member.publicId)) return;

    setMembers((previous) =>
      previous.some(({ publicId }) => publicId === member.publicId)
        ? previous.filter(({ publicId }) => publicId !== member.publicId)
        : [...previous, member],
    );
  };

  const submit = () => {
    if (!name.trim() || !description.trim() || (!isEdit && !image)) {
      toast.warning("필수 입력 필드를 모두 채워주세요.");
      return;
    }
    if (!members.length) {
      toast.warning("팀원을 선택해주세요.");
      return;
    }

    onSubmit({ name, description, image, members });
  };

  return (
    <section className="flex min-h-full w-full flex-col rounded-large bg-background-surface p-5 sm:p-8">
      <h1 className="text-heading1 font-bold text-text-primary">
        {isEdit ? "팀 관리" : "팀 생성"}
      </h1>

      <form
        className="mt-6 flex flex-col"
        noValidate
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-3">
          <TeamFormField
            helperText="9자 이하, 특수문자 & 숫자 가능"
            label="팀명"
            required={!isEdit}
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

          <TeamFormField
            helperText="25자 이하"
            label="간략한 소개"
            required={!isEdit}
          >
            <input
              aria-label="간략한 소개"
              className="h-12 w-full rounded-small border border-border-normal bg-background-surface px-4 text-body text-text-primary placeholder:text-text-tertiary focus-visible:border-brand-primary"
              maxLength={25}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="팀을 간략하게 소개해주세요. 팀 목록에 표시됩니다."
              required
              value={description}
            />
          </TeamFormField>

          <TeamFormField
            helperText="대표 사진 (로고 등) 을 첨부해주세요. 팀 목록에 표시됩니다."
            label="대표 사진"
            required={!isEdit}
          >
            <label className="flex h-12 cursor-pointer items-center rounded-small border border-border-normal bg-background-surface px-4 text-body text-text-secondary focus-within:border-brand-primary">
              <span
                className={
                  image || initialValues?.imageUrl
                    ? "text-text-primary"
                    : "text-text-tertiary"
                }
              >
                {image?.name ??
                  (initialValues?.imageUrl ? "기존 대표 사진" : "파일 업로드")}
              </span>
              <input
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
                required={!isEdit}
                type="file"
              />
            </label>
          </TeamFormField>
        </div>

        <div className="mt-4 flex flex-col">
          <p className="text-label font-medium text-text-primary">
            팀원 선택 {!isEdit && <span className="text-status-error">*</span>}
          </p>
          <div
            aria-required
            className="mt-2 grid h-[25rem] shrink-0 grid-cols-1 gap-4 rounded-medium border border-border-normal p-3 md:grid-cols-2"
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
                    isDisabled={isLocked}
                    isSelected={isSelected}
                    keyword={debouncedKeyword}
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
                      disabled={isLocked(member.publicId)}
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
          <FilledButton onClick={onBack} role="assistive" size="medium">
            돌아가기
          </FilledButton>
          <FilledButton
            disabled={isPending}
            onClick={submit}
            role="primary"
            size="medium"
          >
            {isPending
              ? isEdit
                ? "수정 중..."
                : "생성 중..."
              : isEdit
                ? "수정하기"
                : "만들기"}
          </FilledButton>
        </div>
      </form>
    </section>
  );
};

export default TeamForm;
