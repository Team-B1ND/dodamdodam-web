import {
  useGetMyTeamsQuery,
  useGetTeamMembersQuery,
} from "@/entities/team/queries";
import { useGetMeSuspenseQuery } from "@/entities/user/queries";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  ChevronDown,
  ChevronRight,
} from "@b1nd/dodam-design-system/icons";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useApplyProjectNightStudy } from "../hooks/useApplyProjectNightStudy";
import MemberItem from "./MemberItem";

interface Props {
  keyword: string;
}

const TeamMembers = ({ publicId }: { publicId: string }) => {
  const { data } = useGetTeamMembersQuery(publicId);
  const { data: me } = useGetMeSuspenseQuery();
  const { handleMember, isSelected } = useApplyProjectNightStudy();

  return data.data
    .filter(
      (member) => member.isAccept && member.userId !== me.data.publicId,
    )
    .map((member) => {
      const projectMember = {
        publicId: member.userId,
        name: member.name,
        profileImage: member.profileImage,
        student: member.student,
      };

      return (
        <MemberItem
          key={member.userId}
          data={projectMember}
          handleSelect={handleMember}
          selected={isSelected(member.userId)}
        />
      );
    });
};

const TeamSearch = ({ keyword }: Props) => {
  const [openTeamIds, setOpenTeamIds] = useState<string[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyTeamsQuery();
  const teams = data.pages
    .flatMap((page) => page.data.content)
    .filter((team) =>
      team.name.toLowerCase().includes(keyword.trim().toLowerCase()),
    );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!teams.length) {
    return <p className="py-8 text-center text-border-normal">팀이 없어요.</p>;
  }

  return (
    <div className="w-full flex flex-col py-2">
      {teams.map((team) => {
        const isOpen = openTeamIds.includes(team.publicId);

        return (
          <div key={team.publicId}>
            <button
              type="button"
              className="px-4 h-12 w-full flex items-center gap-2 text-left"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenTeamIds((ids) =>
                  isOpen
                    ? ids.filter((id) => id !== team.publicId)
                    : [...ids, team.publicId],
                )
              }
            >
              {isOpen ? (
                <ChevronDown color={colors.text.primary} size={20} />
              ) : (
                <ChevronRight color={colors.text.primary} size={20} />
              )}
              <span className="text-label font-bold">{team.name}</span>
            </button>
            {isOpen && (
              <Suspense fallback={<MemberItem.Skeleton />}>
                <TeamMembers publicId={team.publicId} />
              </Suspense>
            )}
          </div>
        );
      })}
      <div ref={ref} />
    </div>
  );
};

TeamSearch.Skeleton = () => (
  <div className="w-full flex flex-col py-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="px-4 h-12 flex items-center gap-2">
        <div className="size-5 rounded-extrasmall skeleton" />
        <div className="w-20 h-4 rounded-extrasmall skeleton" />
      </div>
    ))}
  </div>
);

export default TeamSearch;
