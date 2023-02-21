import { Member } from "@src/types/member/member.type";
import { Response } from "@src/types/util/response.type";

export interface LostStuff {
  content: string;
  readonly createAt: string;
  readonly id: number;
  image: string;
  member: Member;
  place: string;
  title: string;
  type: "FOUND" | "LOST";
}

export interface MyLostStuffsResponse extends Response {
  data: LostStuff[];
}
