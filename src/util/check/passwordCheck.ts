import { PasswordParm } from "@src/types/login/login.type";
import React,{useState} from "react";

const usePasswordCheck = () => {
  const [passwordType, setPasswordType] = useState<PasswordParm>({
    type: "password",
    visible: false,
  });


  const handlePasswordView = () => {
    setPasswordType((prev) => ({
      type: prev.visible ? 'password' : 'text',
      visible: !prev.visible,
    }));
  };

  return { passwordType, handlePasswordView };
};
export default usePasswordCheck