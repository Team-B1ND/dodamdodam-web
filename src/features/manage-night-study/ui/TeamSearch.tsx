import {
  useGetMyTeamsQuery,
  useGetTeamMembersQuery,
} from "@/entities/team/queries";
import type { Team } from "@/entities/team/types";
import { useGetMeSuspenseQuery } from "@/entities/user/queries";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Avatar, IconButton } from "@b1nd/dodam-design-system/components";
import QueryBoundary from "@/shared/ui/query-boundary";
import {
  CheckmarkCircleFill,
  CheckmarkCircleLine,
  ChevronDown,
  ChevronRight,
} from "@b1nd/dodam-design-system/icons";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { MemberSelection } from "../stores/project-form";
import MemberItem from "./MemberItem";

interface Props {
  keyword: string;
  selection: MemberSelection;
}

const TeamAvatar = ({ team }: { team: Team }) =>
  team.imageUrl ? (
    <img
      src={team.imageUrl}
      alt={`${team.name} 팀 이미지`}
      className="size-8 rounded-full object-cover"
    />
  ) : (
    <Avatar size={32} />
  );

const ExpandedTeam = ({
  team,
  onToggle,
  selection,
}: {
  team: Team;
  onToggle: () => void;
  selection: MemberSelection;
}) => {
  const { data } = useGetTeamMembersQuery(team.publicId);
  const { data: me } = useGetMeSuspenseQuery();
  const { handleMember, handleMembers, isSelected } = selection;
  const members = data.data
    .filter(
      (member) => member.isAccept && member.userId !== me.data.publicId,
    )
    .map((member) => ({
      publicId: member.userId,
      name: member.name,
      profileImage: member.profileImage ?? undefined,
      student: member.student,
    }));
  const allSelected =
    members.length > 0 &&
    members.every((member) => isSelected(member.publicId));

  return (
    <>
      <div className="px-4 h-12 w-full flex items-center gap-2">
        <IconButton
          icon={<ChevronDown color={colors.text.primary} />}
          size={32}
          iconSize={20}
          onClick={onToggle}
        />
        <TeamAvatar team={team} />
        <span className="text-label font-bold">{team.name}</span>
        <div className="flex-1" />
        <IconButton
          icon={
            allSelected ? (
              <CheckmarkCircleFill color={colors.brand.primary} />
            ) : (
              <CheckmarkCircleLine color={colors.border.normal} />
            )
          }
          size={32}
          iconSize={24}
          onClick={() => handleMembers(members)}
        />
      </div>
      <div className="pl-7">
        {members.map((member) => (
          <MemberItem
            key={member.publicId}
            data={member}
            handleSelect={handleMember}
            selected={isSelected(member.publicId)}
          />
        ))}
      </div>
    </>
  );
};

const TeamSearch = ({ keyword, selection }: Props) => {
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
    return <p className="py-12 text-center text-body1 text-text-tertiary">팀이 없어요.</p>;
  }

  return (
    <div className="w-full flex flex-col py-2">
      {teams.map((team) => {
        const isOpen = openTeamIds.includes(team.publicId);
        const toggleTeam = () =>
          setOpenTeamIds((ids) =>
            isOpen
              ? ids.filter((id) => id !== team.publicId)
              : [...ids, team.publicId],
          );

        return (
          <div key={team.publicId}>
            {isOpen ? (
              <QueryBoundary pendingFallback={<MemberItem.Skeleton />}>
                <ExpandedTeam
                  team={team}
                  onToggle={toggleTeam}
                  selection={selection}
                />
              </QueryBoundary>
            ) : (
              <button
                type="button"
                className="px-4 h-12 w-full flex items-center gap-2 text-left"
                aria-expanded={false}
                onClick={toggleTeam}
              >
                <ChevronRight color={colors.text.primary} size={20} />
                <TeamAvatar team={team} />
                <span className="text-label font-bold">{team.name}</span>
              </button>
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
        <div className="size-8 rounded-full skeleton" />
        <div className="w-20 h-4 rounded-extrasmall skeleton" />
      </div>
    ))}
  </div>
);

export default TeamSearch;
