import { Response } from "../util/response.type";

export interface Bus {
  busName: string;
  description: string;
  id: number;
  leaveTime: string;
  peopleLimit: number;
  timeRequired: {
    hour: number;
    minute: number;
    nano: number;
    second: number;
  };
}

export interface BusesResponse extends Response {
  data: Bus[];
}

export interface MyBusResponse extends Response {
  data: Bus[];
}
