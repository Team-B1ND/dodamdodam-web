import { Response } from "@src/types/util/response.type";

export interface Place {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
  };
}

export interface PlacesResponse extends Response {
  data: Place[];
}
