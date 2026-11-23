import MemberItem from "@/features/manage-night-study/ui/MemberItem";
import MemberSearch from "@/features/manage-night-study/ui/MemberSearch";
import TeamSearch from "@/features/manage-night-study/ui/TeamSearch";
import { useDebounce } from "@/shared/hooks/useDebounce";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  FilledTextField,
  SegmentedButton,
  type SegmentedButtonData,
} from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";

type MemberType = "personal" | "team";

const ProjectWeekendStudyMemberForm = () => {
  const { form, selection, clearMembers } = useApplyProjectWeekendStudy();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const [segment, setSegment] = useState<SegmentedButtonData[]>([
    { text: "개인", value: "personal", isActive: true },
    { text: "팀", value: "team", isActive: false },
  ]);
  const [memberType, setMemberType] = useState<MemberType>("personal");

  const handleMemberTypeChange = (type: string) => {
    if (type === memberType) return;
    setMemberType(type as MemberType);
    setKeyword("");
    clearMembers();
  };

  return (
    <div className="w-full flex flex-col gap-3 items-start">
      <h1 className="text-headline font-bold">인원 선택</h1>
      <div className="w-full h-auto sm:h-110 p-4 border border-border-normal rounded-medium flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="h-60 sm:h-full flex-1 flex flex-col gap-4">
          <SegmentedButton
            data={segment}
            setData={setSegment}
            onBlockClick={handleMemberTypeChange}
          />
          <FilledTextField
            label=""
            type="text"
            placeholder={
              memberType === "personal" ? "이름으로 검색" : "팀명으로 검색"
            }
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="flex-1 border border-border-normal rounded-small overflow-y-scroll">
            {memberType === "personal" ? (
              <QueryBoundary pendingFallback={<MemberSearch.Skeleton />}>
                <MemberSearch
                  keyword={debouncedKeyword}
                  selection={selection}
                />
              </QueryBoundary>
            ) : (
              <QueryBoundary pendingFallback={<TeamSearch.Skeleton />}>
                <TeamSearch keyword={debouncedKeyword} selection={selection} />
              </QueryBoundary>
            )}
          </div>
        </div>
        <div className="h-60 sm:h-full flex-1 border border-border-normal rounded-small overflow-y-scroll">
          <div className="py-2 pr-4">
            {form.members.length ? (
              form.members.map((member) => (
                <MemberItem
                  key={member.publicId}
                  data={member}
                  handleSelect={selection.handleMember}
                  selected={selection.isSelected(member.publicId)}
                />
              ))
            ) : (
              <p className="py-8 text-center text-border-normal">
                선택된 팀원이 없어요.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWeekendStudyMemberForm;
