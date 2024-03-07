import { Member } from "@src/types/member/member.type";

export interface Login {
  id: string;
  pw: string;
}

export interface LoginResponse extends Response {
  member: Member;
  refreshToken: string;
  accessToken: string;
}
