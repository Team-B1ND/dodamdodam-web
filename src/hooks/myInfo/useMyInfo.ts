import { useState } from "react";
import token from "../../lib/token/token";

const useMyInfo = () => {
  const [section, setSection] = useState("알림");

  const logOut = () => {
    token.clearToken();
  };

  return { section, setSection, logOut };
};

export default useMyInfo;
