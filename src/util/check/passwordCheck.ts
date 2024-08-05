import { PasswordParm } from "@src/types/login/login.type";
import React,{useState} from "react";

const passwordCheck = ()=>{
    const [passwordType, setPasswordType] = useState<PasswordParm>({
        type: "password",
        visible: false,
      });//이부분을 리코일로 
    
    
    const handlePasswordView = () => {
        setPasswordType(() => {
          if (!passwordType.visible) {
            return { type: "text", visible: true };
          }
          return { type: "password", visible: false };
        });
      };
}
export default passwordCheck
