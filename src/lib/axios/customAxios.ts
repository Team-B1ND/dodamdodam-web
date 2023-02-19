import axios, { AxiosRequestConfig } from "axios";
import config from "../../config/config.json";
import {
  ACCESS_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "../../constants/token/token.constant";
import token from "../token/token";
import { errorRequestHandler } from "./requestHandler";

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

dodamV6Axios.interceptors.response.use((res) => res, errorRequestHandler);
