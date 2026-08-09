import { useSearchStudentQuery } from "@/entities/user/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TeamMemberItem, {
  type TeamSelectableMember,
} from "./TeamMemberItem";

interface TeamMemberSearchProps {
  keyword: string;
  isDisabled?: (memberId: string) => boolean;
  isSelected: (memberId: string) => boolean;
  onSelect: (member: TeamSelectableMember) => void;
}

const TeamMemberSearch = ({
  keyword,
  isDisabled,
  isSelected,
  onSelect,
}: TeamMemberSearchProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchStudentQuery(keyword.trim());
  const { ref, inView } = useInView();
  const students = data.pages.flatMap((page) => page.data.content);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  if (!students.length) {
    return <p className="py-8 text-center text-label text-text-tertiary">학생이 없어요.</p>;
  }

  return (
    <div className="py-2 pr-3">
      {students.map((student) => (
        <TeamMemberItem
          disabled={isDisabled?.(student.publicId)}
          key={student.publicId}
          member={student}
          onSelect={onSelect}
          selected={isSelected(student.publicId)}
        />
      ))}
      <div ref={ref} />
    </div>
  );
};

export default TeamMemberSearch;
