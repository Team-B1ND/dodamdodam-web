import { Member } from "types/member/member.type";

export interface Login {
  id: string;
  pw: string;
}

export interface LoginResponse extends Response {
  data: {
    member: Member;
    refreshToken: string;
    token: string;
  };
}
