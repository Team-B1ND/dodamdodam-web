import { UserInfo } from "../common/common.type";

export interface Login {
  id: string;
  pw: string;
}

export interface LoginResponse extends Response {
  data: {
    member: UserInfo;
    refreshToken: string;
    token: string;
  };
}
