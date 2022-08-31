import { Response } from "../util/response.type";

export interface Notice {
  content: string;
  readonly createdAt: string;
  expiryDate: string;
  readonly id: number;
  status: "ACTIVE" | "DEACTIVATE";
  title: string;
}

export interface NoticeResponse extends Response {
  data: Notice[];
}
