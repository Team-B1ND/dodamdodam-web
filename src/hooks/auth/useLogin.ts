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
import * as Sentry from "@sentry/react";
import { QUERY_KEYS } from "@src/queries/queryKey";
import { AxiosError } from "axios";
import errorResponseHandler from "@src/lib/axios/errorResponseHandler";
import ErrorHandler from "@src/util/error/ErrorHandler";

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
        showToast("아이디를 입력해주세요", "INFO");
        return;
      }

      if (loginData.pw === "") {
        showToast("비밀번호를 입력해주세요", "INFO");
        return;
      }

      const { id, pw } = loginData;

      const validLoginData: Login = {
        id,
        pw,
      };

      try {
        const { data } = await authRepository.login(validLoginData);

        token.setToken(ACCESS_TOKEN_KEY, data.accessToken);
        token.setToken(REFRESH_TOKEN_KEY, data.refreshToken);
        showToast("로그인 성공", "SUCCESS");

        queryClient.invalidateQueries(QUERY_KEYS.member.getMy);
        queryClient.invalidateQueries(QUERY_KEYS.wakeupSong.getMy);
        queryClient.invalidateQueries(QUERY_KEYS.point.getMy);
        navigate("/");
      } catch (error) {
        const errorCode = error as AxiosError;
        showToast(
          ErrorHandler.loginError(errorCode.response?.status!),
          "ERROR"
        );
        Sentry.captureException(`이러한 문제로 로그인 실패 ${error}`);
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
