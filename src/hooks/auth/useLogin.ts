import { sha512 } from "js-sha512";
import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "@src/repository/auth/auth.repository";
import { Login } from "@src/types/login/login.type";
import token from "@src/lib/token/token";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import showToast from "@src/lib/toast/toast";
import { useQueryClient } from "react-query";
import {
  dodamV6Axios,
  dodamV6AxiosSetAccessToken,
} from "@src/lib/axios/customAxios";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<Login>({
    id: "",
    pw: "",
  });
  const [loginKeep, setLoginKeep] = useState<boolean>(false);

  const handleLoginKeep = () => setLoginKeep((prev) => !prev);

  const handleLoginData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value, name } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    },
    [setLoginData]
  );

  const submitLoginData = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (loginData.id === "") {
        showToast("아이디를 입력해주세요", "IFNO");
        return;
      }

      if (loginData.pw === "") {
        showToast("비밀번호를 입력해주세요", "IFNO");
        return;
      }

      const { id, pw } = loginData;

      const validLoginData: Login = {
        id,
        pw: sha512(pw),
      };

      try {
        const {
          data: { member, token: accessToken, refreshToken },
        } = await authRepository.login(validLoginData);

        token.setToken(ACCESS_TOKEN_KEY, accessToken);
        token.setToken(REFRESH_TOKEN_KEY, refreshToken);
        dodamV6AxiosSetAccessToken(accessToken);

        showToast("로그인 성공", "SUCCESS");
        queryClient.invalidateQueries("profile/getMyMember");
        navigate("/");
      } catch (error) {
        showToast("로그인 실패", "ERROR");
      }
    },
    [loginData, navigate]
  );

  return {
    loginData,
    handleLoginData,
    loginKeep,
    handleLoginKeep,
    submitLoginData,
  };
};

export default useLogin;
