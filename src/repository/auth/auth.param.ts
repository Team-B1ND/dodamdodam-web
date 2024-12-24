import { Login } from "@src/types/login/login.type";
import { Response } from "@src/types/util/response.type";

export interface LoginParam extends Login {}
export interface NewAccessTokenResponse extends Response {
  data: {
    accessToken:string
  }
}
