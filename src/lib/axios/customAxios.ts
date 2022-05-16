import axios, { AxiosRequestConfig } from "axios";
import config from "../../config/config.json";
import {
  ACCESS_TOKEN_KEY,
  REQUEST_TOKEN_KEY,
} from "../../constants/token/token.constant";
import token from "../token/token";

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

export const tokenAxios = createAxiosInstance({
  baseURL: config.AUTH_SERVER,
});

export const dodamAxios = createAxiosInstance({
  baseURL: config.DODAM_SERVER,
  headers: {
    [REQUEST_TOKEN_KEY]: token.getToken(ACCESS_TOKEN_KEY)!,
  },
});
