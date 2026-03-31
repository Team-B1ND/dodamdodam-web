import {
  GRADE_OPTIONS,
  NUMBER_OPTIONS,
  ROOM_OPTIONS,
} from "@/features/fix-profile/constants/student-profile-options";
import { Dropdown } from "@b1nd/dodam-design-system/components";

interface Props {
  grade: string;
  room: string;
  number: string;
  onChangeGrade: (value: string) => void;
  onChangeRoom: (value: string) => void;
  onChangeNumber: (value: string) => void;
}

const StudentProfileSection = ({
  grade,
  room,
  number,
  onChangeGrade,
  onChangeRoom,
  onChangeNumber,
}: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        items={GRADE_OPTIONS}
        value={grade}
        onSelectedItemChange={(item) => onChangeGrade(item.value)}
      />
      학년
      <Dropdown
        items={ROOM_OPTIONS}
        value={room}
        onSelectedItemChange={(item) => onChangeRoom(item.value)}
      />
      반
      <Dropdown
        items={NUMBER_OPTIONS}
        value={number}
        onSelectedItemChange={(item) => onChangeNumber(item.value)}
      />
      번호
    </div>
  );
};

export default StudentProfileSection;
