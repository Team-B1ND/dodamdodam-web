import { Pass } from "types/pass/pass.type";

export interface deleteMyPassParam {
  outgoingId: string;
}

export interface postApplyPassParam extends Pass {}

export interface putMyPassParam extends Pass {
  outId: number;
}
