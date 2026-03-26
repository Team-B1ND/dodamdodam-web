import { useSearchStudentQuery } from "@/entities/user/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useApplyProjectNightStudy } from "../hooks/useApplyProjectNightStudy";
import MemberItem from "./MemberItem";

interface Props {
  keyword: string;
}

const MemberSearch = ({ keyword }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchStudentQuery(keyword.trim());
  const students = data.pages.flatMap((data) => data.data.content);
  const { handleMember, isSelected } = useApplyProjectNightStudy();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full flex flex-col py-2 pr-4">
      {students.some((std) => !isSelected(std.publicId)) ? (
        students.map((student) =>
          isSelected(student.publicId) ? null : (
            <MemberItem
              handleSelect={handleMember}
              selected={isSelected(student.publicId)}
              data={student}
              key={student.publicId}
            />
          ),
        )
      ) : (
        <p className="py-8 text-center text-border-normal">학생이 없어요.</p>
      )}
      <div ref={ref} />
    </div>
  );
};

MemberSearch.Skeleton = () => {
  return (
    <div className="w-full flex flex-col py-2 pr-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <MemberItem.Skeleton key={idx} />
      ))}
    </div>
  );
};

export default MemberSearch;
