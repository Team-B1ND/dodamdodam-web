import { Member } from "@src/types/member/member.type";

export interface Login {
  id: string;
  pw: string;
}

export interface LoginResponse extends Response {
  data: {
    member: Member;
    refreshToken: string;
    accessToken: string;
  };
}

export interface PasswordParm {
  type: string;
  visible: boolean;
}
