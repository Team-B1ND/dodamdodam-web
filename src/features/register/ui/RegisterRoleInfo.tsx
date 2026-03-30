import type { RegisterType } from "@/features/register/model/useRegister";
import { extractNumbersOnString } from "@/shared/utils/extract-number-on-string";
import { FilledButton, TextField, useToast } from "@b1nd/dodam-design-system/components";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  phaseController: (type: "up" | "down") => void;
  registerType?: RegisterType;
  studentInfo: string;
  setStudentInfo: Dispatch<SetStateAction<string>>;
  teacherPosition: string;
  setTeacherInfo: Dispatch<SetStateAction<string>>;
  validateCompleteRoleInfo: () => string[];
}

const RegisterRoleInfo = ({
  phaseController,
  registerType,
  studentInfo,
  setStudentInfo,
  teacherPosition,
  setTeacherInfo,
  validateCompleteRoleInfo,
}: Props) => {
  const toast = useToast();

  const goNextPhase = () => {
    if (validateCompleteRoleInfo().length !== 0) {
      toast.error(
        validateCompleteRoleInfo().join(", ") +
          " 정보를 제대로 입력해주세요.",
      );
      return;
    }
    phaseController("up");
  }

  return (
    <div className="flex flex-col w-full gap-4">
      {registerType === "STUDENT" ? (
        <TextField
          label="학반번호"
          type="text"
          value={studentInfo}
          onKeyDown={(e) => (e.key === "Enter" ? goNextPhase() : {})}
          onChange={(e) =>
            setStudentInfo(extractNumbersOnString(e.target.value).slice(0, 4))
          }
        />
      ) : (
        <TextField
          label="직무"
          type="text"
          value={teacherPosition}
          onKeyDown={(e) => (e.key === "Enter" ? goNextPhase() : {})}
          onChange={(e) => setTeacherInfo(e.target.value)}
        />
      )}
      <div className="grid grid-cols-2 w-full gap-3">
        <FilledButton
          role="assistive"
          onClick={() => {
            phaseController("down");
            setStudentInfo("");
            setTeacherInfo("");
          }}
        >
          이전으로
        </FilledButton>
        <FilledButton
          onClick={goNextPhase}
          disabled={studentInfo?.length === 0 && teacherPosition?.length === 0}
        >
          다음으로
        </FilledButton>
      </div>
    </div>
  );
}

export default RegisterRoleInfo