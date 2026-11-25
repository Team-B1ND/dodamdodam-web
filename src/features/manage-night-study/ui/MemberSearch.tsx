import { useGetMeSuspenseQuery, useSearchStudentQuery } from "@/entities/user/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { MemberSelection } from "../stores/project-form";
import MemberItem from "./MemberItem";

interface Props {
  keyword: string;
  selection: MemberSelection;
}

const MemberSearch = ({ keyword, selection }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchStudentQuery(keyword.trim());
  const students = data.pages.flatMap((data) => data.data.content);
  const user = useGetMeSuspenseQuery();
  const { handleMember, isSelected } = selection;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full flex flex-col py-2 pr-4">
      {students.some((std) => !isSelected(std.publicId) && user.data.data.publicId !== std.publicId) ? (
        students.map((student) => {
            return isSelected(student.publicId) || user.data.data.publicId === student.publicId ? null : (
              <MemberItem
                handleSelect={handleMember}
                selected={isSelected(student.publicId)}
                data={student}
                key={student.publicId}
              />
            )
        })
      ) : (
        <p className="py-12 text-center text-body1 text-text-tertiary">학생이 없어요.</p>
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
