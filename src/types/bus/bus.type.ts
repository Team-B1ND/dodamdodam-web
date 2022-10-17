import { Response } from "../util/response.type";

export interface Bus {
  applyCount: number;
  busName: string;
  description: string;
  readonly id: number;
  leaveTime: string;
  peopleLimit: number;
  timeRequired: string;
}

export interface BusList {
  date: string;
  bus: Bus[];
}

export interface BusesResponse extends Response {
  data: BusList;
}

export interface MyBusResponse extends Response {
  data: Bus[];
}
