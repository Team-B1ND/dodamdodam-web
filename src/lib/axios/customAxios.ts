import axios, { AxiosRequestConfig } from "axios";
import config from "@src/config/config.json";
import {
  ACCESS_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import token from "../token/token";
import errorResponseHandler from "./errorResponseHandler";
import requestHandler from "./requestHandler";

const createAxiosInstance = (config?: AxiosRequestConfig) => {
  const baseConfig: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios.create({
    ...baseConfig,
    ...config,
  });
};

export const dodamV6Axios = createAxiosInstance({
  baseURL: config.DODAM_SERVER_V6,
  headers: {
    [REQUEST_TOKEN_KEY]: `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`!,
  },
});

export const dodamTestAxios = createAxiosInstance({
  baseURL: config.DODAM_TEST_SERVER,
  headers: {
    [REQUEST_TOKEN_KEY]: `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`!,
  },
});

// export const dodamV6AxiosSetAccessToken = (token: string) => {
//   dodamV6Axios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${token}`;
// };

export const dodamV6AxiosSetAccessToken = (token: string) => {
  dodamTestAxios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${token}`;
};

// dodamV6Axios.interceptors.request.use(requestHandler, (res) => res);

// dodamV6Axios.interceptors.response.use((res) => res, errorResponseHandler);

dodamTestAxios.interceptors.request.use(requestHandler, (res) => res);

dodamTestAxios.interceptors.response.use((res) => res, errorResponseHandler);
