import { UserInfo } from "../common/common.type";

export type Login = {
  id: string;
  password: string;
};

export type LoginResponse = Response & {
  data: UserInfo;
};
