import type { User } from "@/entities/user/types";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Avatar } from "@b1nd/dodam-design-system/components";
import {
  CheckmarkCircleFill,
  CheckmarkCircleLine,
} from "@b1nd/dodam-design-system/icons";

interface Props {
  data: User;
  selected: boolean;
  handleSelect: (user: User) => void;
}

const MemberItem = ({ data, selected, handleSelect }: Props) => {
  return (
    <div className="px-4 h-12 w-full flex items-center gap-2">
      {data.profileImage ? (
        <img
          src={data.profileImage}
          alt={`${data.name}의 프로필 사진`}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <Avatar size={32} />
      )}
      <div>
        <p className="text-label font-bold">{data.name}</p>
        <p className="text-caption2 font-medium text-text-secondary">
          {data.student?.grade}-{data.student?.room}
        </p>
      </div>
      <div className="flex-1" />
      {selected ? (
        <CheckmarkCircleFill
          color={colors.brand.primary}
          pointer
          size={24}
          onClick={() => handleSelect(data)}
        />
      ) : (
        <CheckmarkCircleLine
          color={colors.text.primary}
          pointer
          size={24}
          onClick={() => handleSelect(data)}
        />
      )}
    </div>
  );
};

MemberItem.Skeleton = () => {
  return (
    <div className="px-4 h-12 w-full flex items-center gap-2">
      <div className="skeleton w-8 h-8 rounded-full" />
      <div className="flex flex-col gap-4">
        <div className="skeleton w-9 h-4 rounded-small" />
        <div className="skeleton w-4 h-3 rounded-small" />
      </div>
      <div className="flex-1" />
      <div className="skeleton w-6 h-6 rounded-full" />
    </div>
  );
};

export default MemberItem;
