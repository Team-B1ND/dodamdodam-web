import token from "@src/lib/token/token";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logOut = () => {
    token.clearToken();
    navigate("/sign");
  };

  return { logOut };
};

export default useLogout;
