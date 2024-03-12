import { ClassRoom } from "@src/types/common/common.type";
import { Response } from "@src/types/util/response.type";

export interface Member {
  email: string;
  id: string;
  readonly joinDate: string;
  name: string;
  profileImage: null | string;
  readonly role: string;
  readonly status: "ACTIVE" | "DEACTIVATED";
}

export interface MyMemberResponse extends Response {
  data: {
    classroom: ClassRoom;
    id: number;
    member: Member;
    number: number;
    phone: string;
  };
}
