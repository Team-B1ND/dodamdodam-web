import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import { AxiosRequestConfig } from "axios";
import token from "../token/token";

const requestHandler = (config: AxiosRequestConfig) => {
  if (
    token.getToken(ACCESS_TOKEN_KEY) === undefined ||
    token.getToken(REFRESH_TOKEN_KEY) === undefined
  ) {
    window.location.href = "/sign";
  }

  return config;
};

export default requestHandler;
