import { AxiosRequestConfig } from "axios";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "../../constants/token/token.constant";
import tokenRepository from "../../repository/token/token.repository";
import token from "../token/token";
import { dodamV2Axios, dodamV3Axios } from "./customAxios";

//리프레쉬 작업중인지 아닌지를 구분하는 변수
let isRefreshing = false;

let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

export const requestHandler = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  //원래있던 accessToken을 저장
  let accessToken = token.getToken(ACCESS_TOKEN_KEY);
  const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);
  const decodeToken = token.decodeToken(ACCESS_TOKEN_KEY);
  const currentTime = Date.now() / 1000;

  if (accessToken !== undefined && usingRefreshToken !== undefined) {
    //원래있던 accessToken이 만료됐다면 리프레쉬를 시작함
    if (decodeToken?.exp! < currentTime) {
      window.alert("액세스 만료");

      //아무 요청중 하나하도 리프레쉬 작업중이 아니라면
      if (!isRefreshing) {
        //리프레쉬 작업을 시작함
        isRefreshing = true;

        //리프레쉬 api 요청
        try {
          const { data: newAccessToken } =
            await tokenRepository.getRefreshToken({
              refreshToken: usingRefreshToken,
            });

          config.headers![REQUEST_TOKEN_KEY] = newAccessToken;
          dodamV2Axios.defaults.headers.common[REQUEST_TOKEN_KEY] =
            newAccessToken;
          dodamV3Axios.defaults.headers.common[REQUEST_TOKEN_KEY] =
            newAccessToken;

          token.setToken(ACCESS_TOKEN_KEY, newAccessToken);

          //새로받은 토큰을 accessToken에 넣음
          accessToken = newAccessToken;

          //리프레쉬 작업을 마침
          isRefreshing = false;

          //새로 받은 accessToken을 기반으로 이때까지 밀려있던 요청을 모두 처리
          onTokenRefreshed(accessToken);

          return config;
        } catch (error) {
          //리프레쉬 하다가 오류난거면 리프레쉬도 만료된 것이므로 다시 로그인
          window.alert("리프레쉬 만료");
          token.clearToken();
          window.location.reload();
        }
      }

      //어떤 요청이 리프레쉬 작업중이라면 여기로 와서 refreshSubscribers에 요청을 넣어줌
      return new Promise((resolve) => {
        addRefreshSubscriber((accessToken: string) => {
          config.headers![REFRESH_TOKEN_KEY] = accessToken;
          resolve(config);
        });
      });
    }
  }

  config.headers![REQUEST_TOKEN_KEY] = accessToken!;
  return config;
};
