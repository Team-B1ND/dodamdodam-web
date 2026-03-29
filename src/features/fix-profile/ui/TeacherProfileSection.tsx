import { TextField } from "@b1nd/dodam-design-system/components";

interface Props {
  position: string;
  onChangePosition: (value: string) => void;
}

const TeacherProfileSection = ({
  position,
  onChangePosition,
}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <TextField
        type="text"
        label="직책"
        required
        value={position}
        onChange={(e) => onChangePosition(e.target.value)}
      />
    </div>
  );
};

export default TeacherProfileSection;
