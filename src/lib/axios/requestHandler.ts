import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import tokenRepository from "@src/repository/token/token.repository";
import token from "../token/token";
import { dodamV6Axios } from "./customAxios";

//리프레쉬 작업중인지 아닌지를 구분하는 변수
let isRefreshing = false;

let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

export const errorRequestHandler = async (error: AxiosError) => {
  if (error.response) {
    const {
      config: originalRequest,
      response: { status },
    } = error;

    const usingAccessToken = token.getToken(ACCESS_TOKEN_KEY);
    const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (
      usingAccessToken !== undefined &&
      usingRefreshToken !== undefined &&
      status === 401
    ) {
      //아무 요청중 하나하도 리프레쉬 작업중이 아니라면
      if (!isRefreshing) {
        //리프레쉬 작업을 시작함
        isRefreshing = true;

        //리프레쉬 api 요청
        try {
          const { data: newAccessToken } =
            await tokenRepository.getRefreshToken({
              token: usingRefreshToken,
            });

          dodamV6Axios.defaults.headers.common[
            REQUEST_TOKEN_KEY
          ] = `Bearer ${newAccessToken}`;

          token.setToken(ACCESS_TOKEN_KEY, newAccessToken);

          //리프레쉬 작업을 마침
          isRefreshing = false;

          //새로 받은 accessToken을 기반으로 이때까지 밀려있던 요청을 모두 처리
          onTokenRefreshed(newAccessToken);
        } catch (error) {
          //리프레쉬 하다가 오류난거면 리프레쉬도 만료된 것이므로 다시 로그인
          window.alert("세션이 만료되었습니다.");
          token.clearToken();
          window.location.href = "http://dodam.b1nd.com/sign";
        }
      }

      //어떤 요청이 리프레쉬 작업중이라면 여기로 와서 그 후에 요청된 다른 API Promise를 refreshSubscribers에 넣어줌
      return new Promise((resolve) => {
        addRefreshSubscriber((accessToken: string) => {
          originalRequest.headers![REFRESH_TOKEN_KEY] = `Bearer ${accessToken}`;
          resolve(dodamV6Axios(originalRequest));
        });
      });
    }
  }

  return Promise.reject(error);
};
