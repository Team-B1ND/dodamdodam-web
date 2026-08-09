import type { StudentInfo } from "@/entities/user/types";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Avatar } from "@b1nd/dodam-design-system/components";
import {
  CheckmarkCircleFill,
  CheckmarkCircleLine,
} from "@b1nd/dodam-design-system/icons";

export interface TeamSelectableMember {
  publicId: string;
  name: string;
  profileImage?: string | null;
  student?: Pick<StudentInfo, "grade" | "room" | "number">;
}

interface TeamMemberItemProps {
  disabled?: boolean;
  member: TeamSelectableMember;
  onSelect: (member: TeamSelectableMember) => void;
  selected: boolean;
}

const TeamMemberItem = ({
  disabled = false,
  member,
  onSelect,
  selected,
}: TeamMemberItemProps) => (
  <button
    className="flex h-12 w-full items-center gap-2 rounded-small px-3 text-left hover:bg-fill-secondary focus-visible:bg-fill-secondary disabled:cursor-default disabled:hover:bg-transparent"
    disabled={disabled}
    onClick={() => onSelect(member)}
    type="button"
  >
    {member.profileImage ? (
      <img
        alt={`${member.name}의 프로필 사진`}
        className="size-8 rounded-full object-cover"
        src={member.profileImage}
      />
    ) : (
      <Avatar size={32} />
    )}
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-label font-bold text-text-primary">
        {member.name}
      </span>
      <span className="text-caption2 text-text-secondary">
        {member.student?.grade}-{member.student?.room}
      </span>
    </span>
    <span className="flex-1" />
    {selected ? (
      <CheckmarkCircleFill color={colors.brand.primary} size={20} />
    ) : (
      <CheckmarkCircleLine color={colors.text.primary} size={20} />
    )}
  </button>
);

export default TeamMemberItem;
