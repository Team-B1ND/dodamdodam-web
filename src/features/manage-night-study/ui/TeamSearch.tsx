import type { User } from "@/entities/user/types";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  ChevronDown,
  ChevronRight,
} from "@b1nd/dodam-design-system/icons";
import { useState } from "react";
import { useApplyProjectNightStudy } from "../hooks/useApplyProjectNightStudy";
import MemberItem from "./MemberItem";

interface Props {
  keyword: string;
}

const MOCK_TEAMS = [
  {
    id: "bind",
    name: "BIND",
    members: [
      {
        publicId: "mock-kim",
        username: "mock-kim",
        name: "김민규",
        phone: "",
        status: "ACTIVE",
        roles: ["STUDENT"],
        student: { grade: 1, room: 1, number: 1, isGraduated: false },
        createdAt: "",
      },
      {
        publicId: "mock-lee",
        username: "mock-lee",
        name: "이도현",
        phone: "",
        status: "ACTIVE",
        roles: ["STUDENT"],
        student: { grade: 2, room: 2, number: 1, isGraduated: false },
        createdAt: "",
      },
    ],
  },
  {
    id: "dodam",
    name: "도담도담",
    members: [
      {
        publicId: "mock-park",
        username: "mock-park",
        name: "박서준",
        phone: "",
        status: "ACTIVE",
        roles: ["STUDENT"],
        student: { grade: 3, room: 1, number: 1, isGraduated: false },
        createdAt: "",
      },
    ],
  },
] satisfies { id: string; name: string; members: User[] }[];

const TeamSearch = ({ keyword }: Props) => {
  const [openTeamIds, setOpenTeamIds] = useState<string[]>([]);
  const { handleMember, isSelected } = useApplyProjectNightStudy();
  const teams = MOCK_TEAMS.filter((team) =>
    team.name.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  if (!teams.length) {
    return <p className="py-8 text-center text-border-normal">팀이 없어요.</p>;
  }

  return (
    <div className="w-full flex flex-col py-2">
      {teams.map((team) => {
        const isOpen = openTeamIds.includes(team.id);

        return (
          <div key={team.id}>
            <button
              type="button"
              className="px-4 h-12 w-full flex items-center gap-2 text-left"
              aria-expanded={isOpen}
              onClick={() =>
                setOpenTeamIds((ids) =>
                  isOpen
                    ? ids.filter((id) => id !== team.id)
                    : [...ids, team.id],
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
            {isOpen &&
              team.members.map((member) => (
                <MemberItem
                  key={member.publicId}
                  data={member}
                  handleSelect={handleMember}
                  selected={isSelected(member.publicId)}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default TeamSearch;
