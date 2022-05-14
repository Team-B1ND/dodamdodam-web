import { UserInfo } from "../common/common.type";

export type Login = {
  id: string;
  pw: string;
};

export type LoginResponse = Response & {
  data: UserInfo;
};
