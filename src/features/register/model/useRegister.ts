import type { UserRegister } from "@/entities/user/types";
import { useState } from "react"

export type RegisterType = "TEACHER" | "STUDENT";
export const useRegister = () => {
  const [registerType, setRegisterType] = useState<RegisterType | undefined>(undefined);
  const [registerUser, setRegisterUser] = useState<UserRegister>({
    name: "",
    username: "",
    password: "",
    phone: "",
  });
  const [studentInfo, setStudentInfo] = useState("");
  const [teacherPosition, setTeacherPosition] = useState("");

  const validateCompleteRoleInfo = () => {
    const errorMessage = [];

    const grade = Number(studentInfo.slice(0, 1));
    const room = Number(studentInfo.slice(1, 2));
    const number = Number(studentInfo.slice(2));

    if (grade === 0 || grade > 3) {
      errorMessage.push("학년");
    }
    
    if (room === 0 || room > 4) {
      errorMessage.push("반");
    }

    if (number === 0 || number >= 19) {
      errorMessage.push("번호");
    }

    return errorMessage;
  };

  const registerUserHandler = (data: string, prop: keyof UserRegister) => {
    setRegisterUser(prev => ({...prev, [prop]: data}));
  }

  return {
    registerType,
    setRegisterType,
    registerUser,
    studentInfo,
    setStudentInfo,
    teacherPosition,
    setTeacherPosition,
    registerUserHandler,
    validateCompleteRoleInfo
  }
}
