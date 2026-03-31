import type { RegisterType } from "@/features/register/model/useRegister";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  phaseController: (type: "up" | "down") => void;
  setRegisterType: Dispatch<SetStateAction<RegisterType | undefined>>;
}

const RegisterTypeSelect = ({
  phaseController,
  setRegisterType
}: Props) => {
  const onClick = (type: RegisterType | undefined) => {
    phaseController("up")
    setRegisterType(type);
  }

  return (
    <div className="grid grid-rows-2 w-full gap-4">
      <FilledButton onClick={() => onClick("STUDENT")}>
        학생 계정 생성
      </FilledButton>
      <FilledButton role="assistive" onClick={() => onClick("TEACHER")}>
        선생님 계정 생성
      </FilledButton>
    </div>
  );
}

export default RegisterTypeSelect