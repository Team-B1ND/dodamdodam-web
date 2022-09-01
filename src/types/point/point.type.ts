import { Response } from "../util/response.type";

export interface MyPointResponse extends Response {
  data: {
    readonly domBonus: number;
    readonly domMinus: number;
    readonly schBonus: number;
    readonly schMinus: number;
    student: {
      readonly id: number;
    };
  };
}
