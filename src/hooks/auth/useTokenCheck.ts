import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import token from "@src/lib/token/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      token.getToken(ACCESS_TOKEN_KEY) === undefined ||
      token.getToken(REFRESH_TOKEN_KEY) === undefined
    ) {
      navigate("/sign");
    }
  }, []);
};

export default useTokenCheck;
