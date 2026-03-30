import { useRegister } from "@/features/register/model/useRegister";
import RegisterBaseInfo from "@/features/register/ui/RegisterBaseInfo";
import RegisterRoleInfo from "@/features/register/ui/RegisterRoleInfo";
import RegisterTypeSelect from "@/features/register/ui/RegisterTypeSelect";
import { useState } from "react";

const RegisterForm = () => {
  const [phase, setPhase] = useState(1);
  const phaseController = (type: "up" | "down") => {
    switch (type) {
      case "up":
        setPhase((prev) => (prev += 1));
        return
      case "down":
        setPhase((prev) => (prev -= 1));
        return
    }
  }

  const {
    registerType,
    setRegisterType,
    studentInfo,
    setStudentInfo,
    teacherPosition,
    setTeacherPosition,
    registerUser,
    registerUserHandler,
    validateCompleteRoleInfo
  } = useRegister();
  
  switch (phase) {
    case 1:
      return (
        <div className="w-full flex flex-col gap-6 px-8 justify-center">
          <div className="flex flex-col gap-2">
            <p className="text-title2 font-bold text-text-primary">회원가입</p>
            <span className="text-headline font-medium text-text-tertiary">
              대소고 생활을 도담도담과 함께해요!
            </span>
          </div>
          <RegisterTypeSelect
            phaseController={phaseController}
            setRegisterType={setRegisterType}
          />
        </div>
      );
    case 2:
      return (
        <div className="w-full flex flex-col gap-6 px-8 justify-center">
          <div className="flex flex-col gap-2">
            <p className="text-title2 font-bold text-text-primary">회원가입</p>
            <span className="text-headline font-medium text-text-tertiary">
              {registerType === "STUDENT" ? "학생 " : "선생님 "} 정보를 알려주세요.
            </span>
          </div>
          <RegisterRoleInfo 
            validateCompleteRoleInfo={validateCompleteRoleInfo}
            phaseController={phaseController} 
            registerType={registerType}
            studentInfo={studentInfo}
            teacherPosition={teacherPosition}
            setTeacherInfo={setTeacherPosition}
            setStudentInfo={setStudentInfo}
          />
        </div>
      )
    case 3:
      return (
        <div className="w-full flex flex-col gap-6 px-8 justify-center">
          <div className="flex flex-col gap-2">
            <p className="text-title2 font-bold text-text-primary">회원가입</p>
            <span className="text-headline font-medium text-text-tertiary">
              사용할 정보를 알려주세요.
            </span>
          </div>
        </div>
      );
    case 4:
      return <div>4</div>;
  };
};

export default RegisterForm;
