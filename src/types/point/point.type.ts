import { ClassRoom } from "../../types/common/common.type";
import { Member } from "../../types/member/member.type";
import { Response } from "../util/response.type";

export interface PointResponse extends Response {
  data: {
    readonly domBonusPoint: number;
    readonly domMinusPoint: number;
    readonly id: number;
    readonly schBonusPoint: number;
    readonly schMinusPoint: number;
    schOffsetPoint: number;
    student: {
      classroom: ClassRoom;
      readonly id: number;
      member: Member;
      number: number;
      phone: string;
    };
  };
}
