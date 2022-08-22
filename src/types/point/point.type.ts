import { Response } from "../util/response.type";

export interface PointLog {
  givenTime: string;
  idx: number;
  reason: string;
  score: number;
  studentIdx: number;
  target: number;
  teacherIdx: number;
  time: string;
  type: number;
}

export interface PointScore {
  0: number;
  1: number;
}

export interface PointResponse extends Response {
  data: {
    point: {
      log: PointLog[];
      score: PointScore;
    };
  };
}
