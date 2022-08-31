import { useState } from "react";
import { useNavigate } from "react-router-dom";
import token from "../../lib/token/token";

const useMyInfo = () => {
  const [section, setSection] = useState("기상송");
  const navigate = useNavigate();

  const logOut = () => {
    token.clearToken();
    navigate("/sign");
  };

  return { section, setSection, logOut };
};

export default useMyInfo;
