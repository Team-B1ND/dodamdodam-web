import { ACCESS_TOKEN_KEY } from "../../constants/token/token.constant";
import token from "../../lib/token/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token.getToken(ACCESS_TOKEN_KEY) === undefined) {
      navigate("/sign");
    }
  }, []);
};

export default useTokenCheck;
