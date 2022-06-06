import { Response } from "../util/response.type";

export interface BusInfo {
  bus: Bus[];
  date: string;
}

export interface Bus {
  busMemberlength: number;
  busName: string;
  description: string;
  idx: number;
  leaveTime: string;
  peopleLimit: number;
  timeRequired: string;
}

export interface AppliedBus {
  busName: string;
  description: string;
  idx: number;
  leaveTime: string;
  peopleLimit: number;
  timeRequired: string;
}

export interface BusesResponse extends Response {
  data: {
    busList: BusInfo[];
  };
}

export interface MyBusResponse extends Response {
  data: {
    busList: AppliedBus[];
  };
}
