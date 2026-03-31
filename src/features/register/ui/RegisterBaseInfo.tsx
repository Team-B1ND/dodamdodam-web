import type { UserRegister } from "@/entities/user/types";
import { extractEngAndNumberOnString } from "@/shared/utils/extract-eng-number-on-string";
import { isValidPassword } from "@/shared/utils/validate-password";
import { FilledButton, TextField, useToast } from "@b1nd/dodam-design-system/components";

interface Props {
  phaseController: (type: "up" | "down") => void;
  registerUser: UserRegister;
  registerUserHandler: (
    data: string,
    prop: keyof UserRegister,
  ) => void;
}

const RegisterBaseInfo = ({
  phaseController,
  registerUser,
  registerUserHandler
}: Props) => {
  const toast = useToast();
  const isCompleteForm =
    registerUser.name.length !== 0 &&
    registerUser.username.length !== 0 &&
    registerUser.password.length !== 0;

  const goNextPhase = () => {
    if (!isCompleteForm) return;
    if (!isValidPassword(registerUser.password)) {
      toast.error("비밀번호에는 영문, 숫자, 특수문자만 포함 가능해요.");
      return;
    }
    phaseController("up");
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <TextField
        label="이름"
        type="text"
        value={registerUser.name}
        onKeyDown={(e) => (e.key === "Enter" ? goNextPhase() : {})}
        onChange={(e) => registerUserHandler(e.target.value, "name")}
      />
      <TextField
        label="아이디"
        type="text"
        value={registerUser.username}
        onKeyDown={(e) => (e.key === "Enter" ? goNextPhase() : {})}
        onChange={(e) =>
          registerUserHandler(
            extractEngAndNumberOnString(e.target.value),
            "username",
          )
        }
      />
      <TextField
        label="비밀번호"
        type="password"
        value={registerUser.password}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.nativeEvent.isComposing
            ? goNextPhase()
            : {}
        }
        onChange={(e) => registerUserHandler(e.target.value, "password")}
      />
      <div className="grid grid-cols-2 w-full gap-3">
        <FilledButton role="assistive" onClick={() => phaseController("down")}>
          이전으로
        </FilledButton>
        <FilledButton onClick={goNextPhase} disabled={!isCompleteForm}>
          다음으로
        </FilledButton>
      </div>
    </div>
  );
}

export default RegisterBaseInfo